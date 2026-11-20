import type { ReactNode } from 'react';

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  accent?: 'red' | 'purple' | 'cyan';
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  accent = 'red',
  as = 'h2',
}: SectionHeadingProps) {
  const isCyan = accent === 'cyan';
  const HeadingTag = as;

  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p
          className={`mb-2 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] ${
            isCyan ? 'text-[#00E5FF]' : 'text-[#FF6B7A]'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isCyan ? 'bg-[#00E5FF]' : 'bg-[#FF2020]'}`}
            aria-hidden="true"
          />
          {eyebrow}
        </p>
        <HeadingTag
          id={id}
          className="text-3xl font-bold tracking-tight text-[#FFFFFF] sm:text-4xl"
        >
          {title}
        </HeadingTag>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-[#B8B8C4]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
