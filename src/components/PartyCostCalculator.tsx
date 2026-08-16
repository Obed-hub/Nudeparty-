import React, { useState, useMemo } from 'react';
import { Calculator, Users, Crown, Car, Flame, ArrowRight, DollarSign, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { GLOBAL_VIP_PACKAGES, convertCurrency } from '../data/globalDestinationsData';
import { VIPPackageId, DestinationCity, SupportedCurrency } from '../types';

interface PartyCostCalculatorProps {
  city: DestinationCity;
  currency: SupportedCurrency;
  onBookCalculated: (packageId: VIPPackageId) => void;
}

export const PartyCostCalculator: React.FC<PartyCostCalculatorProps> = ({
  city,
  currency,
  onBookCalculated
}) => {
  const [partySize, setPartySize] = useState(8);
  const [selectedPkgId, setSelectedPkgId] = useState<VIPPackageId>('gold_bachelor');
  const [dancerCashPerGuy, setDancerCashPerGuy] = useState(50);
  const [addHookah, setAddHookah] = useState(true);
  const [addStageRoast, setAddStageRoast] = useState(true);
  const [bachelorGoesFree, setBachelorGoesFree] = useState(true);

  const selectedPackage = GLOBAL_VIP_PACKAGES.find(p => p.id === selectedPkgId) || GLOBAL_VIP_PACKAGES[1];

  const { basePackageCost, totalStageCash, extraAddOnsTotal, totalPartyCost, costPerPerson, payingGuestsCount } = useMemo(() => {
    let base = selectedPackage.price;
    const cash = dancerCashPerGuy * partySize;
    let extras = 0;
    if (addHookah && !selectedPackage.hookahIncluded) extras += 45;
    if (addStageRoast) extras += 50;

    const total = base + cash + extras;
    const payingCount = bachelorGoesFree && partySize > 1 ? partySize - 1 : partySize;
    const perGuy = total / Math.max(1, payingCount);

    return {
      basePackageCost: base,
      totalStageCash: cash,
      extraAddOnsTotal: extras,
      totalPartyCost: total,
      costPerPerson: perGuy,
      payingGuestsCount: payingCount
    };
  }, [selectedPackage, partySize, dancerCashPerGuy, addHookah, addStageRoast, bachelorGoesFree]);

  const convertedTotal = convertCurrency(totalPartyCost, currency);
  const convertedPerGuy = convertCurrency(costPerPerson, currency);
  const convertedBase = convertCurrency(basePackageCost, currency);
  const convertedCash = convertCurrency(totalStageCash, currency);
  const convertedExtras = convertCurrency(extraAddOnsTotal, currency);

  return (
    <section id="calculator-section" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>GLOBAL GROUP BUDGET SPLITTER • {city.name.toUpperCase()}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-serif">
            PARTY & BACHELOR <span className="text-amber-400">COST CALCULATOR</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 font-mono">
            Organizing a bachelor/bachelorette party or guys trip in {city.name}? Calculate the exact split cost per person in {currency} including free hotel pickup, VIP booth, table mixers, stage roast, and dancer singles.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl">
            {/* Party Size Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase text-zinc-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Number of Guests in Your Squad</span>
                </label>
                <span className="text-lg font-black text-amber-400 font-mono">
                  {partySize} Guests
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="w-full h-2 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>1 Guest</span>
                <span>8 Guests (Avg Squad)</span>
                <span>15 Guests</span>
                <span>25 Guests</span>
              </div>
            </div>

            {/* Bachelor Goes Free Switch */}
            <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  👑
                </div>
                <div>
                  <strong className="text-xs font-bold text-white uppercase block">
                    "Bachelor / VIP Goes Free" Mode
                  </strong>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Split total party bill among remaining {payingGuestsCount} guys so the groom pays $0!
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={bachelorGoesFree}
                onChange={(e) => setBachelorGoesFree(e.target.checked)}
                className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
              />
            </div>

            {/* Package Choice */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                Select Base VIP Package Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GLOBAL_VIP_PACKAGES.map((pkg) => {
                  const isSelected = selectedPkgId === pkg.id;
                  const converted = convertCurrency(pkg.price, currency);
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-400 text-black font-bold border-amber-400'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs block font-bold">{pkg.name}</span>
                        <span className="text-[10px] opacity-80 font-mono">
                          {pkg.minGuests}-{pkg.maxGuests} Guests
                        </span>
                      </div>
                      <span className="font-serif font-black text-sm">{converted.formatted}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Dancer Cash Stash Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase text-zinc-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Dancer Stage Singles Cash Stash</span>
                </label>
                <span className="text-sm font-black text-emerald-400 font-mono">
                  ${dancerCashPerGuy} / guest (${dancerCashPerGuy * partySize} total stash)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="25"
                value={dancerCashPerGuy}
                onChange={(e) => setDancerCashPerGuy(Number(e.target.value))}
                className="w-full h-2 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>$0 (Just Drinks)</span>
                <span>$50 (Standard Tip)</span>
                <span>$100 (High Roller)</span>
                <span>$200 (Baller)</span>
              </div>
            </div>

            {/* Extras Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addHookah}
                  onChange={(e) => setAddHookah(e.target.checked)}
                  className="w-4 h-4 accent-amber-400 rounded"
                />
                <span className="text-xs font-mono text-zinc-300">
                  Exotic Hookah (+{convertCurrency(45, currency).formatted})
                </span>
              </label>

              <label className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addStageRoast}
                  onChange={(e) => setAddStageRoast(e.target.checked)}
                  className="w-4 h-4 accent-amber-400 rounded"
                />
                <span className="text-xs font-mono text-zinc-300">
                  Stage Roast (+{convertCurrency(50, currency).formatted})
                </span>
              </label>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-left">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-400 uppercase">
                    ESTIMATED SPLIT COST
                  </span>
                  <h3 className="text-2xl font-black text-white font-serif uppercase">
                    Total Party Breakdown
                  </h3>
                </div>
                <span className="text-2xl">💰</span>
              </div>

              {/* Big Per-Guy Highlight */}
              <div className="p-5 bg-zinc-950/90 border border-amber-500/40 rounded-2xl mb-6 text-center">
                <span className="text-xs font-mono text-zinc-400 uppercase block mb-1">
                  Cost Per Paying Guest ({payingGuestsCount} Guests)
                </span>
                <div className="text-5xl font-black text-amber-400 font-serif">
                  {convertedPerGuy.formatted}
                </div>
                <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                  {bachelorGoesFree ? '👑 Bachelor goes 100% Free!' : 'All guests split evenly'}
                </span>
              </div>

              {/* Cost Itemization */}
              <div className="space-y-2.5 font-mono text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Base Package ({selectedPackage.name}):</span>
                  <span className="text-white font-bold">{convertedBase.formatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Total Group Dancer Cash Stash:</span>
                  <span className="text-white font-bold">{convertedCash.formatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Add-ons (Hookah & Stage Roast):</span>
                  <span className="text-white font-bold">{convertedExtras.formatted}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Roundtrip Luxury Hotel Pickup:</span>
                  <span className="font-bold">FREE ($0)</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Cover Charge Waived:</span>
                  <span className="font-bold">FREE ($0)</span>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between text-sm">
                  <span className="font-bold text-white uppercase">Grand Total Party Cost:</span>
                  <span className="font-black text-amber-400 font-serif text-lg">
                    {convertedTotal.formatted}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-2 mt-6">
              <button
                onClick={() => onBookCalculated(selectedPkgId)}
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-black text-xs font-mono uppercase tracking-widest rounded-xl transition shadow-xl flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 text-black" />
                <span>Reserve For Squad in {city.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] font-mono text-zinc-500">
                Zero Upfront Risk • Pay at Club Door
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
