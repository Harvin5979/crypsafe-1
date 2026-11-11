import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// 11.11 campaign window, Malaysia time (UTC+8)
const PROMO_START = new Date("2026-11-11T00:00:00+08:00");
const PROMO_END = new Date("2026-11-23T23:59:59+08:00");

export function isPromo1111Active(now = new Date()) {
  return now >= PROMO_START && now <= PROMO_END;
}

function useCountdown() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, PROMO_END - now);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

// Slim strip shown at the top of every page during the campaign
export function Promo1111Bar() {
  return (
    <Link
      to={createPageUrl("Shop")}
      className="block bg-gradient-to-r from-[#ff3d6e] via-[#ff7a3d] to-[#ffb400] py-2 px-4 text-center hover:brightness-110 transition"
    >
      <p className="text-[#071018] text-sm md:text-base font-bold">
        🔥 <span className="animate-pulse">11.11 SALE</span>: 10% OFF Tangem Wallets · Ends 23.11 · FREE SHIPPING Across Malaysia
        <span className="hidden sm:inline underline ml-2">Shop now →</span>
      </p>
    </Link>
  );
}

// Larger banner for the homepage
export function Promo1111Banner() {
  const { days, hours, minutes, seconds } = useCountdown();
  const units = [
    ["Days", days],
    ["Hrs", hours],
    ["Min", minutes],
    ["Sec", seconds],
  ];

  return (
    <section className="container mx-auto px-4 pt-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#ff7a3d]/40 bg-gradient-to-br from-[#2a0f1a] via-[#1a1420] to-[#0b2221] p-6 md:p-10">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#ff3d6e] rounded-full blur-3xl opacity-25"></div>
        <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-[#ffb400] rounded-full blur-3xl opacity-15"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="text-6xl md:text-8xl font-black leading-none bg-gradient-to-r from-[#ff3d6e] to-[#ffb400] bg-clip-text text-transparent">
            11.11
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold tracking-widest text-[#ffb400] mb-2">MEGA SALE · 11.11 – 23.11.2026</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              10% OFF <span className="text-[#00ffc6]">Tangem</span> Hardware Wallets
            </h2>
            <p className="text-[#c6fff0] md:text-lg">
              Cold storage that's yours alone: no seed phrase to write down, no cables, no batteries. Genuine sealed stock from an authorised Malaysian reseller, with free shipping nationwide.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-center gap-4">
            <div className="flex gap-2">
              {units.map(([label, value]) => (
                <div key={label} className="w-16 rounded-lg bg-[#071018]/70 border border-[#ff7a3d]/30 py-2 text-center">
                  <div className="text-2xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
                  <div className="text-[10px] uppercase tracking-wider text-[#bfeee0]">{label}</div>
                </div>
              ))}
            </div>
            <Link to={createPageUrl("Shop")}>
              <Button className="bg-gradient-to-r from-[#ff3d6e] to-[#ff7a3d] hover:brightness-110 text-white font-bold px-6 py-6 text-lg">
                Shop the 11.11 Deal
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
