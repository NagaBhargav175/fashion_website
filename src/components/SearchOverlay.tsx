import { useEffect, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

type Props = {
  open: boolean;
  onClose: () => void;
  onProduct: (id: string) => void;
};

export default function SearchOverlay({ open, onClose, onProduct }: Props) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => setFocused(true), 150);
    } else {
      setFocused(false);
    }
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q),
      )
    : products.slice(0, 4);

  const suggestions = ['Hoodie', 'Bomber', 'Sneaker', 'Denim', 'Puffer', 'Tee'];

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-ink/95 backdrop-blur-xl animate-fade-in flex flex-col">
        {/* Header */}
        <div className="container-edge pt-8">
          <div className="flex items-center justify-between">
            <span className="cond text-[11px] font-bold tracking-[0.2em] text-accent">Search</span>
            <button onClick={onClose} className="text-bone p-1" aria-label="Close search">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="container-edge mt-10">
          <div className="flex items-center gap-4 border-b-2 border-bone/20 pb-4 focus-within:border-accent transition-colors">
            <Search size={28} className="text-fog" />
            <input
              ref={(el) => {
                if (focused && el) el.focus();
              }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pieces, brands, categories..."
              className="flex-1 bg-transparent text-bone text-2xl md:text-4xl font-cond font-black outline-none placeholder:text-ash"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-fog hover:text-bone">
                <X size={20} />
              </button>
            )}
          </div>

          {/* Suggestions */}
          {!q && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-cond font-bold uppercase tracking-[0.14em] text-fog mr-1">
                Popular:
              </span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 text-[11px] font-cond font-bold uppercase tracking-[0.12em] border border-bone/15 text-mist hover:border-accent hover:text-accent transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="container-edge mt-10 flex-1 overflow-y-auto pb-10">
          <p className="cond text-[11px] font-bold tracking-[0.14em] text-fog mb-5">
            {q ? `${results.length} results for "${query}"` : 'Trending now'}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onProduct(p.id);
                  onClose();
                }}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl text-left"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="cond text-[9px] font-bold tracking-[0.15em] text-accent">{p.brand}</p>
                  <p className="text-bone text-[11px] font-medium leading-tight line-clamp-1">{p.name}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-mist text-[10px]">${p.price}</span>
                    <ArrowRight size={12} className="text-bone opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </button>
            ))}
          </div>
          {q && results.length === 0 && (
            <div className="text-center py-16">
              <p className="display text-mist text-5xl">No results</p>
              <p className="mt-3 text-sm text-fog">Try a different keyword.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
