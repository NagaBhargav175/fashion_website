import { useState } from 'react';
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Truck,
  Minus,
  Plus,
  Star,
  Check,
  Home,
} from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store/StoreContext';

type Props = {
  productId: string;
  onBack: () => void;
  onProduct: (id: string) => void;
  onOpenCart: () => void;
};

export default function ProductDetail({ productId, onBack, onProduct, onOpenCart }: Props) {
  const product = products.find((p) => p.id === productId);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product?.sizes[0] ?? '');
  const [color, setColor] = useState(product?.colors[0]?.name ?? '');
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryMsg, setDeliveryMsg] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink pt-24">
        <div className="text-center">
          <p className="display text-mist text-6xl">404</p>
          <p className="mt-3 text-mist">This piece is no longer available.</p>
          <button onClick={onBack} className="btn-outline mt-6">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product, size, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, size, color, qty);
    onOpenCart();
  };

  const checkDelivery = () => {
    if (pincode.trim().length < 3) {
      setDeliveryMsg('Enter a valid city or postcode.');
      return;
    }
    const days = 2 + (pincode.length % 4);
    setDeliveryMsg(
      `Delivery to ${pincode.trim().toUpperCase()} — est. ${days}-${days + 2} business days. Free over $250.`,
    );
  };

  return (
    <div className="bg-ink pt-24 pb-20 animate-fade-in">
      <div className="container-edge">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[10px] font-cond font-bold uppercase tracking-[0.14em] text-fog py-6">
          <button onClick={onBack} className="flex items-center gap-1.5 hover:text-bone transition-colors">
            <Home size={12} /> Home
          </button>
          <ChevronRight size={12} />
          <button onClick={onBack} className="hover:text-bone transition-colors">Shop</button>
          <ChevronRight size={12} />
          <span className="text-bone">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-3 lg:flex-row-reverse">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-char flex-1">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover animate-fade-in"
                key={activeImg}
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 chip border-accent bg-accent text-bone">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="flex gap-3 lg:flex-col">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all lg:w-full ${
                    activeImg === i ? 'border-accent' : 'border-bone/10 hover:border-bone/30'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="cond text-[11px] font-bold tracking-[0.18em] text-accent">
              {product.brand}
            </p>
            <h1 className="mt-2 display text-bone text-4xl md:text-5xl lg:text-6xl leading-[0.9]">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating) ? 'text-accent' : 'text-ash'}
                    fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-sm text-mist">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-end gap-3">
              <span className="font-cond text-3xl font-black text-bone">${product.price}</span>
              <span className="text-mist text-lg line-through mb-0.5">
                ${product.originalPrice}
              </span>
              <span className="chip border-accent text-accent mb-1.5">
                Save ${product.originalPrice - product.price}
              </span>
            </div>

            <p className="mt-5 text-mist text-sm leading-relaxed">{product.description}</p>

            {/* Color */}
            <div className="mt-7">
              <p className="cond text-[11px] font-bold tracking-[0.14em] text-bone mb-3">
                Color: <span className="text-mist font-body normal-case">{color}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`h-9 w-9 rounded-full border-2 transition-all ${
                      color === c.name ? 'border-accent scale-110' : 'border-bone/20 hover:border-bone'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="cond text-[11px] font-bold tracking-[0.14em] text-bone">
                  Size: <span className="text-mist font-body normal-case">{size}</span>
                </p>
                <button className="text-[10px] font-cond font-bold uppercase tracking-[0.12em] text-fog hover:text-accent transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 w-14 text-xs font-cond font-bold border transition-all ${
                      size === s
                        ? 'border-accent bg-accent text-bone'
                        : 'border-bone/20 text-mist hover:border-bone hover:text-bone'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + actions */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center border border-bone/20">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center text-bone hover:text-accent transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-bone font-cond font-bold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-12 w-12 place-items-center text-bone hover:text-accent transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`btn-ink flex-1 ${added ? '!bg-accent' : ''}`}
              >
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

            <button onClick={handleBuyNow} className="btn-accent mt-3 w-full">
              Buy Now
            </button>

            {/* Delivery checker */}
            <div className="mt-7 border border-bone/10 rounded-2xl p-5 bg-char">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={16} className="text-accent" />
                <p className="cond text-[11px] font-bold tracking-[0.14em] text-bone">
                  Delivery / Location Checker
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter city or postcode"
                  className="flex-1 bg-ink border border-bone/15 px-3 py-2.5 text-sm text-bone focus:border-accent outline-none"
                />
                <button onClick={checkDelivery} className="btn-outline px-5">
                  Check
                </button>
              </div>
              {deliveryMsg && (
                <p className="mt-3 text-xs text-mist animate-fade-in">{deliveryMsg}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-fog">
                <span className="flex items-center gap-1.5">
                  <Check size={12} className="text-accent" /> {product.availability}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={12} className="text-accent" /> Ships from {product.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-20">
          <div className="flex items-center justify-between border-b border-bone/10 pb-5">
            <h3 className="display text-bone text-3xl md:text-4xl">You may also like</h3>
            <button onClick={onBack} className="text-[11px] font-cond font-bold uppercase tracking-[0.14em] text-fog hover:text-accent transition-colors">
              View all
            </button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {related.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onProduct(p.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl text-left"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="cond text-[9px] font-bold tracking-[0.15em] text-accent">{p.brand}</p>
                  <p className="text-bone text-xs font-medium leading-tight line-clamp-1">{p.name}</p>
                  <p className="text-mist text-[11px] mt-0.5">${p.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
