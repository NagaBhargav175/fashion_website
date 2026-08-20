import { Heart, Eye, ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/products';
import { useStore } from '@/store/StoreContext';

type Props = {
  product: Product;
  onQuickView: (id: string) => void;
  onProduct: (id: string) => void;
};

export default function ProductCard({ product, onQuickView, onProduct }: Props) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wished = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-char">
        <button
          onClick={() => onProduct(product.id)}
          className="absolute inset-0 z-0"
          aria-label={product.name}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover img-zoom"
          />
          <img
            src={product.images[1] ?? product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </button>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="chip border-accent bg-accent text-bone">{product.badge}</span>
          )}
          {product.discount > 0 && (
            <span className="chip border-bone text-bone bg-ink/70 backdrop-blur-sm">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full backdrop-blur-sm transition-all ${
            wished
              ? 'bg-accent text-bone'
              : 'bg-ink/60 text-bone hover:bg-ink hover:text-accent'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Hover actions */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex translate-y-3 gap-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onQuickView(product.id)}
            className="flex flex-1 items-center justify-center gap-1.5 bg-bone/95 py-2.5 text-[10px] font-cond font-bold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-accent hover:text-bone"
          >
            <Eye size={14} /> Quick View
          </button>
          <button
            onClick={() => addToCart(product, product.sizes[0], product.colors[0].name)}
            className="grid h-9 w-9 shrink-0 place-items-center bg-ink/90 text-bone transition-colors hover:bg-accent"
            aria-label="Add to cart"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col">
        <p className="cond text-[10px] font-bold tracking-[0.15em] text-accent">{product.brand}</p>
        <button
          onClick={() => onProduct(product.id)}
          className="mt-1 text-left text-bone text-sm font-body font-medium leading-snug hover:text-accent transition-colors line-clamp-1"
        >
          {product.name}
        </button>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-bone text-sm font-cond font-bold">${product.price}</span>
          <span className="text-mist text-xs line-through">${product.originalPrice}</span>
        </div>
      </div>
    </div>
  );
}
