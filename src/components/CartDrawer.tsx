import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

type Props = {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
};

export default function CartDrawer({ open, onClose, onCheckout }: Props) {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useStore();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-char border-l border-bone/10 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-bone/10 p-6">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-accent" />
            <span className="cond text-sm font-bold tracking-[0.16em] text-bone">
              Cart ({cartCount})
            </span>
          </div>
          <button onClick={onClose} className="text-bone p-1" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
            <ShoppingBag size={48} className="text-ash mb-4" strokeWidth={1} />
            <p className="display text-mist text-4xl">Empty</p>
            <p className="mt-2 text-sm text-fog">Your cart is waiting to be filled.</p>
            <button onClick={onClose} className="btn-outline mt-6">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-4 border-b border-bone/5 pb-5"
              >
                <div className="relative h-28 w-22 shrink-0 overflow-hidden rounded-xl bg-ink">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="cond text-[9px] font-bold tracking-[0.15em] text-accent">
                        {item.product.brand}
                      </p>
                      <p className="text-bone text-sm font-medium leading-snug line-clamp-2">
                        {item.product.name}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product, item.size, item.color)}
                      className="text-fog hover:text-accent transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-mist">
                    {item.size} · {item.color}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center border border-bone/15">
                      <button
                        onClick={() =>
                          updateQty(item.product, item.size, item.color, item.qty - 1)
                        }
                        className="grid h-7 w-7 place-items-center text-bone hover:text-accent"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-xs text-bone font-cond font-bold">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(item.product, item.size, item.color, item.qty + 1)
                        }
                        className="grid h-7 w-7 place-items-center text-bone hover:text-accent"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-bone font-cond font-bold">
                      ${item.product.price * item.qty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-bone/10 p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-mist cond tracking-[0.14em]">Subtotal</span>
              <span className="text-bone font-cond font-black text-xl">${cartTotal}</span>
            </div>
            <p className="text-[11px] text-fog">
              Shipping & taxes calculated at checkout. Free shipping over $250.
            </p>
            <button onClick={onCheckout} className="btn-accent w-full">
              Checkout <ArrowRight size={16} />
            </button>
            <button onClick={onClose} className="w-full text-center text-[11px] font-cond font-bold uppercase tracking-[0.14em] text-fog hover:text-bone transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
