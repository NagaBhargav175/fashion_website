import { useState } from 'react';
import { StoreProvider, useStore } from '@/store/StoreContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MarqueeStrip from '@/components/MarqueeStrip';
import FeatureStrip from '@/components/FeatureStrip';
import Shop from '@/components/Shop';
import Collections from '@/components/Collections';
import Lookbook from '@/components/Lookbook';
import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import QuickView from '@/components/QuickView';
import { defaultFilters, type Filters } from '@/components/FiltersPanel';

type View = 'home' | 'shop' | 'product';

function AppInner() {
  const { cartCount, wishlist } = useStore();
  const [view, setView] = useState<View>('home');
  const [productId, setProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);

  const goShop = () => {
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (id: string) => {
    setProductId(id);
    setView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-ink">
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishOpen(true)}
        onNavigate={(v) => (v === 'home' ? goHome() : goShop())}
        cartCount={cartCount}
        wishCount={wishlist.length}
      />

      <main>
        {view === 'home' && (
          <>
            <Hero onShop={goShop} onProduct={openProduct} />
            <MarqueeStrip />
            <Collections onShop={goShop} />
            <Shop
              filters={filters}
              setFilters={setFilters}
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
              onQuickView={setQuickViewId}
              onProduct={openProduct}
            />
            <FeatureStrip />
            <Lookbook onShop={goShop} />
          </>
        )}

        {view === 'shop' && (
          <div className="pt-20">
            <Shop
              filters={filters}
              setFilters={setFilters}
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
              onQuickView={setQuickViewId}
              onProduct={openProduct}
            />
            <FeatureStrip />
          </div>
        )}

        {view === 'product' && productId && (
          <ProductDetail
            productId={productId}
            onBack={goShop}
            onProduct={openProduct}
            onOpenCart={() => setCartOpen(true)}
          />
        )}
      </main>

      <Footer />

      {/* Overlays */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => setCartOpen(false)} />
      <WishlistDrawer open={wishOpen} onClose={() => setWishOpen(false)} onProduct={openProduct} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onProduct={openProduct} />
      <QuickView productId={quickViewId} onClose={() => setQuickViewId(null)} onProduct={openProduct} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  );
}
