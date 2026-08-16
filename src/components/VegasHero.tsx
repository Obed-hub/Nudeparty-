import React, { useState } from 'react';
import { Crown, Sparkles, Car, Flame, ShieldCheck, MapPin, ChevronRight, Phone, Clock, ArrowUpRight, Compass, Users } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { RunwayStageBackdrop } from './RunwayStageBackdrop';
import { LiveEventCountdownTimer } from './LiveEventCountdownTimer';
import { DestinationCity, SupportedCurrency } from '../types';
import { convertCurrency } from '../data/globalDestinationsData';
import { ALL_50_US_STATES, buildDestinationCityFromUSStateAndCity } from '../data/usStatesData';
import { parseAnyVideoUrl } from '../utils/universalVideo';

// You can change this to ANY video link (YouTube, Vimeo, MP4 file, Streamable, etc.) and it will automatically work!
export const DEFAULT_HERO_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

interface VegasHeroProps {
  city: DestinationCity;
  currency: SupportedCurrency;
  onOpenBooking: () => void;
  onQuickPickupRequest: (hotelName: string) => void;
  onOpenCalculator: () => void;
  onOpenCitySelector: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemFadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemScaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const badgeItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const VegasHero: React.FC<VegasHeroProps> = ({
  city,
  currency,
  onOpenBooking,
  onQuickPickupRequest,
  onOpenCalculator,
  onOpenCitySelector
}) => {
  const [selectedHotel, setSelectedHotel] = useState(city.topHotels[0]?.name || 'Front Valet Lobby');
  const [customHotelText, setCustomHotelText] = useState('');
  const [activeStateCode, setActiveStateCode] = useState(() => {
    const match = ALL_50_US_STATES.find(s => s.name.toLowerCase() === city.stateOrRegion.toLowerCase());
    return match ? match.code : 'NV';
  });

  const selectedStateObj = ALL_50_US_STATES.find(s => s.code === activeStateCode) || ALL_50_US_STATES[0];

  const handleQuickPickup = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPickup = selectedHotel === 'Custom Airbnb / Boutique Hotel' && customHotelText
      ? customHotelText
      : selectedHotel;
    onQuickPickupRequest(finalPickup);
  };

  const [videoBgActive, setVideoBgActive] = useState(true);
  const starterPrice = convertCurrency(50, currency).formatted;

  // Resolves ANY video URL placed in code (YouTube, Vimeo, MP4 file, etc.)
  const activeHeroVideoUrl = city.heroVideoUrl || DEFAULT_HERO_VIDEO_URL;
  const parsedHeroVideo = parseAnyVideoUrl(activeHeroVideoUrl);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 overflow-hidden bg-zinc-950 text-white">
      {/* VIP Runway Stage & Numbered Cards Hero Background Backdrop (User Image) */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <RunwayStageBackdrop className="w-full h-full object-cover" overlayOpacity="opacity-50" />
      </motion.div>

      {/* Looping nightlife video overlay (Supports ANY video URL format in code) */}
      {videoBgActive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen"
        >
          {parsedHeroVideo.isDirectFile ? (
            <video
              key={parsedHeroVideo.directFileUrl}
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              preload="auto"
              className="w-full h-full object-cover scale-105 filter blur-[1px]"
              onError={() => setVideoBgActive(false)}
            >
              <source src={parsedHeroVideo.directFileUrl} />
            </video>
          ) : (
            <iframe
              key={parsedHeroVideo.bgEmbedUrl}
              src={parsedHeroVideo.bgEmbedUrl}
              title="Hero Background Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-[150%] h-[150%] absolute -top-[25%] -left-[25%] object-cover pointer-events-none border-0"
              onError={() => setVideoBgActive(false)}
            />
          )}
        </motion.div>
      )}

      {/* Background visual neon glowing backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/85 to-zinc-950 pointer-events-none z-0" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500 rounded-full blur-[140px] pointer-events-none z-0" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-rose-600 rounded-full blur-[120px] pointer-events-none z-0" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto w-full text-center z-10 space-y-8"
      >
        {/* Top Active Destination & State Pill */}
        <motion.div variants={itemFadeDown} className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 px-4 bg-zinc-900/90 border border-amber-500/30 rounded-full text-xs font-mono backdrop-blur-md shadow-xl">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE DISPATCH:</span>
          </span>
          
