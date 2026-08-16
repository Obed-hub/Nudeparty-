import React, { useState } from 'react';
import { Sparkles, Star, Flame, Clock, Heart, Award, MapPin } from 'lucide-react';
import { GLOBAL_PERFORMERS } from '../data/globalDestinationsData';
import { DestinationCity } from '../types';

interface EntertainerShowcaseProps {
  city: DestinationCity;
  onSelectVIP: () => void;
}

export const EntertainerShowcase: React.FC<EntertainerShowcaseProps> = ({ city, onSelectVIP }) => {
  const [selectedFilter, setSelectedFilter] = useState<'CITY' | 'ALL'>('ALL');

  const filteredPerformers = selectedFilter === 'CITY'
    ? GLOBAL_PERFORMERS.filter(p => p.cityId === city.id)
    : GLOBAL_PERFORMERS;

  // Fallback to all if city has no specific performer
  const displayPerformers = filteredPerformers.length > 0 ? filteredPerformers : GLOBAL_PERFORMERS;

  return (
    <section id="entertainers-section" className="py-20 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GLOBAL HEADLINERS & ENTERTAINERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-serif">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-500">HEADLINERS</span> & ENTERTAINERS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 font-mono">
            Meet tonight’s featured aerial acrobats, runway headliners, and VIP champagne room hostesses performing across our global VIP venue network.
          </p>

          {/* Quick Filter Buttons */}
          <div className="flex justify-center gap-2 mt-6 text-xs font-mono">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-lg font-bold uppercase transition ${
                selectedFilter === 'ALL'
                  ? 'bg-amber-400 text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Global Stars ({GLOBAL_PERFORMERS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('CITY')}
              className={`px-3.5 py-1.5 rounded-lg font-bold uppercase transition ${
                selectedFilter === 'CITY'
                  ? 'bg-amber-400 text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {city.name} Featured
            </button>
          </div>
        </div>

        {/* Entertainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayPerformers.map((dancer) => (
            <div
              key={dancer.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition duration-300 group hover:-translate-y-1 shadow-xl text-left"
            >
              {/* Graphic Avatar & Model Photo Banner */}
              <div className={`h-52 bg-gradient-to-br ${dancer.avatarGradient} relative overflow-hidden`}>
                {dancer.imageUrl ? (
                  <img
                    src={dancer.imageUrl}
                    alt={dancer.stageName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/60 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono font-bold bg-black/70 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30 uppercase flex items-center gap-1 backdrop-blur-sm">
                      <MapPin className="w-2.5 h-2.5" />
                      <span>{dancer.cityName.split(',')[0]}</span>
                    </span>
                    <div className="flex items-center gap-1 bg-black/70 text-amber-300 text-xs font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{dancer.rating}</span>
                    </div>
                  </div>

                  <div className="z-10">
                    <div className="flex flex-wrap gap-1">
                      {dancer.badges.map((b, i) => (
                        <span key={i} className="text-[9px] font-mono font-black bg-black/80 text-white px-2 py-0.5 rounded uppercase border border-white/20 backdrop-blur-sm">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-white font-serif uppercase tracking-tight">
                    {dancer.stageName}
                  </h3>
                  <span className="text-[11px] text-amber-400 font-mono block mt-0.5 font-bold">
                    {dancer.specialty}
                  </span>

                  <p className="text-xs text-zinc-400 font-mono mt-3 leading-relaxed">
                    {dancer.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-800 space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Stage Sets:</span>
                    </span>
                    <span className="text-white font-bold">{dancer.stageTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-400">Music Vibe:</span>
                    <span className="text-zinc-200 truncate">{dancer.favoriteMusic}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800">
                <button
                  onClick={onSelectVIP}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-amber-400 hover:text-black text-amber-300 font-mono text-xs font-bold uppercase rounded-lg border border-amber-500/30 transition"
                >
                  Reserve Table & VIP Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
