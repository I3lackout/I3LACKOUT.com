import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  getAnalyser,
  getPreviewSnapshot,
  startPreview,
  subscribePreview,
  togglePreview,
} from '../../audio/previewQueue';

const SPECTRUM_BARS = [
  0.34, 0.58, 0.42, 0.82, 0.64, 0.94, 0.52, 0.76, 0.88, 0.46, 0.72, 0.96, 0.62, 0.8, 0.48,
  0.68, 0.9, 0.56, 0.74, 0.4, 0.62, 0.84, 0.5, 0.36,
];

type VisualizerMode = 'auto' | 'idle' | 'live';

const MODE_CYCLE: VisualizerMode[] = ['auto', 'idle', 'live'];

interface AudioVisualizerProps {
  className?: string;
}

function isMediaElement(target: EventTarget | null): target is HTMLMediaElement {
  return typeof HTMLMediaElement !== 'undefined' && target instanceof HTMLMediaElement;
}

/**
 * Decorative abstract spectrum bars for the Hero section.
 * Modes: IDLE (gentle ambient animation) and LIVE/REACTIVE (faster, deeper
 * energy). In AUTO mode the visualizer switches to LIVE automatically while any
 * audio/video element on the page is playing. The volume button toggles the
 * I3LACKOUT preview sequence (QuizeD → LIZED → ZentreMizeD → RyzeD); while it plays,
 * the bars are driven by real FFT data from the track. Respects
 * prefers-reduced-motion.
 */
