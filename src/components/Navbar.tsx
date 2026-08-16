import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Menu, X, Ticket, Music, Users, MapPin, Flame, Globe } from 'lucide-react';
import { RSVPData, UserLocation } from '../types';

interface NavbarProps {
  userRSVP: RSVPData | null;
  userLocation: UserLocation | null;
  onOpenRSVP: () => void;
  onOpenPass: () => void;
  onOpenLocation?: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  userRSVP, 
  userLocation,
  onOpenRSVP, 
  onOpenPass, 
  onOpenLocation,
  activeSection 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Event Pass', href: '#hero-section', icon: Sparkles },
    { label: 'Location Hub', href: '#location-hub', icon: MapPin },
    { label: 'DJ Timetable', href: '#lineup-section', icon: Music },
    { label: 'Jukebox', href: '#jukebox-section', icon: Flame },
    { label: 'Guestlist', href: '#guestlist-section', icon: Users },
    { label: 'Security & Venue', href: '#venue-section', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand with Geometric Balance Diamond */}
        <a href="#hero-section" className="flex items-center gap-3.5 group">
          <div className="w-8 h-8 bg-indigo-600 rotate-45 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
            <span className="-rotate-45 font-black text-white text-xs font-mono">18</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-white tracking-tighter uppercase">VIVID NOCTURNE</span>
              <span className="text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 uppercase tracking-wider">
                18+ ONLY
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase block">
              Autonomous Verification Portal
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            return (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-400 hover:text-indigo-400 transition-colors py-1 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Location Badge Indicator */}
          {userLocation && (
            <a
              href="#location-hub"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 transition"
              title="Your selected Country & State"
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate max-w-[120px]">{userLocation.state}, {userLocation.countryCode}</span>
            </a>
          )}

          {userRSVP ? (
            <button
              onClick={onOpenPass}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-indigo-300 border border-indigo-600/50 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Ticket className="w-3.5 h-3.5 text-indigo-400" />
              <span>Pass #{userRSVP.passCode}</span>
            </button>
          ) : (
            <button
              onClick={onOpenRSVP}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-indigo-600/20"
            >
              <div className="w-1.5 h-1.5 bg-white rotate-45"></div>
              <span>Secure Entry</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900 border-b border-zinc-800 px-6 py-4 space-y-2 animate-fadeIn">
          {userLocation && (
            <div className="px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs font-mono text-indigo-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{userLocation.state}, {userLocation.country}</span>
              </span>
              <span>{userLocation.flag}</span>
            </div>
          )}
          {navLinks.map((link) => {
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold tracking-widest uppercase text-zinc-300 hover:bg-zinc-800 hover:text-indigo-400 transition"
              >
                <div className="w-1.5 h-1.5 bg-indigo-500 rotate-45"></div>
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

