import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  X, 
  Clock, 
  Flame, 
  Users, 
  ChevronRight, 
  Heart, 
  Car, 
  ShieldCheck,
  Bell,
  Maximize2
} from 'lucide-react';
import { DestinationCity, VIPPackageId } from '../types';

interface LiveLadiesBookingToastProps {
  city: DestinationCity;
  onOpenBooking: (packageId?: VIPPackageId) => void;
}

interface LadyBookingNotification {
  id: string;
  ladyName: string;
  partyType: string;
  avatarColor: string;
  avatarInitials: string;
  packageTitle: string;
  packageId: VIPPackageId;
  pickupSpotTemplate: string;
  timeAgo: string;
  verified: boolean;
  distanceKm: string;
  groupCount: string;
}

const LADY_BOOKINGS_POOL: Omit<LadyBookingNotification, 'id' | 'pickupSpotTemplate' | 'distanceKm'>[] = [
  {
    ladyName: 'Sophia Laurent & 3 Friends',
    partyType: 'VIP Runway Experience',
    avatarColor: 'from-rose-500 to-amber-500',
    avatarInitials: 'SL',
    packageTitle: 'Friday VIP Pass & Table Service',
    packageId: 'silver_starter',
    timeAgo: 'Just now',
    verified: true,
    groupCount: '4 Ladies'
  },
  {
    ladyName: 'Isabella & Camila',
    partyType: 'Champagne Suite Duo',
    avatarColor: 'from-fuchsia-500 to-pink-500',
    avatarInitials: 'IC',
    packageTitle: 'Champagne Suite + Free Pickup',
    packageId: 'champagne_suite',
    timeAgo: '1 min ago',
    verified: true,
    groupCount: '2 Guests'
  },
  {
    ladyName: 'Mia Jenkins & Bachelorette Squad',
    partyType: 'Bachelorette Blowout',
    avatarColor: 'from-amber-400 to-rose-600',
    avatarInitials: 'MJ',
    packageTitle: 'Gold Bachelor / Bachelorette Special',
    packageId: 'gold_bachelor',
    timeAgo: '2 mins ago',
    verified: true,
    groupCount: '8 Ladies'
  },
  {
    ladyName: 'Ava & Harper',
    partyType: 'All-Access VIP Party',
    avatarColor: 'from-pink-500 to-rose-400',
    avatarInitials: 'AH',
    packageTitle: 'Weekend All-Access VIP Pass',
    packageId: 'weekend_all_access',
    timeAgo: '4 mins ago',
    verified: true,
    groupCount: '2 Ladies'
  },
  {
    ladyName: 'Olivia Vance & 5 Guests',
    partyType: 'Highroller VIP Booth',
    avatarColor: 'from-purple-500 to-pink-500',
    avatarInitials: 'OV',
    packageTitle: 'Platinum Highroller Stage-Front',
    packageId: 'platinum_highroller',
    timeAgo: '5 mins ago',
    verified: true,
    groupCount: '6 Guests'
  },
  {
    ladyName: 'Emily & Scarlett',
    partyType: 'Girls Night Out Cabana',
    avatarColor: 'from-rose-600 to-orange-500',
    avatarInitials: 'ES',
    packageTitle: 'Couples Fantasy VIP Booth',
    packageId: 'couples_fantasy',
    timeAgo: '7 mins ago',
    verified: true,
    groupCount: '4 Guests'
  },
  {
    ladyName: 'Victoria Sterling & 4 VIP Girls',
    partyType: 'Birthday VIP Celebration',
    avatarColor: 'from-amber-500 to-rose-500',
    avatarInitials: 'VS',
    packageTitle: 'Silver Starter + Party Bus Pickup',
    packageId: 'silver_starter',
    timeAgo: '9 mins ago',
    verified: true,
    groupCount: '5 Ladies'
  },
  {
    ladyName: 'Natalia Rossi',
    partyType: 'VIP Friday Table Service',
    avatarColor: 'from-pink-600 to-purple-600',
    avatarInitials: 'NR',
    packageTitle: 'Friday VIP Pass & Table Service',
    packageId: 'silver_starter',
    timeAgo: '12 mins ago',
    verified: true,
    groupCount: '2 Guests'
  },
  {
    ladyName: 'Gabriella & Lauren',
    partyType: 'Penthouse Cabaret Lounge',
    avatarColor: 'from-cyan-500 to-blue-600',
    avatarInitials: 'GL',
    packageTitle: 'Baller Penthouse + Escalade Transit',
    packageId: 'baller_penthouse',
    timeAgo: '15 mins ago',
    verified: true,
    groupCount: '3 Guests'
  },
  {
    ladyName: 'Zoe Martinez (Birthday VIP)',
    partyType: 'Stage-Front Birthday VIP',
    avatarColor: 'from-emerald-400 to-teal-600',
    avatarInitials: 'ZM',
    packageTitle: 'Weekend All-Access VIP Pass',
    packageId: 'weekend_all_access',
    timeAgo: '18 mins ago',
    verified: true,
    groupCount: '4 Ladies'
  }
];

