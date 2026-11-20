import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type GlowVariant = 'primary' | 'secondary' | 'ghost';

interface BaseProps {
  variant?: GlowVariant;
  children: ReactNode;
  className?: string;
}

type AnchorGlowProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonGlowProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type GlowButtonProps = AnchorGlowProps | ButtonGlowProps;

const VARIANT_CLASSES: Record<GlowVariant, string> = {
  primary:
    'bg-gradient-to-r from-[#DC143C] via-[#FF2020] to-[#DC143C] text-[#FFFFFF] border border-[#FF2020]/80 shadow-[0_0_24px_rgba(255,32,32,0.38)] hover:from-[#FF2020] hover:to-[#FF1744] hover:shadow-[0_0_34px_rgba(255,23,68,0.55)] hover:border-[#FF1744]',
  secondary:
    'bg-[#121215] text-[#FFFFFF] border border-[#00E5FF]/45 hover:border-[#00E5FF] hover:bg-[#18181D] shadow-[0_0_20px_rgba(0,229,255,0.14)]',
  ghost:
    'bg-transparent text-[#FFFFFF] border border-[#DC143C]/45 hover:border-[#FF1744] hover:bg-[#1C0D12]',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-50';

export function GlowButton(props: GlowButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props;
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim();

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? anchorProps.target ?? '_blank' : anchorProps.target}
        rel={isExternal ? anchorProps.rel ?? 'noopener noreferrer' : anchorProps.rel}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
