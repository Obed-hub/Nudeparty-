import React, { useState } from 'react';
import { Crown, Car, Flame, Phone, Calendar, Ticket, Menu, X, Sparkles, MapPin, ShieldCheck, Globe, ChevronDown, Compass } from 'lucide-react';
import { BookingReservation, DestinationCity, SupportedCurrency } from '../types';
import { SUPPORTED_CURRENCIES } from '../data/globalDestinationsData';

interface VegasNavbarProps {
  city: DestinationCity;
  currency: SupportedCurrency;
  onSelectCurrency: (curr: SupportedCurrency) => void;
  onOpenCitySelector: () => void;
  currentReservation: BookingReservation | null;
  onOpenBooking: () => void;
  onOpenPass: () => void;
  onOpenHostChat: () => void;
}

export const VegasNavbar: React.FC<VegasNavbarProps> = ({
  city,
  currency,
  onSelectCurrency,
  onOpenCitySelector,
  currentReservation,
  onOpenBooking,
  onOpenPass,
  onOpenHostChat
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'VIP Packages', href: '#vip-packages-section' },
    { label: 'Photos', href: '#event-gallery' },
    { label: 'Reviews', href: '#reviews-section' },
    { label: 'Venues', href: '#venues-section' },
    { label: 'Free Pickup', href: '#pickup-service-section' },
    { label: 'FAQ', href: '#faq-section' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-amber-500/20 shadow-2xl w-full max-w-full overflow-hidden">
      {/* Top Global Live Announcement Ticker - Fully Responsive on Mobile */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white text-[10px] sm:text-[11px] font-bold py-1.5 px-2.5 sm:px-4 shadow-inner w-full">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 font-mono tracking-wider text-center sm:text-left">
          {/* Location & Totally Nude Badge */}
          <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
            <button
              onClick={onOpenCitySelector}
              className="bg-black/60 hover:bg-black text-amber-300 px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase tracking-wider border border-amber-400/50 flex items-center gap-1 transition shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-none">LIVE: {city.name.toUpperCase()} 🇺🇸</span>
              <span className="text-[8px] sm:text-[9px] bg-amber-400 text-black px-1 rounded font-black shrink-0">CHANGE</span>
            </button>
            <span className="text-[9px] sm:text-[10px] font-black text-amber-200 bg-black/40 px-1.5 py-0.5 rounded uppercase border border-amber-400/30">
              🔥 18+ TOTALLY NUDE VIP CABARET & NUDE PARTY
            </span>
            <span className="hidden lg:inline text-white/90 text-[10px]">
              • 100+ MODELS TOTALLY NUDE AT YOUR SERVICE • FREE PARTY BUS
            </span>
          </div>

          {/* WhatsApp Direct Line */}
          <div className="flex items-center justify-center gap-3 text-[10px] sm:text-xs shrink-0">
            <a
              href={`https://wa.me/13852600342?text=Hello%20VIP%20Concierge,%20I%20need%20VIP%20information%20for%20${encodeURIComponent(city.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline text-amber-200 hover:text-emerald-300 font-mono font-bold"
              title="Chat on WhatsApp"
            >
              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>WhatsApp: +1 (385) 260-0342</span>
            </a>
            <span className="hidden md:inline text-amber-200/70">|</span>
            <button
              onClick={onOpenCitySelector}
              className="hidden md:flex items-center gap-1 text-amber-200 hover:text-white underline text-[10px]"
            >
              <Compass className="w-3 h-3" />
              <span>All 50 US States</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-0 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Nude Party Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
          <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-400 via-amber-600 to-rose-600 rounded-xl p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition shrink-0">
              <div className="w-full h-full bg-zinc-950 rounded-[9px] flex items-center justify-center">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                <span className="text-base sm:text-2xl font-black tracking-tight text-white font-serif uppercase truncate">
                  LITTLE DARLINGS
                </span>
                <span className="text-[8px] sm:text-[10px] font-mono font-black bg-gradient-to-r from-amber-400 to-rose-500 text-black px-1.5 py-0.5 rounded uppercase shrink-0">
                  18+ TOTALLY NUDE
                </span>
              </div>
              <span className="text-[8px] sm:text-[10px] font-mono text-zinc-400 tracking-wider block uppercase truncate">
                Premier 18+ VIP Totally Nude Cabarets
              </span>
            </div>
          </a>

          {/* Destination & State Selector Pill (Desktop) */}
          <button
            onClick={onOpenCitySelector}
            className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 rounded-xl text-xs font-mono font-bold text-amber-300 transition shadow-inner ml-2 group shrink-0"
          >
            <span className="text-base">{city.flagEmoji}</span>
            <span>{city.name}, {city.stateOrRegion || city.countryCode}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 transition" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 shrink-0">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-amber-400 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Currency Dropdown (Tablet/Desktop) */}
          <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-700 px-2.5 py-1.5 rounded-xl text-xs font-mono">
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value as SupportedCurrency)}
              aria-label="Select currency"
              className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer text-xs font-mono"
            >
              {SUPPORTED_CURRENCIES.map(c => (
                <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Active Reservation Voucher Button */}
          {currentReservation && (
            <button
              onClick={onOpenPass}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/50 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg animate-pulse"
            >
              <Ticket className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">My VIP Pass</span>
            </button>
          )}

          {/* Host Chat Button */}
          <button
            onClick={onOpenHostChat}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded-xl text-xs font-mono font-bold uppercase transition"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Host Chat</span>
          </button>

          {/* Primary Book VIP Button */}
          <button
            onClick={onOpenBooking}
            className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-black text-[11px] sm:text-xs font-mono uppercase tracking-wider rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/20 transition transform hover:scale-105 active:scale-95 flex items-center gap-1 shrink-0"
          >
            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
            <span>Book VIP</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 bg-zinc-900 text-zinc-300 hover:text-white rounded-lg sm:rounded-xl border border-zinc-800 shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-zinc-950 border-b border-zinc-800 p-4 sm:p-5 space-y-4 text-left animate-fadeIn max-w-full overflow-hidden">
          {/* 18+ Totally Nude Party Banner */}
          <div className="p-3 bg-gradient-to-r from-rose-950/80 to-amber-950/80 border border-rose-500/40 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                🔥 18+ TOTALLY NUDE VIP CABARETS
              </span>
              <p className="text-xs text-zinc-300 font-mono mt-0.5">
                Over 100+ Models Totally Nude on stage & in VIP suites at your service.
              </p>
            </div>
          </div>

          {/* Destination Selector inside drawer */}
          <div className="p-3 bg-zinc-900 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Active State & City:</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xl shrink-0">{city.flagEmoji}</span>
                <strong className="text-white text-xs sm:text-sm uppercase font-serif truncate">{city.name}, {city.stateOrRegion || city.country}</strong>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCitySelector();
              }}
              className="px-3 py-1.5 bg-amber-400 text-black text-xs font-mono font-bold rounded-lg uppercase shrink-0"
            >
              Change City
            </button>
          </div>

          {/* Currency selection for mobile */}
          <div className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono">
            <span className="text-zinc-400">Display Currency:</span>
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value as SupportedCurrency)}
              aria-label="Select currency mobile"
              className="bg-zinc-950 text-amber-400 font-bold border border-zinc-700 px-3 py-1 rounded-lg"
            >
              {SUPPORTED_CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 sm:p-3 bg-zinc-900/60 hover:bg-zinc-900 rounded-xl text-xs font-mono font-bold text-zinc-300 hover:text-amber-400 border border-zinc-800 transition text-center"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHostChat();
              }}
              className="w-full py-3 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Chat With {city.hostName.split(' ')[0]} ({city.name} VIP Host)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-black font-mono text-xs font-black uppercase rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-black" />
              <span>Book 18+ Nude Party & VIP Service</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
