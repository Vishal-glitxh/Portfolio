"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import AvatarModel from "./AvatarModel";

// Premium Canvas Loader Fallback
function CanvasLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#06b6d4" wireframe />
    </mesh>
  );
}

// React Error Boundary to capture Three.js resource fetch exceptions
class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error | null) {
    console.warn("WebGL mesh failed to mount. Loading abstract replacement:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function AvatarCanvas() {
  return (
    <div className="w-full h-full min-h-[350px] relative select-none">
      <ThreeErrorBoundary fallback={
        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 font-mono">
          [ WebGL Context Initialization Bypassed ]
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          {/* Ambient Scene Lighting */}
          <ambientLight intensity={0.6} />
          
          {/* Focused Highlights */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <spotLight
            position={[-5, 5, 2]}
            intensity={0.5}
            angle={0.3}
            penumbra={1}
          />

          <Suspense fallback={<CanvasLoader />}>
            {/* 3D Human / Placeholder Model */}
            <AvatarModel />
            
            {/* HDR Environment */}
            <Environment preset="city" />
          </Suspense>

          {/* Premium baked floor shadows */}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.65}
            scale={8}
            blur={1.8}
            far={3}
          />
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
}
