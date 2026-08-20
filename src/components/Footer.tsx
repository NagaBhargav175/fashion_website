import { useState } from 'react';
import {
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Check,
} from 'lucide-react';

const cols = [
  {
    title: 'Collections',
    links: ['New Arrivals', 'Trending', 'Best Sellers', 'FW26 Editorial', 'Lookbook', 'Archive'],
  },
  {
    title: 'Categories',
    links: ['Men', 'Women', 'Apparel', 'Footwear', 'Outerwear', 'Accessories'],
  },
  {
    title: 'Help / Support',
    links: ['Size Guide', 'Shipping', 'Returns', 'Track Order', 'FAQ', 'Contact'],
  },
  {
    title: 'Account',
    links: ['Sign In', 'Create Account', 'My Orders', 'Wishlist', 'Store Locator', 'Loyalty'],
  },
];

const payments = ['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE', 'GPAY'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-ink border-t border-bone/10">
      {/* Newsletter */}
      <div className="border-b border-bone/10">
        <div className="container-edge py-14 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="cond text-[11px] font-bold tracking-[0.2em] text-accent mb-3">
                Join the movement
              </p>
              <h2 className="display text-bone text-4xl md:text-6xl leading-[0.9]">
                Get the drop
                <br />
                before it drops.
              </h2>
              <p className="mt-4 text-mist text-sm max-w-md">
                Early access to limited runs, editorial stories, and members-only pricing. No noise —
                just raw power.
              </p>
            </div>
            <form onSubmit={subscribe} className="w-full">
              <div className="flex border-b-2 border-bone/20 focus-within:border-accent transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-bone text-lg md:text-xl py-3 outline-none placeholder:text-ash"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 text-bone hover:text-accent transition-colors pr-1"
                >
                  <span className="cond text-[11px] font-bold tracking-[0.16em] hidden sm:block">
                    Subscribe
                  </span>
                  <ArrowRight size={20} />
                </button>
              </div>
              {subscribed && (
                <p className="mt-3 text-xs text-accent flex items-center gap-1.5 animate-fade-in">
                  <Check size={14} /> You're in. Watch your inbox for the next drop.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-edge py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <span className="font-display text-3xl text-bone tracking-tightest whitespace-nowrap">HULK BUSTER</span>
            <p className="mt-4 text-mist text-sm leading-relaxed max-w-xs">
              Premium streetwear engineered for the unstoppable. Limited runs, heavyweight construction,
              zero compromise. Worn by the bold.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center border border-bone/15 text-mist hover:border-accent hover:text-accent transition-all rounded-full"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="cond text-[11px] font-bold tracking-[0.16em] text-bone mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[12px] text-fog hover:text-bone transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-bone/10 pt-8 sm:grid-cols-3">
          <span className="flex items-center gap-2.5 text-[12px] text-fog">
            <MapPin size={14} className="text-accent" /> 14 Savage Street, NYC
          </span>
          <a href="mailto:hi@hulkbuster.studio" className="flex items-center gap-2.5 text-[12px] text-fog hover:text-bone transition-colors">
            <Mail size={14} className="text-accent" /> hi@hulkbuster.studio
          </a>
          <a href="tel:+12125550199" className="flex items-center gap-2.5 text-[12px] text-fog hover:text-bone transition-colors">
            <Phone size={14} className="text-accent" /> +1 (212) 555-0199
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-bone/10">
        <div className="container-edge py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] text-fog">
            © {new Date().getFullYear()} HULK BUSTER. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {payments.map((p) => (
              <span
                key={p}
                className="px-2.5 py-1 border border-bone/15 text-[9px] font-cond font-bold tracking-[0.1em] text-mist rounded"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
