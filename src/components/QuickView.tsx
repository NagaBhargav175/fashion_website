import { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Check } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store/StoreContext';

type Props = {
  productId: string | null;
  onClose: () => void;
  onProduct: (id: string) => void;
};

export default function QuickView({ productId, onClose, onProduct }: Props) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (product) {
      setImgIdx(0);
      setSize(product.sizes[0]);
      setColor(product.colors[0]?.name ?? '');
      setAdded(false);
    }
    document.body.style.overflow = productId ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [productId, product]);

  if (!product) return null;

  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-md animate-fade-in" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl bg-char border border-bone/10 rounded-2xl overflow-hidden animate-fade-up max-h-[90vh] flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-ink/80 text-bone hover:text-accent transition-colors"
          aria-label="Close quick view"
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="relative aspect-square md:aspect-auto md:w-1/2 shrink-0 bg-ink overflow-hidden">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            key={imgIdx}
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`h-12 w-12 overflow-hidden rounded-lg border-2 transition-all ${
                  imgIdx === i ? 'border-accent' : 'border-bone/20'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          <p className="cond text-[10px] font-bold tracking-[0.18em] text-accent">{product.brand}</p>
          <h2 className="mt-2 display text-bone text-3xl md:text-4xl leading-[0.9]">{product.name}</h2>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.round(product.rating) ? 'text-accent' : 'text-ash'}
                  fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-[11px] text-mist">{product.rating} ({product.reviews})</span>
          </div>

          <div className="mt-4 flex items-end gap-2">
            <span className="font-cond text-2xl font-black text-bone">${product.price}</span>
            <span className="text-mist text-sm line-through mb-0.5">${product.originalPrice}</span>
          </div>

          <p className="mt-4 text-mist text-sm leading-relaxed line-clamp-3">{product.description}</p>

          {/* Color */}
          <div className="mt-5">
            <p className="cond text-[10px] font-bold tracking-[0.14em] text-bone mb-2">
              Color: <span className="text-mist font-body normal-case">{color}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`h-8 w-8 rounded-full border-2 transition-all ${
                    color === c.name ? 'border-accent scale-110' : 'border-bone/20'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-4">
            <p className="cond text-[10px] font-bold tracking-[0.14em] text-bone mb-2">
              Size: <span className="text-mist font-body normal-case">{size}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-9 w-12 text-[11px] font-cond font-bold border transition-all ${
                    size === s
                      ? 'border-accent bg-accent text-bone'
                      : 'border-bone/20 text-mist hover:border-bone'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto pt-6 flex gap-3">
            <button onClick={handleAdd} className={`btn-ink flex-1 ${added ? '!bg-accent' : ''}`}>
              {added ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to Cart
                </>
              )}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`grid h-12 w-12 shrink-0 place-items-center border transition-all ${
                wished
                  ? 'border-accent bg-accent text-bone'
                  : 'border-bone/20 text-bone hover:border-accent hover:text-accent'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onProduct(product.id);
            }}
            className="mt-3 text-center text-[11px] font-cond font-bold uppercase tracking-[0.14em] text-fog hover:text-bone transition-colors"
          >
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
}
