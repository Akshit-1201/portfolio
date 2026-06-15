import type { CSSProperties } from 'react';
import { Workflow, Stethoscope, ShieldAlert, MailWarning, BatteryCharging } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  workflow: Workflow,
  health: Stethoscope,
  shield: ShieldAlert,
  mail: MailWarning,
  battery: BatteryCharging,
};

type AbstractArtProps = {
  accent: string;
  icon: keyof typeof ICONS | string;
  /** 'a' = gradient mesh, 'b' = dotted grid, 'c' = concentric glow. */
  variant?: 'a' | 'b' | 'c';
  className?: string;
  style?: CSSProperties;
};

/**
 * Self-contained abstract AI/tech panel — gradient + grid + a thematic icon.
 * Used in place of stock imagery so the cards stay on-brand with no external
 * dependency.
 */
export default function AbstractArt({ accent, icon, variant = 'a', className = '', style }: AbstractArtProps) {
  const Icon = ICONS[icon] ?? Workflow;

  const background =
    variant === 'a'
      ? `radial-gradient(120% 120% at 20% 10%, ${accent}55 0%, transparent 55%), radial-gradient(120% 120% at 90% 90%, ${accent}33 0%, transparent 50%), #111114`
      : variant === 'b'
        ? `linear-gradient(135deg, ${accent}22 0%, #0E0E11 60%)`
        : `radial-gradient(circle at 50% 50%, ${accent}44 0%, transparent 60%), #0E0E11`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background, border: `1px solid ${accent}33`, ...style }}
    >
      {/* dotted grid overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(${accent}40 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
        }}
      />
      {/* soft glow blob */}
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: accent, opacity: 0.25 }}
      />
      {/* thematic icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon style={{ color: accent }} className="opacity-80" strokeWidth={1.25} size={72} />
      </div>
    </div>
  );
}
