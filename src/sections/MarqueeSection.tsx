import { TECH_STACK } from '../data/profile';
import type { TechItem } from '../data/profile';

const TINT = 'D7E2EA';

function Chip({ item }: { item: TechItem }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 whitespace-nowrap">
      {item.slug && (
        <img
          src={`https://cdn.simpleicons.org/${item.slug}/${TINT}`}
          alt=""
          loading="lazy"
          className="h-5 w-5 opacity-80"
        />
      )}
      <span className="text-[#D7E2EA]/80 font-medium uppercase tracking-wider text-sm">
        {item.label}
      </span>
    </div>
  );
}

function Row({ items, direction }: { items: TechItem[]; direction: 'left' | 'right' }) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex gap-3 pr-3 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
      >
        {doubled.map((item, i) => (
          <Chip key={`${item.label}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const mid = Math.ceil(TECH_STACK.length / 2);
  const rowOne = TECH_STACK.slice(0, mid);
  const rowTwo = TECH_STACK.slice(mid);

  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-6" style={{ background: '#0C0C0C' }} aria-label="Tech stack">
      {/* edge fade mask */}
      <div
        className="flex flex-col gap-3"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        }}
      >
        <Row items={rowOne} direction="left" />
        <Row items={rowTwo} direction="right" />
      </div>
    </section>
  );
}
