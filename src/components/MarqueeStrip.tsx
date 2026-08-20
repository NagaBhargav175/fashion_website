const items = [
  'HULK BUSTER / FW26',
  'DROP THURSDAYS',
  'FREE SHIPPING OVER $250',
  'LIMITED RUNS',
  'BUILT TO BREAK LIMITS',
  'UNLEASH THE BEAST',
];

export default function MarqueeStrip() {
  return (
    <div className="bg-accent text-bone overflow-hidden py-3 border-y border-accent-dark">
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 2 }).map((_, dup) => (
          <div key={dup} className="flex items-center">
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="cond text-[11px] font-bold tracking-[0.2em] px-8 flex items-center gap-8"
              >
                {item}
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-bone/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
