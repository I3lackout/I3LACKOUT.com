/**
 * Shared audio preview queue for the hero visualizer.
 * Plays the I3LACKOUT preview sequence (QuizeD → LIZED → ZentreMizeD → RyzeD, looping)
 * through a single <audio> element wired into an AnalyserNode so the
 * AudioVisualizer can react to real frequency data.
 */

export interface PreviewTrack {
  id: number;
  title: string;
}

export const PREVIEW_TRACKS: PreviewTrack[] = [
  { id: 1, title: 'QuizeD (Intro)' },
  { id: 2, title: 'LIZED (Midtro)' },
  { id: 3, title: 'ZentreMizeD (Midtro)' },
  { id: 5, title: 'RyzeD (Outro)' },
];

const AUDIO_BASE_URL = 'https://musicchaini3.com/api/track_audio';

export interface PreviewSnapshot {
  playing: boolean;
  trackIndex: number;
  track: PreviewTrack;
  hasAnalyser: boolean;
}

let audioEl: HTMLAudioElement | null = null;
let audioCtx: AudioContext | null = null;
let analyserNode: AnalyserNode | null = null;
let graphFailed = false;
let playing = false;
let trackIndex = 0;

let snapshot: PreviewSnapshot = {
  playing: false,
  trackIndex: 0,
  track: PREVIEW_TRACKS[0],
  hasAnalyser: false,
};

const listeners = new Set<() => void>();

function notify() {
  snapshot = {
    playing,
    trackIndex,
    track: PREVIEW_TRACKS[trackIndex],
    hasAnalyser: Boolean(analyserNode),
  };
  listeners.forEach((listener) => listener());
}

function setPlaying(value: boolean) {
  if (playing === value) return;
  playing = value;
  notify();
}

function ensureAudio(): HTMLAudioElement {
  if (audioEl) return audioEl;
  audioEl = new Audio();
  audioEl.crossOrigin = 'anonymous';
  audioEl.preload = 'auto';
  audioEl.addEventListener('ended', () => {
    trackIndex = (trackIndex + 1) % PREVIEW_TRACKS.length;
    loadCurrentTrack();
    void audioEl
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  });
  audioEl.addEventListener('error', () => setPlaying(false));
  return audioEl;
}

function ensureGraph() {
  if (analyserNode || graphFailed || typeof AudioContext === 'undefined') return;
  try {
    audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(ensureAudio());
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 256;
    analyserNode.smoothingTimeConstant = 0.82;
    source.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
  } catch {
    graphFailed = true;
    analyserNode = null;
  }
}

function loadCurrentTrack() {
  ensureAudio().src = `${AUDIO_BASE_URL}/${PREVIEW_TRACKS[trackIndex].id}`;
}

export function subscribePreview(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPreviewSnapshot(): PreviewSnapshot {
  return snapshot;
}

export function getAnalyser(): AnalyserNode | null {
  return analyserNode;
}

export async function startPreview(): Promise<void> {
  ensureGraph();
  if (audioCtx && audioCtx.state === 'suspended') {
    try {
      await audioCtx.resume();
    } catch {
      // Gesture required — user can retry via the volume button.
    }
  }
  loadCurrentTrack();
  try {
    await ensureAudio().play();
    setPlaying(true);
  } catch {
    setPlaying(false);
  }
}

export function stopPreview(): void {
  ensureAudio().pause();
  setPlaying(false);
}

export function togglePreview(): void {
  if (playing) {
    stopPreview();
  } else {
    void startPreview();
  }
}
