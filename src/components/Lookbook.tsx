import { ArrowUpRight } from 'lucide-react';

const editorialImages = [
  `https://images.pexels.com/photos/20238933/pexels-photo-20238933.jpeg?auto=compress&cs=tinysrgb&h=900&w=600`,
  `https://images.pexels.com/photos/20238956/pexels-photo-20238956.jpeg?auto=compress&cs=tinysrgb&h=900&w=600`,
  `https://images.pexels.com/photos/20227845/pexels-photo-20227845.jpeg?auto=compress&cs=tinysrgb&h=900&w=600`,
  `https://images.pexels.com/photos/20231996/pexels-photo-20231996.jpeg?auto=compress&cs=tinysrgb&h=900&w=600`,
];

type Props = {
  onShop: () => void;
};

export default function Lookbook({ onShop }: Props) {
  return (
    <section className="bg-ink py-16 md:py-24 overflow-hidden">
      <div className="container-edge">
        <div className="flex flex-col gap-4 border-b border-bone/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-accent" />
              <span className="cond text-[11px] font-bold tracking-[0.2em] text-accent">
                The Lookbook
              </span>
            </div>
            <h2 className="display text-bone text-5xl md:text-6xl lg:text-7xl">
              Bold silhouettes,
              <br />
              in motion
            </h2>
          </div>
          <p className="max-w-sm text-mist text-sm leading-relaxed">
            Shot in studio, built for the street. A study in raw form and fearless design.
            The FW26 editorial — silhouettes that hold their shape under pressure.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {editorialImages.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl ${
                i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[3/4] lg:mt-10'
              } animate-fade-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={img}
                alt={`Editorial ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover img-zoom grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 left-3 cond text-[9px] font-bold tracking-[0.18em] text-bone opacity-0 group-hover:opacity-100 transition-opacity">
                Frame 0{i + 1}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button onClick={onShop} className="btn-accent">
            Shop the Editorial
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
