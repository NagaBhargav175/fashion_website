import { ArrowUpRight } from 'lucide-react';
import { collections } from '@/data/products';

type Props = {
  onShop: () => void;
};

export default function Collections({ onShop }: Props) {
  return (
    <section className="bg-char py-16 md:py-24">
      <div className="container-edge">
        <div className="flex flex-col gap-4 border-b border-bone/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-accent" />
              <span className="cond text-[11px] font-bold tracking-[0.2em] text-accent">
                Curated Drops
              </span>
            </div>
            <h2 className="display text-bone text-5xl md:text-6xl lg:text-7xl">
              Collections
            </h2>
          </div>
          <button onClick={onShop} className="btn-outline self-start md:self-auto">
            View All
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {collections.map((c, i) => (
            <button
              key={c.id}
              onClick={onShop}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left md:aspect-[3/4] animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={c.image}
                alt={c.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

              {/* Sale badge */}
              <span className="absolute right-4 top-4 chip border-accent bg-accent text-bone">
                Sale Live
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="cond text-[10px] font-bold tracking-[0.18em] text-accent">
                  {c.count} pieces
                </p>
                <h3 className="display text-bone text-4xl md:text-5xl mt-1">{c.label}</h3>
                <p className="mt-2 text-sm text-mist leading-snug max-w-xs">{c.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-bone text-[11px] font-cond font-bold uppercase tracking-[0.16em] group-hover:text-accent transition-colors">
                  Explore
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
