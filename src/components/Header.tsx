import { useEffect, useState } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
} from 'lucide-react';

type Props = {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigate: (view: 'home' | 'shop') => void;
  cartCount: number;
  wishCount: number;
};

const navLinks = ['Home', 'Stores', 'Services', 'Men', 'Women', 'Apparel', 'Eat', 'Blog'];

const social = [
  { Icon: Instagram, href: '#' },
  { Icon: Twitter, href: '#' },
  { Icon: Youtube, href: '#' },
];

export default function Header({
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onNavigate,
  cartCount,
  wishCount,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-ink text-bone border-b border-bone/10">
        <div className="container-edge flex min-h-9 items-center justify-between gap-4 text-[10px] font-cond font-bold uppercase tracking-[0.18em]">
          <span className="hidden sm:block shrink-0 text-accent">Luxury. Trends. Deals.</span>
          <span className="min-w-0 truncate text-center text-mist">
            Free worldwide shipping over $250 — New drops every Thursday
          </span>
          <div className="hidden sm:flex shrink-0 items-center gap-3">
            {social.map(({ Icon, href }, i) => (
              <a key={i} href={href} className="text-mist hover:text-bone transition-colors">
                <Icon size={13} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`border-b border-bone/10 transition-all duration-300 ${
          scrolled ? 'bg-ink/95 backdrop-blur-xl py-3' : 'bg-ink/75 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container-edge flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex shrink-0 items-center gap-2 group"
            aria-label="HULK BUSTER home"
          >
            <span className="font-display text-2xl leading-none tracking-tightest text-bone group-hover:text-accent transition-colors whitespace-nowrap">
              HULK BUSTER
            </span>
            <span className="hidden xl:block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          </button>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-7">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => onNavigate(link === 'Home' ? 'home' : 'shop')}
                className="cond whitespace-nowrap text-[10px] font-bold tracking-[0.12em] text-mist hover:text-bone link-underline transition-colors"
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
            <button onClick={onOpenSearch} className="p-2 text-bone hover:text-accent transition-colors" aria-label="Search">
              <Search size={18} strokeWidth={2} />
            </button>
            <button className="hidden sm:block p-2 text-bone hover:text-accent transition-colors" aria-label="Account">
              <User size={18} strokeWidth={2} />
            </button>
            <button onClick={onOpenWishlist} className="relative p-2 text-bone hover:text-accent transition-colors" aria-label="Wishlist">
              <Heart size={18} strokeWidth={2} />
              {wishCount > 0 && <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-ink">{wishCount}</span>}
            </button>
            <button onClick={onOpenCart} className="relative p-2 text-bone hover:text-accent transition-colors" aria-label="Cart">
              <ShoppingBag size={18} strokeWidth={2} />
              {cartCount > 0 && <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-ink">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(true)} className="p-2 text-bone xl:hidden" aria-label="Menu">
              <Menu size={21} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 2xl:hidden">
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[82%] max-w-sm bg-char border-l border-bone/10 animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-bone/10">
              <span className="font-display text-2xl text-bone whitespace-nowrap">HULK BUSTER</span>
              <button onClick={() => setMobileOpen(false)} className="text-bone p-1" aria-label="Close">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    onNavigate(link === 'Home' ? 'home' : 'shop');
                    setMobileOpen(false);
                  }}
                  className="group flex items-center justify-between py-4 border-b border-bone/5 text-bone hover:text-accent transition-colors"
                >
                  <span className="cond text-sm font-bold tracking-[0.16em]">{link}</span>
                  <ChevronRight
                    size={18}
                    className="text-fog group-hover:text-accent group-hover:translate-x-1 transition-all"
                  />
                </button>
              ))}
            </nav>
            <div className="p-6 border-t border-bone/10 flex items-center gap-5">
              {social.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="text-mist hover:text-bone transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
