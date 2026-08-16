import React from 'react';
import { Star, MapPin, Clock, ShieldCheck, Sparkles, Wine, ChevronRight, Car, CheckCircle2 } from 'lucide-react';
import { DestinationCity, DestinationVenue, SupportedCurrency } from '../types';

interface GlobalVenueExplorerProps {
  city: DestinationCity;
  currency: SupportedCurrency;
  onBookVenue: (venue: DestinationVenue) => void;
  onOpenCitySelector: () => void;
}

export const GlobalVenueExplorer: React.FC<GlobalVenueExplorerProps> = ({
  city,
  currency,
  onBookVenue,
  onOpenCitySelector
}) => {
  return (
    <section id="venues-section" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL VIP VENUE PARTNERS • {city.name.toUpperCase()}, {city.countryCode}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-serif tracking-tight">
              FEATURED CABARETS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-500">VIP LOUNGES</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 font-mono max-w-2xl">
              Handpicked, verified premier adult entertainment clubs, 18+ cabarets, and ultra lounges in {city.name} with free hotel pickup transit and waived admission.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCitySelector}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase rounded-xl transition flex items-center gap-2"
            >
              <span>{city.flagEmoji} Change City ({city.name})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {city.featuredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-amber-400/60 rounded-3xl overflow-hidden transition duration-300 shadow-2xl flex flex-col justify-between text-left group"
            >
              {/* Venue Banner */}
              <div className={`p-6 bg-gradient-to-r ${venue.imageGradient} text-white relative flex flex-col justify-between min-h-[160px]`}>
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                    {venue.venueType}
                  </span>
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-mono font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{venue.rating}</span>
                    <span className="text-zinc-400 text-[10px]">({venue.reviewsCount.toLocaleString()})</span>
                  </div>
                </div>

                <div className="z-10 mt-4">
                  <h3 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-white drop-shadow-md">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-200 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>{venue.neighborhood} • {city.name}</span>
                  </div>
                </div>

                {/* Ambient glow */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
              </div>

              {/* Venue Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
                  {venue.description}
                </p>

                {/* Highlights & Details */}
                <div className="space-y-3 font-mono text-xs text-zinc-300">
                  {/* Exclusive Perk Banner */}
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-2.5 text-amber-300 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{venue.highlightPerk}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Hours:</span>
                        <strong className="text-white">{venue.hours}</strong>
                      </div>
                    </div>

                    <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Age Requirement:</span>
                        <strong className="text-white">{venue.minAge}+ Physical ID Required</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                    <span>Dress Code: <strong className="text-zinc-200">{venue.dressCode}</strong></span>
                    <span>Policy: <strong className="text-amber-300">{venue.byobFriendly ? 'BYOB Friendly' : 'VIP Bottle Service'}</strong></span>
                  </div>
                </div>

                {/* Venue Actions */}
                <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="text-[11px] font-mono text-zinc-400">
                    <span className="text-emerald-400 font-bold">✓ Free Hotel Pickup Included</span>
                  </div>

                  <button
                    onClick={() => onBookVenue(venue)}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-black font-mono text-xs uppercase tracking-wider rounded-xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Book VIP Table at {venue.name.split(' ')[0]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
