import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '@/data/products';

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  qty: number;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (product: Product, size: string, color: string) => void;
  updateQty: (product: Product, size: string, color: string, qty: number) => void;
  cartCount: number;
  cartTotal: number;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = 'hulkbuster_cart';
const WISH_KEY = 'hulkbuster_wishlist';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart: StoreState['addToCart'] = (product, size, color, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size && i.color === color,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, size, color, qty }];
    });
  };

  const removeFromCart: StoreState['removeFromCart'] = (product, size, color) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.product.id === product.id && i.size === size && i.color === color),
      ),
    );
  };

  const updateQty: StoreState['updateQty'] = (product, size, color, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) =>
        i.product.id === product.id && i.size === size && i.color === color
          ? { ...i, qty }
          : i,
      ),
    );
  };

  const toggleWishlist: StoreState['toggleWishlist'] = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  };

  const isWishlisted: StoreState['isWishlisted'] = (id) => wishlist.includes(id);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cart],
  );

  const value: StoreState = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQty,
    cartCount,
    cartTotal,
    toggleWishlist,
    isWishlisted,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
