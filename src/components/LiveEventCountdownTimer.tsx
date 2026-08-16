import React, { useState, useEffect } from 'react';
import { Clock, Flame, Sparkles, Calendar, ArrowRight, ShieldCheck, Ticket, Bell } from 'lucide-react';
import { DestinationCity, VIPPackageId } from '../types';

interface LiveEventCountdownTimerProps {
  city: DestinationCity;
  onOpenBooking: (packageId?: VIPPackageId) => void;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  eventTitle: string;
  doorsOpenTime: string;
  spotsLeft: number;
}

export const LiveEventCountdownTimer: React.FC<LiveEventCountdownTimerProps> = ({
  city,
  onOpenBooking
}) => {
  const calculateTimeLeft = (): TimeRemaining => {
    const now = new Date();
    
    // Target event time: Tonight at 9:00 PM (21:00) or 11:30 PM (23:30) depending on current hour
    const target = new Date(now);
    target.setHours(21, 30, 0, 0); // 9:30 PM Tonight

    // If it's already past 9:30 PM, target midnight 12:00 AM (Afterhours showcase)
    if (now.getTime() > target.getTime()) {
      target.setHours(23, 59, 59, 999);
      if (now.getTime() > target.getTime()) {
        target.setDate(target.getDate() + 1);
        target.setHours(21, 30, 0, 0);
      }
    }

    const difference = target.getTime() - now.getTime();
    
    const hours = Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((difference / 1000 / 60) % 60));
    const seconds = Math.max(0, Math.floor((difference / 1000) % 60));

    // Dynamic event title based on city
    const eventTitles = [
      `Tonight's 18+ VIP Runway & Catwalk Showcase`,
      `${city.name} Midnight VIP Stage & Party Bus Dispatch`,
      `Headliner VIP Afterhours & Bottle Experience`,
      `Friday & Weekend Velvet Rope VIP Night`
    ];

    const titleIndex = (now.getDate() + city.name.length) % eventTitles.length;

    return {
      hours,
      minutes,
      seconds,
      isToday: true,
      eventTitle: eventTitles[titleIndex],
      doorsOpenTime: '9:30 PM LOCAL',
      spotsLeft: 7 + (city.name.length % 5)
    };
  };

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [city.id]);

  const padZero = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="w-full max-w-3xl mx-auto my-6 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-2 border-amber-500/50 hover:border-amber-400 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-amber-500/10 backdrop-blur-md relative overflow-hidden text-left transition duration-300">
      
      {/* Background neon laser glow line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 animate-pulse" />
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10 font-mono">
        
        {/* Left Side: Event Details & Live Pulsing Badge */}
        <div className="space-y-1.5 text-center md:text-left flex-1 min-w-0">
          <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>NEXT SCHEDULED VIP EVENT IN {city.name.toUpperCase()}</span>
            </span>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold">
              ⚡ Only {timeRemaining.spotsLeft} VIP Booths Left
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white font-serif uppercase tracking-tight truncate">
            {timeRemaining.eventTitle}
          </h3>

          <p className="text-xs text-zinc-400 flex items-center justify-center md:justify-start gap-2">
            <span>Doors & Free Pickup: <strong className="text-amber-300">{timeRemaining.doorsOpenTime}</strong></span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">100% Comped Cover</span>
          </p>
        </div>

        {/* Center/Right: Live Digital Countdown Digits */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Hours Card */}
          <div className="flex flex-col items-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-zinc-950 border border-amber-500/40 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tracking-wider">
                {padZero(timeRemaining.hours)}
              </span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800/80" />
            </div>
            <span className="text-[9px] uppercase font-bold text-zinc-400 mt-1 tracking-widest">Hours</span>
          </div>

          <span className="text-xl font-black text-amber-400 -mt-4 animate-pulse">:</span>

          {/* Minutes Card */}
          <div className="flex flex-col items-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-zinc-950 border border-amber-500/40 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group">
              <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-wider">
                {padZero(timeRemaining.minutes)}
              </span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800/80" />
            </div>
            <span className="text-[9px] uppercase font-bold text-zinc-400 mt-1 tracking-widest">Mins</span>
          </div>

          <span className="text-xl font-black text-amber-400 -mt-4 animate-pulse">:</span>

          {/* Seconds Card */}
          <div className="flex flex-col items-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-zinc-950 border border-rose-500/50 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group">
              <span className="text-2xl sm:text-3xl font-black font-mono text-rose-400 tracking-wider">
                {padZero(timeRemaining.seconds)}
              </span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800/80" />
            </div>
            <span className="text-[9px] uppercase font-bold text-rose-300 mt-1 tracking-widest">Secs</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onOpenBooking('gold_bachelor')}
          className="w-full md:w-auto px-4 py-3 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Lock In Spot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
