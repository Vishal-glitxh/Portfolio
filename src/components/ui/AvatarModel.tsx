"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Safe preloading of fallback models
try {
  useGLTF.preload("/models/avatar.glb");
  useGLTF.preload("https://models.readyplayer.me/62ea7bc28a6d28ec134bbcce.glb");
} catch {
  // Preloads bypassed
}

export default function AvatarModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [modelUrl, setModelUrl] = useState("/models/avatar.glb");
  const [loadError, setLoadError] = useState(false);

  // Rig bones references for smooth pointer tracking
  const headRef = useRef<THREE.Object3D | null>(null);
  const neckRef = useRef<THREE.Object3D | null>(null);
  const leftEyeRef = useRef<THREE.Object3D | null>(null);
  const rightEyeRef = useRef<THREE.Object3D | null>(null);
  const spineRef = useRef<THREE.Object3D | null>(null);

  // Cache to store blinking meshes and their resolved target indices
  const blinkMeshesRef = useRef<Array<{
    mesh: THREE.Mesh;
    indexL?: number;
    indexR?: number;
  }>>([]);

  // Automated eye blinking states
  const blinkTimer = useRef(0);
  const nextBlinkTime = useRef(3);
  const blinkDuration = 0.15;

  // Responsive scaling factor based on aspect ratio
  const responsiveScale = Math.min(viewport.width * 0.42, 1.8);

  // Safely attempt to load the model (Local fallback to Ready Player Me Visage Male GLB)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let gltf: any = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    gltf = useGLTF(modelUrl);
  } catch {
    if (modelUrl !== "https://models.readyplayer.me/62ea7bc28a6d28ec134bbcce.glb") {
      setModelUrl("https://models.readyplayer.me/62ea7bc28a6d28ec134bbcce.glb");
    } else {
      if (!loadError) {
        setLoadError(true);
      }
    }
  }

  // Map Ready Player Me standard bone naming conventions once loaded
  useEffect(() => {
    if (gltf) {
      headRef.current = gltf.scene.getObjectByName("Head") || null;
      neckRef.current = gltf.scene.getObjectByName("Neck") || null;
      leftEyeRef.current = gltf.scene.getObjectByName("LeftEye") || null;
      rightEyeRef.current = gltf.scene.getObjectByName("RightEye") || null;
      spineRef.current = gltf.scene.getObjectByName("Spine") || gltf.scene.getObjectByName("Spine1") || null;

      // Optimize: Traverse scene graph exactly ONCE on mount to cache blinking meshes
      const cachedBlinks: Array<{
        mesh: THREE.Mesh;
        indexL?: number;
        indexR?: number;
      }> = [];

      gltf.scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          const mesh = object as THREE.Mesh;
          if (mesh.morphTargetInfluences && mesh.morphTargetDictionary) {
            const indexL = mesh.morphTargetDictionary["eyeBlinkLeft"] ?? mesh.morphTargetDictionary["eyeBlink_L"];
            const indexR = mesh.morphTargetDictionary["eyeBlinkRight"] ?? mesh.morphTargetDictionary["eyeBlink_R"];
            if (indexL !== undefined || indexR !== undefined) {
              cachedBlinks.push({
                mesh,
                indexL,
                indexR,
              });
            }
          }
        }
      });
      blinkMeshesRef.current = cachedBlinks;
    }
  }, [gltf]);

  // Main animation and interaction frame loop
  useFrame((state, delta) => {
    // 1. Smooth blinking math
    blinkTimer.current += delta;
    let currentBlink = 0;
    if (blinkTimer.current >= nextBlinkTime.current) {
      const progress = (blinkTimer.current - nextBlinkTime.current) / blinkDuration;
      if (progress <= 1) {
        currentBlink = Math.sin(progress * Math.PI);
      } else {
        blinkTimer.current = 0;
        nextBlinkTime.current = 2 + Math.random() * 4;
      }
    }

    // Apply morph target influences directly to cached face meshes (no recursive traverse!)
    blinkMeshesRef.current.forEach(({ mesh, indexL, indexR }) => {
      if (mesh.morphTargetInfluences) {
        if (indexL !== undefined) mesh.morphTargetInfluences[indexL] = currentBlink;
        if (indexR !== undefined) mesh.morphTargetInfluences[indexR] = currentBlink;
      }
    });

    if (!groupRef.current) return;

    const elapsedTime = state.clock.getElapsedTime();

    // 2. Sinusoidal breathing sway
    if (spineRef.current) {
      spineRef.current.rotation.x = Math.sin(elapsedTime * 1.6) * 0.012;
    }
    if (neckRef.current) {
      neckRef.current.rotation.x = Math.sin(elapsedTime * 1.6) * 0.008;
    }

    // 3. Ambient body sway & positioning sags
    groupRef.current.rotation.z = Math.sin(elapsedTime * 0.4) * 0.01;
    groupRef.current.position.y = -1.8 + Math.sin(elapsedTime * 1.2) * 0.015;

    // 4. Smooth mouse pointer interaction sways
    const targetX = state.mouse.x * 0.28; // head rotation scope
    const targetY = state.mouse.y * 0.18; // head nod scope

    // Head look-at sways
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.08);
    }

    // Eye direction sways
    if (leftEyeRef.current) {
      leftEyeRef.current.rotation.y = THREE.MathUtils.lerp(leftEyeRef.current.rotation.y, targetX * 0.6, 0.1);
      leftEyeRef.current.rotation.x = THREE.MathUtils.lerp(leftEyeRef.current.rotation.x, -targetY * 0.6, 0.1);
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.rotation.y = THREE.MathUtils.lerp(rightEyeRef.current.rotation.y, targetX * 0.6, 0.1);
      rightEyeRef.current.rotation.x = THREE.MathUtils.lerp(rightEyeRef.current.rotation.x, -targetY * 0.6, 0.1);
    }

    // Torso rotations
    if (spineRef.current) {
      spineRef.current.rotation.y = THREE.MathUtils.lerp(spineRef.current.rotation.y, targetX * 0.15, 0.04);
    }
  });

  // Cyber-core loading abstract fallback when both model paths fail
  if (loadError) {
    return (
      <group ref={groupRef} position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            roughness={0.15}
            metalness={0.85}
            wireframe
          />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, 0.04, 16, 100]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={1.2} 
            toneMapped={false}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.8, 0.03, 8, 100]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#3b82f6" 
            emissiveIntensity={0.8} 
            toneMapped={false}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} dispose={null}>
      {gltf && (
        <primitive 
          object={gltf.scene} 
          scale={responsiveScale} 
          position={[0, -1.8, 0]} 
        />
      )}
    </group>
  );
}