          <button
            onClick={onOpenCitySelector}
            className="flex items-center gap-1 text-amber-300 hover:text-white font-bold underline cursor-pointer"
          >
            <span>{city.flagEmoji}</span>
            <span>{city.name}, {city.stateOrRegion ? city.stateOrRegion : 'USA'}</span>
          </button>

          <span className="text-zinc-500">•</span>

          <span className="text-zinc-300">
            {city.minLegalAge}+ TOTALLY NUDE CABARET
          </span>

          <button
            onClick={onOpenCitySelector}
            className="px-2 py-0.5 bg-amber-400 text-black rounded-full font-black text-[10px] uppercase hover:bg-amber-300 transition ml-1"
          >
            Choose State & City
          </button>
        </motion.div>

        {/* Big Impact Headline */}
        <motion.div variants={itemFadeUp} className="relative mb-6">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="block text-xs sm:text-sm font-mono font-bold uppercase text-amber-400 mb-3"
          >
            LITTLE DARLINGS NUDE PARTY • {city.name.toUpperCase()}, {city.stateOrRegion ? city.stateOrRegion.toUpperCase() : 'USA'}
          </motion.span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.92] font-serif">
            LITTLE DARLINGS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-rose-500">NUDE PARTY</span>
          </h1>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-200 uppercase tracking-tight mt-2 font-sans">
            VIP PACKAGES & FREE PARTY BUS
          </h2>
        </motion.div>

        {/* Dynamic Subheading & Key Highlights */}
        <motion.div variants={itemFadeUp} className="max-w-3xl mx-auto space-y-3">
          <p className="text-sm sm:text-base text-zinc-300 font-mono leading-relaxed">
            {city.description} Book instant VIP passes, stage-front leather booths, and 100% complimentary luxury vehicle pickup in {city.name}, {city.stateOrRegion}. Skip the lines, waive the door cover, and experience nightlife with total VIP discretion.
          </p>
          {/* Rearranged Exclusive VIP Experience Badges with Framer Motion hover & staggered pop-in */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-4xl mx-auto font-mono text-xs">
            <motion.div 
              variants={badgeItemVariants}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="p-2.5 bg-zinc-900/90 border border-rose-500/40 rounded-xl flex items-center gap-2 text-rose-300 shadow-md cursor-default"
            >
              <Flame className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="font-bold text-[11px] uppercase tracking-wide">Unend intimate night</span>
            </motion.div>
            <motion.div 
              variants={badgeItemVariants}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="p-2.5 bg-zinc-900/90 border border-amber-500/40 rounded-xl flex items-center gap-2 text-amber-300 shadow-md cursor-default"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-[11px] uppercase tracking-wide">We don't kiss and tell</span>
            </motion.div>
            <motion.div 
              variants={badgeItemVariants}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="p-2.5 bg-zinc-900/90 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-emerald-300 shadow-md cursor-default"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold text-[11px] uppercase tracking-wide">Med test kit upon entry</span>
            </motion.div>
            <motion.div 
              variants={badgeItemVariants}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="p-2.5 bg-zinc-900/90 border border-purple-500/40 rounded-xl flex items-center gap-2 text-purple-300 shadow-md cursor-default"
            >
              <Users className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="font-bold text-[11px] uppercase tracking-wide">Group intimate</span>
            </motion.div>
          </div>

          {/* Quick CTA to VIP Passes */}
          <motion.div 
            variants={itemFadeUp}
            className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-xs"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenBooking}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-black uppercase rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <Crown className="w-4 h-4 text-black" />
              <span>Get {starterPrice} VIP Pass</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const el = document.getElementById('vip-packages-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 bg-zinc-900/90 hover:bg-zinc-800 text-amber-300 border border-amber-500/40 font-bold uppercase rounded-xl transition flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Explore VIP Packages</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Live Event Countdown Timer Component */}
        <motion.div variants={itemScaleUp}>
          <LiveEventCountdownTimer
            city={city}
            onOpenBooking={onOpenBooking}
          />
        </motion.div>

        {/* Free Party Bus Quick Dispatch & Nude Party Near Me Widget */}
        <motion.div 
          variants={itemScaleUp}
          className="max-w-3xl mx-auto bg-zinc-900/90 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md text-left"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Car className="w-4 h-4" />
              <span>Nude Party Near Me • Free VIP Pickup & Transit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded uppercase font-bold">
                100% Free Ride
              </span>
              <button
                onClick={onOpenCitySelector}
                className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1 font-bold"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>All 50 States</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleQuickPickup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* State & City Display with Change Trigger */}
              <div className="sm:col-span-4 relative">
                <label className="block text-[11px] font-mono uppercase font-bold text-amber-300 mb-1 flex items-center justify-between">
                  <span>1. State & City</span>
                </label>
                <button
                  type="button"
                  onClick={onOpenCitySelector}
                  className="w-full bg-zinc-950 border border-amber-500/40 px-3 py-2.5 text-left rounded-lg text-xs font-mono text-white hover:border-amber-400 transition flex items-center justify-between"
                >
                  <div className="truncate">
                    <span className="font-bold text-amber-300">{city.name}</span>
                    <span className="text-zinc-400 ml-1">({city.stateOrRegion || city.countryCode})</span>
                  </div>
                  <span className="text-[9px] bg-zinc-800 text-amber-300 px-1.5 py-0.5 rounded shrink-0">Switch</span>
                </button>
              </div>

              {/* Pickup Spot Selection */}
              <div className="sm:col-span-8 relative">
                <label className="block text-[11px] font-mono uppercase font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>2. Select Pickup Spot / Hotel in {city.name}</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedHotel}
                    onChange={(e) => setSelectedHotel(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 pl-9 pr-4 py-2.5 text-white text-xs font-mono rounded-lg focus:outline-none focus:border-amber-400 transition cursor-pointer"
                  >
                    <optgroup label={`🔥 Nude Party Near Me - ${city.name} Pickup Spots`}>
                      {city.topHotels.map(h => (
                        <option key={h.id} value={h.name}>
                          {h.name} (~{h.estDriveMinutes} min drive • {h.area})
                        </option>
                      ))}
                    </optgroup>
                    <option value="Custom Airbnb / Boutique Hotel">Custom Address / Airbnb Near Me in {city.name}</option>
                    <option value="Airport Arrival Valet">Airport Arrival Terminal Pickup Near Me</option>
                  </select>
                </div>
              </div>
            </div>

            {selectedHotel === 'Custom Airbnb / Boutique Hotel' && (
              <input
                type="text"
                placeholder={`Enter custom street address or Airbnb in ${city.name}...`}
                value={customHotelText}
                onChange={(e) => setCustomHotelText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 px-3.5 py-2 text-xs font-mono text-white rounded-lg focus:outline-none focus:border-amber-400"
              />
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>$50 / Person • Bitcoin Anonymous Escrow • No Gate Payment</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-mono text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2 shrink-0"
              >
                <span>Dispatch Free Party Bus in {city.name}</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Quick Highlights Strip */}
        <motion.div 
          variants={itemFadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-left font-mono"
        >
          <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }} className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <span className="text-[10px] text-zinc-400 uppercase block">VIP Packages</span>
            <strong className="text-amber-400 text-base font-serif uppercase">$50 Fri / $100 Wkd</strong>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Choose your VIP pass</span>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }} className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <span className="text-[10px] text-zinc-400 uppercase block">Entertainers</span>
            <strong className="text-rose-400 text-base font-serif uppercase">100+ Models</strong>
            <span className="text-[10px] text-rose-300 block mt-0.5 font-bold">At your service</span>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }} className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <span className="text-[10px] text-zinc-400 uppercase block">Party Bus Service</span>
            <strong className="text-amber-400 text-base font-serif uppercase">100% COMPED</strong>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Roundtrip hotel valet</span>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }} className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <span className="text-[10px] text-zinc-400 uppercase block">Schedule</span>
            <strong className="text-amber-400 text-base font-serif uppercase">Fri & All Weekend</strong>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Discreet email dispatch</span>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemFadeUp}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenBooking}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-black font-mono text-sm uppercase tracking-wider rounded-2xl shadow-2xl shadow-amber-500/30 transition flex items-center gap-2"
          >
            <Crown className="w-5 h-5" />
            <span>Book VIP Package in {city.name}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenCalculator}
            className="px-6 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-sm font-bold uppercase rounded-2xl transition flex items-center gap-2"
          >
            <span>Group Cost Splitter</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
