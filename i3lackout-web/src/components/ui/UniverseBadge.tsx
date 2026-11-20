interface UniverseBadgeProps {
  universe: 'music' | 'developer';
  label?: string;
}

export function UniverseBadge({ universe, label }: UniverseBadgeProps) {
  const isMusic = universe === 'music';
  const defaultLabel = isMusic ? 'MUSIC UNIVERSE' : 'DEVELOPER UNIVERSE';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${
        isMusic
          ? 'border-[#DC143C]/60 bg-[#DC143C]/12 text-[#FF6B7A]'
          : 'border-[#00E5FF]/45 bg-[#00E5FF]/10 text-[#00E5FF]'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isMusic ? 'bg-[#FF2020]' : 'bg-[#00E5FF]'}`}
        aria-hidden="true"
      />
      {label ?? defaultLabel}
    </span>
  );
}