export const LiveLadiesBookingToast: React.FC<LiveLadiesBookingToastProps> = ({
  city,
  onOpenBooking
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [liveCount, setLiveCount] = useState(48);

  // Generate dynamic location details
  const generateNotification = (index: number): LadyBookingNotification => {
    const base = LADY_BOOKINGS_POOL[index % LADY_BOOKINGS_POOL.length];
    const hotel = city.topHotels && city.topHotels.length > 0
      ? city.topHotels[index % city.topHotels.length].name
      : `${city.name} Downtown`;

    const distances = ['0.4 miles away', '0.7 miles away', '1.1 miles away', '1.5 miles away', 'Near your location'];
    const distanceKm = distances[index % distances.length];

    return {
      ...base,
      id: `booking-${index}-${city.id}`,
      pickupSpotTemplate: hotel,
      distanceKm
    };
  };

  const [notification, setNotification] = useState<LadyBookingNotification>(() => generateNotification(0));

  // When city changes, reset notification
  useEffect(() => {
    setNotification(generateNotification(currentIndex));
    setIsVisible(true);
    setIsMinimized(false);
  }, [city.id]);

  // Periodic cycle:
  // 1. Toast stays visible for 6 seconds
  // 2. Toast hides smoothly
  // 3. WAITS for 7 seconds before the next notification pops out
  useEffect(() => {
    if (isMinimized || isPaused) return;

    // Timer to hide current notification after 6.5s
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);

      // Wait 7.5 seconds while hidden before displaying the next one
      const nextShowTimeout = setTimeout(() => {
        setCurrentIndex(prev => {
          const nextIndex = prev + 1;
          setNotification(generateNotification(nextIndex));
          return nextIndex;
        });
        setLiveCount(prev => prev + (Math.random() > 0.6 ? 1 : 0));
        setIsVisible(true);
      }, 7500);

      return () => clearTimeout(nextShowTimeout);
    }, 6500);

    return () => clearTimeout(hideTimeout);
  }, [currentIndex, isVisible, city.id, isMinimized, isPaused]);

  // If user minimized the toast, display a sleek compact floating badge
  if (isMinimized) {
    return (
      <button
        onClick={() => {
          setIsMinimized(false);
          setIsVisible(true);
        }}
        className="fixed bottom-4 left-4 sm:left-6 z-50 px-3.5 py-2 bg-zinc-950/95 hover:bg-zinc-900 border-2 border-rose-500/80 rounded-full shadow-2xl backdrop-blur-md text-white font-mono text-xs font-bold flex items-center gap-2 transition duration-300 transform hover:scale-105"
        title="Show Live Booking Notifications"
      >
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
        </span>
        <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
        <span className="text-[11px] text-amber-300">{liveCount} Live Bookings in {city.name}</span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-3 left-3 sm:left-4 z-50 max-w-[280px] sm:max-w-[310px] w-[calc(100vw-24px)] transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative bg-zinc-950/95 backdrop-blur-xl border border-rose-500/60 rounded-xl p-2.5 shadow-xl shadow-rose-950/40 text-left overflow-hidden group">
        
        {/* Neon Ambient Header Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 via-amber-400 to-pink-500" />

        {/* Close / Minimize Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="absolute top-1.5 right-1.5 p-0.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          aria-label="Minimize Notification"
          title="Minimize notification"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Top Status Header */}
        <div className="flex items-center gap-1.5 mb-1.5 pr-5">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-mono font-black uppercase tracking-wider text-rose-400 flex items-center gap-1">
            <Flame className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
            <span>LIVE BOOKING</span>
          </span>
          <span className="text-[9px] font-mono text-zinc-400 ml-auto">
            {notification.timeAgo}
          </span>
        </div>

        {/* Main Content Layout */}
        <div className="flex items-start gap-2">
          {/* Avatar with dynamic initials */}
          <div className="relative shrink-0">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${notification.avatarColor} p-0.5 shadow flex items-center justify-center`}>
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center font-serif font-black text-rose-300 text-xs">
                {notification.avatarInitials}
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 text-black">
              <CheckCircle2 className="w-2 h-2 text-black fill-emerald-300" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 font-mono">
            <div className="flex items-center gap-1">
              <h4 className="text-[11px] font-black text-white truncate max-w-[130px]">
                {notification.ladyName}
              </h4>
              <span className="text-[8px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1 rounded font-bold shrink-0">
                {notification.groupCount}
              </span>
            </div>

            <p className="text-[10px] text-amber-300 font-bold leading-tight mt-0.5 truncate">
              {notification.packageTitle}
            </p>

            <div className="flex items-center gap-1 mt-0.5 text-[9px] text-zinc-400">
              <MapPin className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="text-emerald-400 truncate">{city.name} • {notification.distanceKm}</span>
            </div>
          </div>
        </div>

        {/* Action Button & Live City Ticker */}
        <div className="mt-2 pt-1.5 border-t border-zinc-800/80 flex items-center justify-between gap-1.5">
          <div className="text-[9px] font-mono text-zinc-400 flex items-center gap-1 truncate">
            <Users className="w-2.5 h-2.5 text-amber-400 shrink-0" />
            <span className="truncate"><strong>{liveCount} booked</strong> in {city.name}</span>
          </div>

          <button
            onClick={() => onOpenBooking(notification.packageId)}
            className="px-2 py-0.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-black font-mono text-[9px] font-black uppercase rounded transition flex items-center gap-0.5 shrink-0"
          >
            <span>Book</span>
            <ChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