export function AudioVisualizer({ className = '' }: AudioVisualizerProps) {
  const motionReduced = useReducedMotion();
  const [mediaReduced, setMediaReduced] = useState<boolean>(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );
  const [mode, setMode] = useState<VisualizerMode>('auto');
  const [mediaPlaying, setMediaPlaying] = useState<boolean>(false);
  const preview = useSyncExternalStore(subscribePreview, getPreviewSnapshot);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const audioActive = preview.playing;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setMediaReduced(event.matches);
    };
    mediaQuery.addEventListener?.('change', handleChange);
    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const refresh = () => {
      const playing = Array.from(document.querySelectorAll('audio, video')).some(
        (el) =>
          el instanceof HTMLMediaElement &&
          !el.paused &&
          !el.ended &&
          el.readyState > 2,
      );
      setMediaPlaying(playing);
    };
    const handleMediaEvent = (event: Event) => {
      if (isMediaElement(event.target)) {
        refresh();
      }
    };
    const events = ['play', 'playing', 'pause', 'ended', 'emptied'] as const;
    events.forEach((eventName) => {
      document.addEventListener(eventName, handleMediaEvent, true);
    });
    refresh();
    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, handleMediaEvent, true);
      });
    };
  }, []);

  // Attempt autoplay once on mount — browsers may block it until the user
  // interacts; retry on first gesture or parent postMessage from musicchaini3.com.
  useEffect(() => {
    void startPreview();

    const allowedOrigins = new Set(['https://musicchaini3.com', 'https://www.musicchaini3.com']);
    const handleMessage = (event: MessageEvent) => {
      if (!allowedOrigins.has(event.origin)) return;
      if (event.data && typeof event.data === 'object' && event.data.type === 'i3-start-preview') {
        if (!getPreviewSnapshot().playing) {
          void startPreview();
        }
      }
    };

    const handleGesture = () => {
      if (!getPreviewSnapshot().playing) {
        void startPreview();
      }
      window.removeEventListener('pointerdown', handleGesture, true);
      window.removeEventListener('keydown', handleGesture, true);
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('pointerdown', handleGesture, true);
    window.addEventListener('keydown', handleGesture, true);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('pointerdown', handleGesture, true);
      window.removeEventListener('keydown', handleGesture, true);
    };
  }, []);

  // Drive bars from real FFT data while the preview sequence is playing.
  useEffect(() => {
    if (!audioActive || !preview.hasAnalyser) return;
    const analyser = getAnalyser();
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let rafId = 0;
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const bars = barRefs.current;
      const usableBins = Math.floor(data.length * 0.72);
      bars.forEach((el, index) => {
        if (!el) return;
        const bin = Math.min(
          usableBins - 1,
          Math.floor((index / Math.max(1, bars.length - 1)) * usableBins),
        );
        const level = data[bin] / 255;
        const scale = 0.12 + level * 0.88;
        el.style.transform = `scaleY(${scale.toFixed(3)})`;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [audioActive, preview.hasAnalyser]);

  const shouldReduceMotion = Boolean(motionReduced || mediaReduced);
  const isLive = audioActive || mode === 'live' || (mode === 'auto' && mediaPlaying);
  const { t } = useLanguage();

  const cycleMode = () => {
    setMode((current) => MODE_CYCLE[(MODE_CYCLE.indexOf(current) + 1) % MODE_CYCLE.length]);
  };

  const modeLabel =
    mode === 'auto'
      ? t.hero.visualizerModeAuto
      : mode === 'idle'
        ? t.hero.visualizerModeIdle
        : t.hero.visualizerModeLive;

  const barClass = (index: number) =>
    `block h-full w-full origin-bottom rounded-t-sm ${
      index % 4 === 2
        ? 'bg-gradient-to-t from-[#DC143C]/65 via-[#00E5FF]/85 to-[#00E5FF]'
        : 'bg-gradient-to-t from-[#DC143C] via-[#FF2020] to-[#FF1744]'
    }`;

  return (
    <div
      aria-hidden="true"
      data-testid="decorative-audio-visualizer"
      data-decorative="true"
      data-mode={isLive ? 'live' : 'idle'}
      data-audio-preview={audioActive ? 'on' : 'off'}
      data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}
      className={`relative overflow-hidden rounded-2xl border border-[#DC143C]/35 bg-[#121215]/90 p-5 shadow-[0_24px_60px_-24px_rgba(255,23,68,0.45)] ${className}`.trim()}
    >
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#B8B8C4]">
        <span>{t.hero.visualizerSpectrum}</span>
        <span className={isLive ? 'text-[#FF6B7A]' : 'text-[#00E5FF]'}>
          {isLive ? t.hero.visualizerLiveBadge : t.hero.visualizerBadge}
        </span>
      </div>

      <div className="flex h-36 items-end justify-between gap-1.5 sm:h-44 sm:gap-2">
        {SPECTRUM_BARS.map((ratio, index) =>
          audioActive && preview.hasAnalyser ? (
            <span
              key={index}
              ref={(el) => {
                barRefs.current[index] = el;
              }}
              className={barClass(index)}
              style={{ transform: `scaleY(${Math.max(0.12, ratio)})` }}
            />
          ) : (
            <m.span
              key={index}
              className={barClass(index)}
              initial={{ scaleY: ratio }}
              animate={
                shouldReduceMotion
                  ? { scaleY: ratio }
                  : isLive
                    ? {
                        scaleY: [
                          Math.max(0.12, ratio * 0.3),
                          1,
                          Math.max(0.2, ratio * 0.85),
                          Math.max(0.15, ratio * 0.5),
                          Math.max(0.12, ratio * 0.3),
                        ],
                      }
                    : {
                        scaleY: [
                          Math.max(0.22, ratio * 0.48),
                          Math.min(1, ratio),
                          Math.max(0.28, ratio * 0.65),
                          Math.max(0.22, ratio * 0.48),
                        ],
                      }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : isLive
                    ? {
                        duration: 0.7 + (index % 5) * 0.12,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: index * 0.03,
                      }
                    : {
                        duration: 1.8 + (index % 5) * 0.25,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: index * 0.05,
                      }
              }
            />
          ),
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 font-mono text-[11px] text-[#B8B8C4]">
        <span className="truncate">
          {audioActive ? `PREVIEW // ${preview.track.title}` : 'TRIPLE RED // #090909'}
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={togglePreview}
            title={t.hero.visualizerVolumeHint}
            aria-label={t.hero.visualizerVolumeHint}
            aria-pressed={audioActive}
            className={`rounded-md border p-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00E5FF] ${
              audioActive
                ? 'border-[#DC143C]/70 bg-[#DC143C]/15 text-[#FF6B7A]'
                : 'border-white/15 bg-[#090909] text-[#B8B8C4] hover:border-[#DC143C]/70 hover:text-[#00E5FF]'
            }`}
          >
            {audioActive ? (
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={cycleMode}
            title={t.hero.visualizerModeHint}
            className="rounded-md border border-white/15 bg-[#090909] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#FF6B7A] transition hover:border-[#DC143C]/70 hover:text-[#00E5FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00E5FF]"
          >
            {modeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
