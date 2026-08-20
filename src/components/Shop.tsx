import { useMemo } from 'react';
import { LayoutGrid } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FiltersPanel, { defaultFilters, type Filters } from '@/components/FiltersPanel';

type Props = {
  filters: Filters;
  setFilters: (f: Filters) => void;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (b: boolean) => void;
  onQuickView: (id: string) => void;
  onProduct: (id: string) => void;
};

export default function Shop({
  filters,
  setFilters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  onQuickView,
  onProduct,
}: Props) {
  const filtered = useMemo(() => {
    let list = [...products];

    if (filters.priceMin > 0) list = list.filter((p) => p.price >= filters.priceMin);
    if (filters.priceMax < 1000) list = list.filter((p) => p.price <= filters.priceMax);
    if (filters.sizes.length) list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    if (filters.location) list = list.filter((p) => p.location === filters.location);
    if (filters.category) list = list.filter((p) => p.category === filters.category);
    if (filters.colors.length)
      list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    if (filters.rating) list = list.filter((p) => p.rating >= filters.rating);
    if (filters.discount) list = list.filter((p) => p.discount >= filters.discount);
    if (filters.inStockOnly) list = list.filter((p) => p.availability === 'In Stock');

    switch (filters.sort) {
      case 'priceLow':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
        break;
      default:
        break;
    }
    return list;
  }, [filters]);

  const activeCount = [
    filters.sizes.length,
    filters.brands.length,
    filters.colors.length,
    filters.location ? 1 : 0,
    filters.category ? 1 : 0,
    filters.rating ? 1 : 0,
    filters.discount ? 1 : 0,
    filters.inStockOnly ? 1 : 0,
    filters.priceMin > 0 || filters.priceMax < 1000 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <section id="shop" className="bg-ink py-16 md:py-24">
      <div className="container-edge">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-bone/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LayoutGrid size={14} className="text-accent" />
              <span className="cond text-[11px] font-bold tracking-[0.2em] text-accent">
                The Edit
              </span>
            </div>
            <h2 className="display text-bone text-5xl md:text-6xl lg:text-7xl">
              Shop the <span className="text-accent">collection</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-cond uppercase tracking-[0.14em] text-mist">
            <span>
              <span className="text-bone font-bold">{filtered.length}</span> pieces
            </span>
            {activeCount > 0 && (
              <button
                onClick={() => setFilters(defaultFilters)}
                className="text-fog hover:text-accent transition-colors"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
        </div>

        {/* Layout: products left, filters right */}
        <div className="mt-8 flex flex-col-reverse gap-8 lg:flex-row">
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                <p className="display text-mist text-5xl">No matches</p>
                <p className="mt-3 text-sm text-fog max-w-xs">
                  No pieces fit these filters. Try clearing a few to widen the search.
                </p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="btn-outline mt-6"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onQuickView={onQuickView}
                    onProduct={onProduct}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right filter panel */}
          <div className="lg:w-72 lg:shrink-0">
            <FiltersPanel
              filters={filters}
              setFilters={setFilters}
              mobileOpen={mobileFiltersOpen}
              onCloseMobile={() => setMobileFiltersOpen(false)}
              onOpenMobile={() => setMobileFiltersOpen(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
