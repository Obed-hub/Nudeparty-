import React, { useState, useEffect } from 'react';
import { PartyEvent } from '../types';
import { ShieldCheck, Calendar, Clock, MapPin, Sparkles, Users, Flame, Volume2, ArrowRight } from 'lucide-react';

interface PartyHeroProps {
  event: PartyEvent;
  onOpenRSVP: () => void;
  hasPass: boolean;
  onViewPass: () => void;
}

export const PartyHero: React.FC<PartyHeroProps> = ({ event, onOpenRSVP, hasPass, onViewPass }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 8,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const targetDate = new Date(event.isoDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [event.isoDate]);

  const capacityPercentage = Math.round((event.currentRsvpCount / event.capacityLimit) * 100);

  return (
    <section id="hero-section" className="relative pt-12 pb-16 overflow-hidden">
      {/* Geometric background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 -mr-32 -mt-32 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-600/5 -ml-32 -mb-32 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
        {/* Top Badges */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-zinc-900 border border-zinc-800 mb-8 shadow-md">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            18+ NATURIST SPACE
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 text-fuchsia-300 text-xs font-medium uppercase tracking-wider font-mono">
            <div className="w-1.5 h-1.5 bg-fuchsia-400 rotate-45"></div>
            Clothing-Optional & Body-Positive
          </span>
          <span className="text-zinc-400 text-xs font-mono px-2 hidden sm:inline tracking-wider">
            STRICT CONSENT • NO CAMERAS
          </span>
        </div>

        {/* Hero Title */}
        <div className="relative mb-6">
          <span className="block text-xs font-mono font-bold uppercase tracking-[0.3em] text-indigo-500 mb-3">
            00. THE NATURIST AFTERHOURS EXPERIENCE
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase leading-[0.9]">
            FREEDOM <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">UNLEASHED</span>
          </h1>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-300 uppercase tracking-tighter mt-2">
            18+ CLOTHING-OPTIONAL SOUND MATRIX
          </h2>
        </div>
        
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-normal mb-10 leading-relaxed font-mono">
          An inclusive, body-positive sanctuary for adults. Enjoy dance music freedom in an open-air courtyard with monitored electronic lockers, strict zero-camera privacy, towel hygiene protocols, and an empowering atmosphere.
        </p>

        {/* Key Event Quick Info Strip - Geometric Balance grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10 text-left">
          <div className="bg-zinc-900 border border-zinc-800 p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-indigo-400 font-bold">01. SCHEDULE</span>
              <Calendar className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-wider">{event.date}</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Doors Open 9:00 PM</div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-indigo-400 font-bold">02. SET DURATION</span>
              <Clock className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-wider">9:00 PM – 4:30 AM</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Non-stop 7.5hr Sequence</div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-indigo-400 font-bold">03. VENUE SANCTUARY</span>
              <MapPin className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-wider truncate">{event.venueName}</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Arts District Warehouse</div>
          </div>
        </div>

        {/* Live Countdown & Capacity Section */}
        <div className="bg-zinc-900 border border-zinc-800 max-w-2xl mx-auto p-6 sm:p-8 mb-10 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400 font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rotate-45"></div>
              <span>Countdown to Event Launch</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Synchronized UTC</span>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-zinc-950 border border-zinc-800 p-4 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-white font-mono">{timeLeft.days}</span>
              <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mt-1 block">DAYS</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-4 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-indigo-400 font-mono">{timeLeft.hours}</span>
              <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mt-1 block">HOURS</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-4 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-purple-400 font-mono">{timeLeft.minutes}</span>
              <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mt-1 block">MINS</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-4 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-fuchsia-400 font-mono">{timeLeft.seconds}</span>
              <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest mt-1 block">SECS</span>
            </div>
          </div>

          {/* Capacity Progress Bar */}
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-zinc-300">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                Pass Allocation
              </span>
              <span className="text-white font-bold">
                {event.currentRsvpCount} / {event.capacityLimit} claimed ({capacityPercentage}%)
              </span>
            </div>
            <div className="w-full bg-zinc-950 h-2.5 overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 transition-all duration-1000"
                style={{ width: `${capacityPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {!hasPass ? (
            <button
              id="hero-rsvp-btn"
              onClick={onOpenRSVP}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs transition-colors shadow-xl shadow-indigo-600/30 flex items-center gap-3"
            >
              <span>SECURE 18+ PARTY PASS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onViewPass}
              className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-indigo-500 font-bold uppercase tracking-widest text-xs transition-colors shadow-lg shadow-indigo-600/10 flex items-center gap-3"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>VIEW VERIFIED PASS</span>
            </button>
          )}

          <a
            href="#lineup-section"
            className="px-6 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold uppercase tracking-widest text-xs border border-zinc-800 transition-colors flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-indigo-400" />
            <span>Sound System & DJs</span>
          </a>
        </div>
      </div>
    </section>
  );
};
