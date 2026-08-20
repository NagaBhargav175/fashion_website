import { useState } from 'react';
import {
  SlidersHorizontal,
  X,
  Star,
  ChevronDown,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  brands as allBrands,
  allSizes,
  categories as allCategories,
  colorOptions,
  locations,
} from '@/data/products';

export type Filters = {
  priceMin: number;
  priceMax: number;
  sizes: string[];
  brands: string[];
  location: string;
  category: string;
  colors: string[];
  rating: number;
  discount: number;
  inStockOnly: boolean;
  sort: SortKey;
};

export type SortKey =
  | 'recommended'
  | 'newest'
  | 'priceLow'
  | 'priceHigh';

export const defaultFilters: Filters = {
  priceMin: 0,
  priceMax: 1000,
  sizes: [],
  brands: [],
  location: '',
  category: '',
  colors: [],
  rating: 0,
  discount: 0,
  inStockOnly: false,
  sort: 'recommended',
};

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'newest', label: 'Newest' },
  { key: 'priceLow', label: 'Price: Low to High' },
  { key: 'priceHigh', label: 'Price: High to Low' },
];

type Props = {
  filters: Filters;
  setFilters: (f: Filters) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenMobile: () => void;
};

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-bone/10 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="cond text-[11px] font-bold tracking-[0.16em] text-bone">{title}</span>
        <ChevronDown
          size={15}
          className={`text-fog transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="mt-4 animate-fade-in">{children}</div>}
    </div>
  );
}

function Stars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[4, 3, 2, 1].map((r) => (
        <button key={r} onClick={() => onChange(value === r ? 0 : r)} className="group">
          <Star
            size={16}
            className={value >= r ? 'text-accent' : 'text-ash'}
            fill={value >= r ? 'currentColor' : 'none'}
            strokeWidth={1.5}
          />
        </button>
      ))}
      <span className="ml-2 text-[10px] text-mist">& up</span>
    </div>
  );
}

export default function FiltersPanel({
  filters,
  setFilters,
  mobileOpen,
  onCloseMobile,
  onOpenMobile,
}: Props) {
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters({ ...filters, [key]: value });

  const toggleArray = (key: 'sizes' | 'brands' | 'colors', val: string) => {
    const arr = filters[key];
    update(key, arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const reset = () => setFilters(defaultFilters);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-bone/10 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-accent" />
          <span className="cond text-sm font-bold tracking-[0.16em] text-bone">Filters</span>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-[10px] font-cond font-bold uppercase tracking-[0.12em] text-fog hover:text-accent transition-colors"
        >
          <RotateCcw size={12} /> Clear All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 -mr-1">
        {/* Sort */}
        <div className="border-b border-bone/10 py-5">
          <span className="cond text-[11px] font-bold tracking-[0.16em] text-bone">Sort By</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => update('sort', opt.key)}
                className={`px-3 py-1.5 text-[10px] font-cond font-bold uppercase tracking-[0.12em] border transition-all ${
                  filters.sort === opt.key
                    ? 'border-accent bg-accent text-bone'
                    : 'border-bone/15 text-mist hover:border-bone hover:text-bone'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <Section title="Price Range">
          <div className="flex items-center justify-between text-[11px] text-mist mb-3">
            <span className="text-bone font-cond font-bold">${filters.priceMin}</span>
            <span className="text-bone font-cond font-bold">${filters.priceMax}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={filters.priceMax}
            onChange={(e) => update('priceMax', Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input
              type="number"
              min={0}
              value={filters.priceMin}
              onChange={(e) => update('priceMin', Number(e.target.value))}
              className="bg-char border border-bone/15 px-2.5 py-1.5 text-xs text-bone focus:border-accent outline-none"
              placeholder="Min"
            />
            <input
              type="number"
              min={0}
              value={filters.priceMax}
              onChange={(e) => update('priceMax', Number(e.target.value))}
              className="bg-char border border-bone/15 px-2.5 py-1.5 text-xs text-bone focus:border-accent outline-none"
              placeholder="Max"
            />
          </div>
        </Section>

        {/* Size */}
        <Section title="Size">
          <div className="flex flex-wrap gap-2">
            {allSizes.map((s) => (
              <button
                key={s}
                onClick={() => toggleArray('sizes', s)}
                className={`h-9 w-11 text-[11px] font-cond font-bold border transition-all ${
                  filters.sizes.includes(s)
                    ? 'border-accent bg-accent text-bone'
                    : 'border-bone/20 text-mist hover:border-bone hover:text-bone'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Section>

        {/* Brand */}
        <Section title="Brand">
          <div className="flex flex-col gap-2.5">
            {allBrands.map((b) => (
              <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
                <span
                  className={`grid h-4 w-4 place-items-center border transition-all ${
                    filters.brands.includes(b)
                      ? 'border-accent bg-accent'
                      : 'border-bone/25 group-hover:border-bone'
                  }`}
                >
                  {filters.brands.includes(b) && <Check size={11} className="text-bone" />}
                </span>
                <input
                  type="checkbox"
                  checked={filters.brands.includes(b)}
                  onChange={() => toggleArray('brands', b)}
                  className="sr-only"
                />
                <span className="text-[12px] text-mist group-hover:text-bone transition-colors">
                  {b}
                </span>
              </label>
            ))}
          </div>
        </Section>

        {/* Location */}
        <Section title="Location">
          <select
            value={filters.location}
            onChange={(e) => update('location', e.target.value)}
            className="w-full bg-char border border-bone/15 px-3 py-2.5 text-xs text-bone focus:border-accent outline-none"
          >
            <option value="">All locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Section>

        {/* Category */}
        <Section title="Category">
          <div className="flex flex-wrap gap-2">
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => update('category', filters.category === c ? '' : c)}
                className={`px-3 py-1.5 text-[10px] font-cond font-bold uppercase tracking-[0.12em] border transition-all ${
                  filters.category === c
                    ? 'border-accent bg-accent text-bone'
                    : 'border-bone/15 text-mist hover:border-bone hover:text-bone'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Section>

        {/* Color */}
        <Section title="Color">
          <div className="flex flex-wrap gap-2.5">
            {colorOptions.map((c) => {
              const active = filters.colors.includes(c.name);
              return (
                <button
                  key={c.name}
                  onClick={() => toggleArray('colors', c.name)}
                  className="group flex flex-col items-center gap-1"
                  title={c.name}
                >
                  <span
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      active ? 'border-accent scale-110' : 'border-bone/20 hover:border-bone'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[9px] text-mist group-hover:text-bone">{c.name}</span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Rating */}
        <Section title="Rating">
          <Stars value={filters.rating} onChange={(v) => update('rating', v)} />
        </Section>

        {/* Discount */}
        <Section title="Discount %" defaultOpen={false}>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={filters.discount}
            onChange={(e) => update('discount', Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="mt-2 text-[11px] text-mist">
            <span className="text-bone font-cond font-bold">{filters.discount}%</span> or more off
          </div>
        </Section>

        {/* Availability */}
        <Section title="Availability" defaultOpen={false}>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <span
              className={`grid h-4 w-4 place-items-center border transition-all ${
                filters.inStockOnly ? 'border-accent bg-accent' : 'border-bone/25 group-hover:border-bone'
              }`}
            >
              {filters.inStockOnly && <Check size={11} className="text-bone" />}
            </span>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => update('inStockOnly', e.target.checked)}
              className="sr-only"
            />
            <span className="text-[12px] text-mist group-hover:text-bone transition-colors">
              In stock only
            </span>
          </label>
        </Section>
      </div>

      {/* Apply (mobile only, visible inside drawer) */}
      <div className="border-t border-bone/10 pt-4 lg:hidden">
        <button onClick={onCloseMobile} className="btn-accent w-full">
          Show Results
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={onOpenMobile}
        className="lg:hidden flex items-center gap-2 border border-bone/20 px-4 py-2.5 text-[10px] font-cond font-bold uppercase tracking-[0.14em] text-bone hover:border-accent hover:text-accent transition-all"
      >
        <SlidersHorizontal size={15} /> Filters
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto bg-char border border-bone/10 rounded-2xl p-5 no-scrollbar">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-fade-in"
            onClick={onCloseMobile}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[88%] max-w-sm bg-char border-l border-bone/10 animate-slide-in-right p-5 flex flex-col">
            <button
              onClick={onCloseMobile}
              className="absolute right-4 top-4 text-bone p-1 z-10"
              aria-label="Close filters"
            >
              <X size={22} />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
