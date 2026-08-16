import React, { useState } from 'react';
import { DJPerformer } from '../types';
import { DJ_LINEUP } from '../data/partyData';
import { Volume2, Clock, Sparkles, Music, Star, Radio, MapPin } from 'lucide-react';

export const LineupSchedule: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [favoritedDJs, setFavoritedDJs] = useState<string[]>([]);
  const [activePreviewDJ, setActivePreviewDJ] = useState<string | null>(null);

  const stages = ['ALL', 'Main Neon Stage', 'The Boiler Room Arena', 'Courtyard Vibe Deck', 'Rooftop Chill & Silent Disco'];

  const filteredLineup = selectedStage === 'ALL'
    ? DJ_LINEUP
    : DJ_LINEUP.filter(dj => dj.stage === selectedStage);

  const toggleFavorite = (id: string) => {
    if (favoritedDJs.includes(id)) {
      setFavoritedDJs(favoritedDJs.filter(d => d !== id));
    } else {
      setFavoritedDJs([...favoritedDJs, id]);
    }
  };

  const togglePreview = (id: string) => {
    setActivePreviewDJ(activePreviewDJ === id ? null : id);
  };

  return (
    <section id="lineup-section" className="py-16 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase mb-1">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>02. SOUND SYSTEM TIMETABLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">DJ Lineup & Stage Schedule</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Electronic, melodic techno, tech house, and afrobeats selectors across 4 geometric stages.
            </p>
          </div>

          {/* Stage Filter Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-zinc-900 border border-zinc-800">
            {stages.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStage(st)}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  selectedStage === st
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {st === 'ALL' ? 'All Stages' : st.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* DJ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLineup.map((dj) => {
            const isFav = favoritedDJs.includes(dj.id);
            const isPlaying = activePreviewDJ === dj.id;

            return (
              <div
                key={dj.id}
                className="bg-zinc-900 border border-zinc-800 p-6 transition hover:border-zinc-700 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Stage badge & time */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-indigo-400 bg-zinc-950 px-3 py-1 border border-zinc-800 uppercase tracking-wider">
                      <MapPin className="w-3 h-3 text-indigo-400" />
                      {dj.stage}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-zinc-950 px-3 py-1 border border-zinc-800">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      {dj.timeSlot}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">{dj.name}</h3>
                      <span className="text-xs text-zinc-400 font-mono">{dj.handle}</span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(dj.id)}
                      className={`p-2.5 border transition ${
                        isFav
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                      title={isFav ? 'Remove reminder' : 'Add to personal timetable'}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-indigo-400 text-indigo-400' : ''}`} />
                    </button>
                  </div>

                  <div className="mt-3 inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-fuchsia-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1">
                    {dj.genre}
                  </div>

                  <p className="text-xs text-zinc-300 font-mono mt-3 leading-relaxed">
                    {dj.bio}
                  </p>
                </div>

                {/* Simulated Audio Preview & Energy Bar */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => togglePreview(dj.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                      isPlaying
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                    <span>{isPlaying ? 'Visualizer On' : 'Sound Check'}</span>
                  </button>

                  {/* Equalizer Visualizer Bars */}
                  <div className="flex items-end gap-1.5 h-6">
                    {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50].map((height, i) => (
                      <span
                        key={i}
                        className={`w-1 transition-all duration-300 ${
                          isPlaying
                            ? 'bg-gradient-to-t from-indigo-500 to-fuchsia-500 animate-pulse'
                            : 'bg-zinc-800'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(20, (height * (i % 2 === 0 ? 1.2 : 0.8)) % 100)}%` : '25%'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
