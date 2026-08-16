import React, { useState } from 'react';
import { Crown, Car, Flame, Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Layers, Users } from 'lucide-react';
import { GLOBAL_VIP_PACKAGES, convertCurrency } from '../data/globalDestinationsData';
import { VIPPackage, VIPPackageId, DestinationCity, SupportedCurrency } from '../types';

interface VIPPackagesGridProps {
  city: DestinationCity;
  currency: SupportedCurrency;
  onSelectPackage: (packageId: VIPPackageId) => void;
  onOpenHostChat: () => void;
}

export const VIPPackagesGrid: React.FC<VIPPackagesGridProps> = ({
  city,
  currency,
  onSelectPackage,
  onOpenHostChat
}) => {
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | 'WEEKEND' | 'BACHELOR' | 'SMALL_GROUPS' | 'HIGH_ROLLER'>('ALL');

  const filteredPackages = GLOBAL_VIP_PACKAGES.filter(pkg => {
    if (filterType === 'WEEKEND') return pkg.id === 'weekend_all_access';
    if (filterType === 'BACHELOR') return pkg.id === 'gold_bachelor' || pkg.id === 'baller_penthouse' || pkg.id === 'platinum_highroller';
    if (filterType === 'SMALL_GROUPS') return pkg.id === 'silver_starter' || pkg.id === 'weekend_all_access' || pkg.id === 'couples_fantasy';
    if (filterType === 'HIGH_ROLLER') return pkg.id === 'platinum_highroller' || pkg.id === 'baller_penthouse';
    return true;
  });

  return (
    <section id="vip-packages-section" className="py-20 bg-zinc-950 text-white relative">
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>18+ TOTALLY NUDE VIP EXPERIENCES • {city.name.toUpperCase()}, {city.countryCode}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-serif">
            18+ TOTALLY NUDE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-500">VIP SERVICE PACKAGES</span>
          </h2>
          
          {/* Over 100+ Models Guarantee Strip */}
          <div className="my-4 p-3 bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-purple-500/20 border border-rose-500/40 rounded-2xl flex flex-wrap items-center justify-center gap-2 text-rose-300 font-mono text-xs font-bold uppercase tracking-wide text-center">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>ALL PACKAGES INCLUDE OVER 100+ MODELS TOTALLY NUDE AT YOUR SERVICE</span>
            <Sparkles className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
          </div>

          <p className="text-zinc-400 text-xs sm:text-base mt-2 leading-relaxed font-mono">
            All 18+ Totally Nude VIP packages in {city.name} include complimentary luxury vehicle/party bus pickup from any hotel, front-of-line VIP admission with waived cover charge, totally nude main stage viewing, and reserved booth table service.
          </p>

          {/* Filter & Comparison Switchers */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition ${
                filterType === 'ALL'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Packages ({GLOBAL_VIP_PACKAGES.length})
            </button>
            <button
              onClick={() => setFilterType('WEEKEND')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition ${
                filterType === 'WEEKEND'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              🔥 $100 Weekend Pass
            </button>
            <button
              onClick={() => setFilterType('BACHELOR')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition ${
                filterType === 'BACHELOR'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              👑 Bachelor & Birthday
            </button>
            <button
              onClick={() => setFilterType('SMALL_GROUPS')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition ${
                filterType === 'SMALL_GROUPS'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              👥 Friday & Small Groups
            </button>
            <button
              onClick={() => setFilterType('HIGH_ROLLER')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition ${
                filterType === 'HIGH_ROLLER'
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              💎 High Roller & Penthouse
            </button>
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-4 py-2 text-xs font-mono text-amber-300 hover:text-amber-200 bg-zinc-900 border border-amber-500/30 rounded-lg flex items-center gap-1.5 transition ml-auto"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Side-by-Side Matrix</span>
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredPackages.map((pkg) => {
            const isHighlight = pkg.isPopular || pkg.isBestValue;
            const convertedPrice = convertCurrency(pkg.price, currency);
            const convertedDeposit = convertCurrency(pkg.depositAmount, currency);
            const convertedPerPerson = convertCurrency(pkg.pricePerPersonEst, currency);

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl transition duration-300 flex flex-col justify-between text-left overflow-hidden group ${
                  isHighlight
                    ? 'bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-950 border-2 border-amber-400 shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 transform hover:-translate-y-1'
                    : 'bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Header Tag / Ribbon */}
                {pkg.tag && (
                  <div
                    className={`w-full py-1.5 px-4 text-center font-mono text-[10px] uppercase font-black tracking-widest ${
                      isHighlight
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-rose-400 text-black'
                        : 'bg-zinc-800 text-zinc-300 border-b border-zinc-700'
                    }`}
                  >
                    {pkg.tag}
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  {/* Title & Pricing */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-white group-hover:text-amber-300 transition">
                        {pkg.name}
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 mb-4">{pkg.subtitle}</p>

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-2 pb-4 border-b border-zinc-800">
                      <span className="text-4xl sm:text-5xl font-black text-amber-400 font-serif">
                        {convertedPrice.formatted}
                      </span>
                      <div className="text-xs font-mono text-zinc-400 leading-tight">
                        <span className="block text-zinc-300 font-bold">Total Group Price</span>
                        <span className="text-emerald-400 font-semibold">~{convertedPerPerson.formatted} / guest ({pkg.minGuests}-{pkg.maxGuests} guests)</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Features List */}
                  <div className="space-y-3 font-mono text-xs text-zinc-300 flex-1">
                    <div className="p-2.5 bg-zinc-950/80 border border-zinc-800/80 rounded-xl flex items-center gap-2.5 text-zinc-200">
                      <Car className="w-4 h-4 text-rose-400 shrink-0" />
                      <div>
                        <strong className="text-white text-[11px] block">{pkg.limoType}</strong>
                        <span className="text-[10px] text-zinc-400">Complimentary {city.name} Hotel Valet Pickup</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-zinc-950/80 border border-zinc-800/80 rounded-xl flex items-center gap-2.5 text-zinc-200">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <strong className="text-white text-[11px] block">Table Service & Mixers</strong>
                        <span className="text-[10px] text-zinc-400">{pkg.bottlesIncluded}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      {pkg.inclusions.slice(0, 5).map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs leading-snug">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{inc}</span>
                        </div>
                      ))}
                      {pkg.inclusions.length > 5 && (
                        <div className="text-[11px] text-zinc-500 italic pl-5">
                          + {pkg.inclusions.length - 5} more premium perks included
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4 border-t border-zinc-800">
                    <button
                      onClick={() => onSelectPackage(pkg.id)}
                      className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition transform active:scale-95 shadow-lg ${
                        isHighlight
                          ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black shadow-amber-500/20'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-amber-400/50'
                      }`}
                    >
                      <span>Book {pkg.name.split(' ')[1] || 'Package'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 px-1">
                      <span className="text-amber-400 font-bold">₿ Bitcoin Anonymous Escrow</span>
                      <span className="text-rose-400 font-bold">100+ Models Included</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Squad / VIP Concierge CTA */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-black text-white font-serif uppercase">
              Need a Custom VIP Itinerary in {city.name}?
            </h4>
            <p className="text-xs sm:text-sm font-mono text-zinc-400">
              Have a group larger than 15, need private jet coordination, superyacht bookings, or special stag requests?
            </p>
          </div>

          <button
            onClick={onOpenHostChat}
            className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-400 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition whitespace-nowrap flex items-center gap-2"
          >
            <Crown className="w-4 h-4" />
            <span>Chat With {city.hostName.split(' ')[0]} (VIP Host)</span>
          </button>
        </div>
      </div>

      {/* Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto text-left space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-white font-serif uppercase">
                  VIP Packages Comparison Matrix ({city.name})
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Compare inclusions, group capacities, and perks across all tiers in {currency}.
                </p>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-zinc-400 hover:text-white text-sm font-mono p-2"
              >
                ✕ Close
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-amber-400">
                    <th className="p-3">Package</th>
                    <th className="p-3">Price ({currency})</th>
                    <th className="p-3">Capacity</th>
                    <th className="p-3">VIP Pickup Fleet</th>
                    <th className="p-3">Table & Mixers</th>
                    <th className="p-3">Stage Singles</th>
                    <th className="p-3">VIP Suite</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {GLOBAL_VIP_PACKAGES.map((pkg) => {
                    const convertedPrice = convertCurrency(pkg.price, currency);
                    return (
                      <tr key={pkg.id} className="hover:bg-zinc-900/50">
                        <td className="p-3 font-bold text-white uppercase">{pkg.name}</td>
                        <td className="p-3 font-black text-amber-400 font-serif text-sm">{convertedPrice.formatted}</td>
                        <td className="p-3">{pkg.minGuests}-{pkg.maxGuests} Guests</td>
                        <td className="p-3 text-[11px] text-zinc-400">{pkg.limoType}</td>
                        <td className="p-3 text-[11px]">{pkg.bottlesIncluded}</td>
                        <td className="p-3">${pkg.stageCashIncluded} Cash</td>
                        <td className="p-3">{pkg.vipRoomMinutes > 0 ? `${pkg.vipRoomMinutes} Mins` : '—'}</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              setShowComparisonModal(false);
                              onSelectPackage(pkg.id);
                            }}
                            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-black uppercase rounded-lg"
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
