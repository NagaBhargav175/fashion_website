import { ChevronRight } from 'lucide-react';
import { heroImages, products } from '@/data/products';

type Props = {
  onShop: () => void;
  onProduct: (id: string) => void;
};

export default function Hero({ onShop, onProduct }: Props) {
  const minis = products.slice(0, 4);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink pt-28">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImages.main}
          alt="HULK BUSTER editorial"
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      {/* Marquee strip */}
      <div className="absolute top-[104px] left-0 right-0 overflow-hidden border-y border-bone/10 bg-ink/40 backdrop-blur-sm py-2">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="cond text-[11px] font-bold tracking-[0.3em] text-mist"
            >
              HULK BUSTER — FW26 EDITORIAL COLLECTION — DROP 04 — NOW LIVE —
            </span>
          ))}
        </div>
      </div>

      <div className="container-edge relative z-10 flex min-h-[calc(100vh-7rem)] flex-col justify-between pb-10 pt-24 lg:pt-32">
        {/* Headline */}
        <div className="max-w-3xl animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="cond text-[11px] font-bold tracking-[0.25em] text-accent">
              FW26 / DROP 04
            </span>
          </div>
          <h1 className="display text-bone text-[19vw] md:text-[12vw] lg:text-[10rem] leading-[0.82]">
            Unleash
            <br />
            the <span className="text-accent">beast</span>.
          </h1>
          <p className="mt-7 max-w-md text-mist text-sm md:text-base leading-relaxed">
            Heavyweight silhouettes built for the street and the studio. Bold
            construction, limited runs, zero compromise. This is not fast fashion — this is
            armor you wear.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={onShop} className="btn-accent">
              Explore Now
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={onShop}
              className="btn-outline"
            >
              View Lookbook
            </button>
          </div>
        </div>

        {/* Mini cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:max-w-3xl">
          {minis.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onProduct(p.id)}
              className="group relative overflow-hidden rounded-2xl border border-bone/10 bg-char/60 backdrop-blur-sm aspect-[3/4] text-left animate-fade-up"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <img
                src={heroImages.mini[i] ?? p.images[0]}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="cond text-[9px] font-bold tracking-[0.15em] text-accent">
                  {p.brand}
                </p>
                <p className="text-bone text-[11px] font-body font-medium leading-tight line-clamp-1">
                  {p.name}
                </p>
                <p className="text-mist text-[10px] mt-0.5">${p.price}</p>
              </div>
              {p.badge && (
                <span className="absolute top-2 left-2 chip border-accent bg-accent text-bone">
                  {p.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
