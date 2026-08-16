import React, { useState } from 'react';
import { Wine, Sparkles, CheckCircle2, ShieldCheck, Flame, Coffee, DollarSign, Globe } from 'lucide-react';
import { DestinationCity, SupportedCurrency } from '../types';
import { convertCurrency } from '../data/globalDestinationsData';

interface ByobMenuSectionProps {
  city: DestinationCity;
  currency: SupportedCurrency;
  onOpenBooking: () => void;
}

export const ByobMenuSection: React.FC<ByobMenuSectionProps> = ({ city, currency, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'MIXERS' | 'HOOKAH' | 'SNACKS'>('MIXERS');

  const mixerItems = [
    { name: 'Chilled Red Bull Energy Pitcher (4 Cans)', desc: 'Regular, Sugarfree, or Tropical Yellow', priceUSD: 28 },
    { name: 'Premium Fresh Juice Carafe (Cranberry / Pineapple / Orange)', desc: 'Served in chilled glass carafe with garnishes', priceUSD: 16 },
    { name: 'Gourmet Tonic & Soda Water Set (4 Bottles)', desc: 'Fever-Tree artisanal club soda with fresh limes', priceUSD: 18 },
    { name: 'Custom Coca-Cola / Sprite Carafe Bar Setup', desc: 'Unlimited ice buckets and highball glassware', priceUSD: 14 }
  ];

  const hookahItems = [
    { name: 'Exotic Mint Love 66 Hookah', desc: 'Premium Turkish waterpipe with ice hose attachment', priceUSD: 45 },
    { name: 'Double Apple & Blue Mist Fruit Blend', desc: 'Smooth, dense clouds with glowing LED base', priceUSD: 45 },
    { name: 'VIP Champagne Head Upgrade', desc: 'Hookah base filled with chilled bubbly & fresh berries', priceUSD: 75 }
  ];

  const snackItems = [
    { name: 'Crispy Buffalo Wings Basket (12 Pcs)', desc: 'Served with celery, carrots, ranch & blue cheese', priceUSD: 18 },
    { name: 'Artisanal Charcuterie & Cheese Board', desc: 'Cured meats, aged cheddar, gouda, grapes & crackers', priceUSD: 32 },
    { name: 'Loaded Nachos Grande with Guacamole', desc: 'Melted queso, jalapeños, pico de gallo, sour cream', priceUSD: 22 },
    { name: 'Truffle Parmesan Hand-Cut Fries', desc: 'White truffle oil, fresh herbs & garlic aioli', priceUSD: 14 }
  ];

  const currentItems = activeTab === 'MIXERS' ? mixerItems : activeTab === 'HOOKAH' ? hookahItems : snackItems;

  return (
    <section id="byob-section" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Wine className="w-3.5 h-3.5" />
              <span>{city.byobAllowed ? 'BYOB LIQUOR POLICY' : 'VIP BOTTLE SERVICE POLICY'} • {city.name.toUpperCase()}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase font-serif tracking-tight leading-tight">
              {city.byobAllowed ? (
                <>
                  BRING YOUR OWN BOTTLE <br />
                  <span className="text-emerald-400">NO $500 CLUB MARKUPS</span>
                </>
              ) : (
                <>
                  VIP BOTTLE SERVICE <br />
                  <span className="text-amber-400">& EXOTIC LOUNGE MENUS</span>
                </>
              )}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base font-mono leading-relaxed">
              {city.byobAllowed ? (
                `Unlike traditional nightclubs that charge $600+ per bottle, in ${city.name} you can bring your favorite spirits, tequila, or champagne directly to your VIP booth. Our driver stops at a retail beverage shop on the way!`
              ) : (
                `Experience world-class bottle service in ${city.name} with dedicated hostesses, sparkler presentations, artisanal mixers, and premium food platters.`
              )}
            </p>

            <div className="space-y-3 font-mono text-xs text-zinc-300">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited ice buckets, glassware, and cocktail napkins included with all VIP booths.</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated table hostess serves shots, mixes drinks, and keeps cups full all night.</span>
              </div>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free retail beverage stop in your pickup ride on the way from your hotel.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-mono text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition"
              >
                Reserve VIP Booth & Table Service
              </button>
            </div>
          </div>

          {/* Right Column: Menu Tabs Card */}
          <div className="lg:col-span-6 bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white font-serif uppercase">
                  Table Mixers, Hookah & Kitchen Menu
                </h3>
                <span className="text-[11px] font-mono text-zinc-400">Prices formatted in {currency}</span>
              </div>
            </div>

            {/* Menu Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('MIXERS')}
                className={`flex-1 py-2 text-xs font-mono font-bold uppercase rounded-lg transition ${
                  activeTab === 'MIXERS'
                    ? 'bg-amber-400 text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                🍹 Mixers & Carafes
              </button>
              <button
                onClick={() => setActiveTab('HOOKAH')}
                className={`flex-1 py-2 text-xs font-mono font-bold uppercase rounded-lg transition ${
                  activeTab === 'HOOKAH'
                    ? 'bg-amber-400 text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                💨 Exotic Hookah
              </button>
              <button
                onClick={() => setActiveTab('SNACKS')}
                className={`flex-1 py-2 text-xs font-mono font-bold uppercase rounded-lg transition ${
                  activeTab === 'SNACKS'
                    ? 'bg-amber-400 text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                🍗 VIP Kitchen
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              {currentItems.map((item, idx) => {
                const converted = convertCurrency(item.priceUSD, currency);
                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">{item.name}</h4>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-sm font-black text-amber-400 font-serif whitespace-nowrap">
                      {converted.formatted}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
