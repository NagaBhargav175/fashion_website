import { X, Heart, Trash2 } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store/StoreContext';

type Props = {
  open: boolean;
  onClose: () => void;
  onProduct: (id: string) => void;
};

export default function WishlistDrawer({ open, onClose, onProduct }: Props) {
  const { wishlist, toggleWishlist } = useStore();
  if (!open) return null;

  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-char border-l border-bone/10 animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between border-b border-bone/10 p-6">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-accent" fill="currentColor" />
            <span className="cond text-sm font-bold tracking-[0.16em] text-bone">
              Wishlist ({items.length})
            </span>
          </div>
          <button onClick={onClose} className="text-bone p-1" aria-label="Close wishlist">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
            <Heart size={48} className="text-ash mb-4" strokeWidth={1} />
            <p className="display text-mist text-4xl">No saves yet</p>
            <p className="mt-2 text-sm text-fog">Tap the heart on any piece to save it here.</p>
            <button onClick={onClose} className="btn-outline mt-6">
              Browse the Edit
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.map((p) => (
              <div key={p.id} className="flex gap-4 border-b border-bone/5 pb-4">
                <button
                  onClick={() => {
                    onProduct(p.id);
                    onClose();
                  }}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-ink"
                >
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                </button>
                <div className="flex flex-1 flex-col">
                  <p className="cond text-[9px] font-bold tracking-[0.15em] text-accent">{p.brand}</p>
                  <button
                    onClick={() => {
                      onProduct(p.id);
                      onClose();
                    }}
                    className="text-left text-bone text-sm font-medium leading-snug line-clamp-2 hover:text-accent transition-colors"
                  >
                    {p.name}
                  </button>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-bone font-cond font-bold">${p.price}</span>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="text-fog hover:text-accent transition-colors flex items-center gap-1.5 text-[10px] font-cond font-bold uppercase tracking-[0.12em]"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
