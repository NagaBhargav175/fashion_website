import { ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

const features = [
  {
    Icon: ShieldCheck,
    title: 'Authentic Guaranteed',
    desc: 'Every piece verified. Original construction, original materials.',
  },
  {
    Icon: Truck,
    title: 'Express Worldwide',
    desc: 'Free shipping over $250. 2–4 day delivery to major cities.',
  },
  {
    Icon: RefreshCw,
    title: '30-Day Returns',
    desc: 'Changed your mind? Send it back, unworn, within 30 days.',
  },
  {
    Icon: Headphones,
    title: 'Styling Concierge',
    desc: 'Talk to a stylist 7 days a week. Build the fit, not just the piece.',
  },
];

export default function FeatureStrip() {
  return (
    <section className="bg-ink border-y border-bone/10 py-12">
      <div className="container-edge grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center border border-bone/15 rounded-full text-accent">
              <f.Icon size={20} />
            </div>
            <div>
              <h3 className="cond text-[11px] font-bold tracking-[0.14em] text-bone">{f.title}</h3>
              <p className="mt-1.5 text-[12px] text-fog leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
