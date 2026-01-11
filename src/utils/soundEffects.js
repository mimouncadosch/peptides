// Retro Game Sound Effects using Web Audio API
// No external sound files needed - all sounds generated procedurally

let audioContext = null;
let lastSoundTime = 0;
const MIN_SOUND_INTERVAL = 50; // Minimum 50ms between sounds to prevent overlapping

/**
 * Initialize Audio Context (lazy initialization)
 * Required for browser autoplay policies
 */
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Check if enough time has passed since last sound
 * Prevents audio overlapping and distortion
 */
const canPlaySound = () => {
  const now = Date.now();
  if (now - lastSoundTime < MIN_SOUND_INTERVAL) {
    return false;
  }
  lastSoundTime = now;
  return true;
};

/**
 * Play a short "beep" sound on hover
 * Retro arcade style - quick and subtle
 */
export const playHoverSound = () => {
  if (!canPlaySound()) return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // 800Hz square wave - classic retro beep
    oscillator.frequency.value = 800;
    oscillator.type = 'square';

    // Quick fade out
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (error) {
    console.warn('Could not play hover sound:', error);
  }
};

/**
 * Play "select" confirmation sound
 * Higher pitched sweep down - satisfying selection feel
 */
export const playSelectSound = () => {
  if (!canPlaySound()) return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Sweep from 1200Hz to 600Hz
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
    oscillator.type = 'square';

    // Volume envelope
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  } catch (error) {
    console.warn('Could not play select sound:', error);
  }
};

/**
 * Play "deselect" cancellation sound
 * Lower pitched quick beep - less satisfying than select
 */
export const playDeselectSound = () => {
  if (!canPlaySound()) return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Sweep from 600Hz to 400Hz
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    oscillator.type = 'square';

    // Volume envelope
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (error) {
    console.warn('Could not play deselect sound:', error);
  }
};

/**
 * Initialize audio context on user interaction
 * Call this on first user click/touch to comply with autoplay policies
 */
export const initAudio = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  } catch (error) {
    console.warn('Could not initialize audio:', error);
  }
};

/**
 * Check if Web Audio API is supported
 */
export const isAudioSupported = () => {
  return !!(window.AudioContext || window.webkitAudioContext);
};
