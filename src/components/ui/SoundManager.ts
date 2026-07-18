"use client";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (this.ctx) return;
    if (typeof window !== "undefined") {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    // Persist mute settings locally
    if (typeof window !== "undefined") {
      localStorage.setItem("sound-muted", muted ? "true" : "false");
    }
  }

  getMuted(): boolean {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sound-muted");
      if (saved !== null) {
        return saved === "true";
      }
    }
    return this.isMuted;
  }

  playTick() {
    this.initCtx();
    if (this.isMuted || !this.ctx) return;
    
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    // Short high pitch chime for hovering navigation pills or cards
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.04); // E6

    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playClick() {
    this.initCtx();
    if (this.isMuted || !this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    // Snappy warm click frequency transition
    osc.frequency.setValueAtTime(440, this.ctx.currentTime); // A4
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.07); // A2

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playSuccess() {
    this.initCtx();
    if (this.isMuted || !this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    // Double tone chime for form submission completion (C Major chord accents)
    osc1.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc1.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5
    osc1.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.16); // G5

    osc2.frequency.setValueAtTime(261.63, this.ctx.currentTime); // C4
    osc2.frequency.setValueAtTime(329.63, this.ctx.currentTime + 0.08); // E4
    osc2.frequency.setValueAtTime(392.00, this.ctx.currentTime + 0.16); // G4

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.45);
    osc2.stop(this.ctx.currentTime + 0.45);
  }
}

export const SoundManager = new SoundEngine();
export default SoundManager;
