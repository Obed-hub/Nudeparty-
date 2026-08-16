import React, { useState } from 'react';
import { Car, Clock, ShieldCheck, MapPin, CheckCircle2, Phone, Sparkles, Navigation, ArrowRight, Globe } from 'lucide-react';
import { DestinationCity } from '../types';

interface LimoBannerProps {
  city: DestinationCity;
  onReservePickup: (hotelName: string) => void;
  onOpenCitySelector: () => void;
}

export const LimoBanner: React.FC<LimoBannerProps> = ({ city, onReservePickup, onOpenCitySelector }) => {
  const [selectedHotelId, setSelectedHotelId] = useState(city.topHotels[0]?.id || '');
  const [partySize, setPartySize] = useState(6);
  const [liquorStop, setLiquorStop] = useState(true);

  // Update hotel selection if city changes
  React.useEffect(() => {
    if (city.topHotels[0]?.id) {
      setSelectedHotelId(city.topHotels[0].id);
    }
  }, [city]);

  const currentHotel = city.topHotels.find(h => h.id === selectedHotelId) || city.topHotels[0] || {
    name: `${city.name} Downtown Valet`,
    area: 'City Center',
    pickupSpot: 'Main Porte-Cochère',
    estDriveMinutes: 10
  };

  const getVehicleRecommendation = (size: number) => {
    if (size <= 4) return { name: 'Luxury Executive Black Car / Sedan', icon: '🚘', seats: 'Up to 4-6 passengers' };
    if (size <= 10) return { name: 'VIP Executive Escalade / SUV', icon: '🚙', seats: 'Up to 10-12 passengers' };
    return { name: 'Executive Mercedes Sprinter / Party Bus', icon: '🚐', seats: 'Up to 18-20 passengers' };
  };

  const vehicle = getVehicleRecommendation(partySize);

  return (
    <section id="pickup-service-section" className="py-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-y border-amber-500/20 relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Car className="w-3.5 h-3.5" />
            <span>18+ TOTALLY NUDE CABARET • 100% FREE PICKUP & TRANSIT • {city.name.toUpperCase()}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-serif">
            18+ TOTALLY NUDE PARTY <span className="text-amber-400">• FREE VIP PICKUP</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base mt-3 leading-relaxed font-mono">
            Looking for the premier 18+ Totally Nude Cabaret & Party near you? In {city.name}, Little Darlings Nude Party dispatches complimentary luxury transit, Escalades, or executive Sprinters directly to your hotel valet with retail beverage stops authorized. Over 100+ models totally nude at your service upon arrival.
          </p>
        </div>

        {/* Interactive Pickup Dispatch Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Estimator Form */}
          <div className="lg:col-span-7 bg-zinc-950/90 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 border border-amber-400/40 rounded-lg flex items-center justify-center text-amber-400">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase">{city.name} Route & ETA Estimator</h3>
                    <p className="text-xs text-zinc-400 font-mono">Live hotel concierge dispatch calculator</p>
                  </div>
                </div>
                <button
                  onClick={onOpenCitySelector}
                  className="text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-700 px-2.5 py-1 rounded font-bold uppercase flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  <span>{city.name}</span>
                </button>
              </div>

              {/* Form Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                    Select Your Hotel or Resort in {city.name}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedHotelId}
                      onChange={(e) => setSelectedHotelId(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 pl-9 pr-4 py-2.5 text-white text-xs font-mono rounded-lg focus:outline-none focus:border-amber-400"
                    >
                      {city.topHotels.map(h => (
                        <option key={h.id} value={h.id}>
                          {h.name} ({h.area})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                      Party Size (Seats Needed)
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2.5 text-white text-xs font-mono rounded-lg focus:outline-none focus:border-amber-400"
                    >
                      <option value={2}>2 Guests (Sedan / Coupe)</option>
                      <option value={4}>4 Guests (Executive Sedan)</option>
                      <option value={6}>6 Guests (Luxury SUV)</option>
                      <option value={8}>8 Guests (Escalade ESV)</option>
                      <option value={12}>12 Guests (Sprinter Lounge)</option>
                      <option value={16}>16+ Guests (Party Bus)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-1">
                      Retail Beverage / Liquor Stop
                    </label>
                    <div className="flex items-center gap-2 p-2.5 bg-zinc-900 border border-zinc-700 rounded-lg">
                      <input
                        type="checkbox"
                        checked={liquorStop}
                        onChange={(e) => setLiquorStop(e.target.checked)}
                        className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                      />
                      <span className="text-xs font-mono text-zinc-300">
                        Include Free 10-Min Stop
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Route Output */}
            <div className="mt-6 pt-4 border-t border-zinc-800 space-y-3">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Recommended Fleet:</span>
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span>{vehicle.icon}</span>
                  <span>{vehicle.name}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs font-mono text-zinc-400">
                  <span>Transit Time: </span>
                  <strong className="text-emerald-400">~{currentHotel.estDriveMinutes} Minutes to Venue</strong>
                </div>

                <button
                  onClick={() => onReservePickup(currentHotel.name)}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-mono text-xs font-black uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-2"
                >
                  <span>Reserve Free Pickup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Key Perks */}
          <div className="lg:col-span-5 bg-zinc-950/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-400 uppercase block mb-1">
                VIP TRANSPORTATION PERKS
              </span>
              <h3 className="text-2xl font-black text-white font-serif uppercase">
                Why Book Our Free Pickup Service?
              </h3>
            </div>

            <div className="space-y-3 text-xs font-mono text-zinc-300">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block uppercase">Zero Fare & Zero Surge Pricing</strong>
                  <span className="text-zinc-400 text-[11px]">Free pickup & drop-off for your whole party</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block uppercase">Valet Meet & Greet</strong>
                  <span className="text-zinc-400 text-[11px]">Professional driver texts you 15 minutes before arrival</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block uppercase">Skip All General Lines</strong>
                  <span className="text-zinc-400 text-[11px]">Vehicle pulls directly to private VIP side entrance</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs font-mono text-amber-300">
              <span>Direct Chauffeur Dispatch:</span>
              <strong className="text-white">{city.emergencyHostPhone}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
