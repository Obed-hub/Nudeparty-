import React from 'react';
import { Crown, Flame, Car, Check, Sparkles, Star, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { DestinationCity, SupportedCurrency } from '../types';
import { convertCurrency } from '../data/globalDestinationsData';

interface BachelorVipSpecialProps {
  city: DestinationCity;
  currency: SupportedCurrency;
  onBookBachelor: () => void;
}

export const BachelorVipSpecial: React.FC<BachelorVipSpecialProps> = ({ city, currency, onBookBachelor }) => {
  const convertedGoldPrice = convertCurrency(250, currency);
  const convertedPerGuy = convertCurrency(31, currency);

  return (
    <section id="bachelor-section" className="py-20 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white relative overflow-hidden border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Bachelor Experience Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-600/20 border border-rose-500/40 rounded-full text-rose-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>THE ULTIMATE {city.name.toUpperCase()} BACHELOR RITUAL</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase font-serif tracking-tight leading-tight">
              GIVE YOUR BACHELOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-500">
                AN UNFORGETTABLE SEND-OFF
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-mono">
              In {city.name}, our Gold Bachelor & Birthday VIP Package is the undisputed #1 celebration choice. From custom luxury pickups with beverage store stops, to front-row leather booths and legendary center-stage roasts, we handle everything so the Best Man looks like a hero.
            </p>

            {/* Bachelor Perks List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-zinc-300">
              <div className="p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl flex items-start gap-2.5">
                <Crown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">On-Stage Bachelor Hot Seat</strong>
                  <span className="text-zinc-400 text-[11px]">Bachelor brought onto stage for 3-entertainer comedy roast</span>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl flex items-start gap-2.5">
                <Car className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Roundtrip VIP Pickup</strong>
                  <span className="text-zinc-400 text-[11px]">Free pickup & drop-off for your whole group in {city.name}</span>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">{city.byobAllowed ? 'BYOB Liquor Freedom' : 'VIP Table Bottle Setups'}</strong>
                  <span className="text-zinc-400 text-[11px]">{city.byobAllowed ? 'Free liquor store stop + free mixer setups' : 'Dedicated table hostess + chilled mixers'}</span>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Zero Cover Charge</strong>
                  <span className="text-zinc-400 text-[11px]">Walk directly past the lines via private VIP side entrance</span>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 bg-zinc-900 border-l-4 border-amber-400 rounded-r-xl text-xs font-mono text-zinc-400 italic">
              "We booked a bachelor party of 9 guys for our trip to {city.name}. The driver arrived right at our hotel valet on time, stopped for drinks, and our bachelor got roasted on the main stage. Absolutely epic night." — Ryan T., Best Man
            </div>

            <div className="pt-2">
              <button
                onClick={onBookBachelor}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-2xl shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Crown className="w-4 h-4 text-black" />
                <span>BOOK GOLD BACHELOR PACKAGE ({convertedGoldPrice.formatted})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Feature Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left">
            <div className="text-center pb-6 border-b border-zinc-800">
              <span className="text-4xl">👑</span>
              <h3 className="text-2xl font-black text-white font-serif uppercase mt-2">
                The Gold Bachelor Package
              </h3>
              <div className="text-3xl font-black text-amber-400 font-serif mt-1">{convertedGoldPrice.formatted} Total</div>
              <span className="text-[11px] text-emerald-400 font-mono">Covers up to 8 Guests (~{convertedPerGuy.formatted}/person)</span>
            </div>

            <div className="py-6 space-y-3 font-mono text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Roundtrip Luxury VIP / Chauffeur Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Free 10-Min Beverage Store Stop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Reserved Leather VIP Runway Booth</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>2 Carafes / Champagne + Fruit Platter</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Stage Spotlight Hot Seat for Bachelor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>$50 in Stage Singles Cash for Runway</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Commemorative Stainless Steel Keepsake Flask</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 text-center">
              <button
                onClick={onBookBachelor}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-widest rounded-xl transition"
              >
                Instant Online Reservation in {city.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
