import React, { useState } from 'react';
import { UserLocation, RSVPData } from '../types';
import { COUNTRIES_DATA } from '../data/locationData';
import { MapPin, Globe, Check, Users, Sparkles, Navigation, Clock, Compass, ShieldCheck } from 'lucide-react';

interface LocationExperienceBarProps {
  userLocation: UserLocation | null;
  onUpdateLocation: (location: UserLocation) => void;
  attendees: RSVPData[];
  onOpenRSVP: () => void;
}

export const LocationExperienceBar: React.FC<LocationExperienceBarProps> = ({
  userLocation,
  onUpdateLocation,
  attendees,
  onOpenRSVP
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(userLocation?.countryCode || 'US');
  const [selectedState, setSelectedState] = useState(userLocation?.state || 'California');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentCountry = COUNTRIES_DATA.find(c => c.code === selectedCountryCode) || COUNTRIES_DATA[0];
  const availableStates = currentCountry.states || [];

  const handleCountryChange = (code: string) => {
    setSelectedCountryCode(code);
    const country = COUNTRIES_DATA.find(c => c.code === code);
    if (country && country.states.length > 0) {
      setSelectedState(country.states[0].name);
    } else {
      setSelectedState('Region');
    }
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const stateObj = availableStates.find(s => s.name === selectedState);
    const updated: UserLocation = {
      country: currentCountry.name,
      countryCode: currentCountry.code,
      state: selectedState,
      stateCode: stateObj?.code || '',
      flag: currentCountry.flag,
      updatedAt: new Date().toISOString()
    };
    onUpdateLocation(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Calculate personalization statistics based on stored location
  const stateAttendees = userLocation
    ? attendees.filter(a => a.state.toLowerCase() === userLocation.state.toLowerCase() || a.country.toLowerCase() === userLocation.country.toLowerCase())
    : [];

  const regionalPopularGenre = (() => {
    if (stateAttendees.length === 0) return 'Tech House & Afrobeats';
    const genreCounts: Record<string, number> = {};
    stateAttendees.forEach(a => {
      a.musicVibes.forEach(v => {
        genreCounts[v] = (genreCounts[v] || 0) + 1;
      });
    });
    const sorted = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || 'Tech House & Melodic Techno';
  })();

  return (
    <section id="location-hub" className="py-8 border-y border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Main Bar / Container */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Top Label */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-950 border border-indigo-500/50 flex items-center justify-center rotate-45 shrink-0">
                <MapPin className="w-4 h-4 text-indigo-400 -rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase">
                    REGIONAL PERSONALIZATION HUB
                  </span>
                  <span className="text-[9px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-800 px-2 py-0.5 uppercase">
                    Stored in Session
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">
                  {userLocation ? `${userLocation.state}, ${userLocation.country}` : 'Select Your Country & State'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {savedSuccess && (
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-zinc-950 border border-emerald-500/40 px-3 py-1.5 uppercase animate-fadeIn">
                  <Check className="w-3.5 h-3.5" />
                  <span>Preferences Saved</span>
                </span>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-bold uppercase tracking-wider transition"
              >
                {isEditing ? 'Close Dropdowns' : 'Change Location'}
              </button>
            </div>
          </div>

          {/* Location Dropdown Selection Controls */}
          {isEditing && (
            <form onSubmit={handleSaveLocation} className="mb-8 p-5 bg-zinc-950 border border-indigo-500/50 animate-fadeIn space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>Select Your Country and State from Dropdowns</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Country Dropdown */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    1. Country Selection
                  </label>
                  <select
                    id="location-country-select"
                    value={selectedCountryCode}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 p-3 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  >
                    {COUNTRIES_DATA.map((c) => (
                      <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Dropdown */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    2. State / Province Selection
                  </label>
                  <select
                    id="location-state-select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 p-3 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  >
                    {availableStates.map((s) => (
                      <option key={s.code || s.name} value={s.name} className="bg-zinc-900 text-white">
                        {s.name} ({s.code || s.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-zinc-400 font-mono">
                  This selection will automatically personalize your travel guide, guest matrix, and RSVP ticket pass.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs transition shadow-lg shadow-indigo-600/30 shrink-0"
                >
                  Save & Apply Location
                </button>
              </div>
            </form>
          )}

          {/* Personalized Experience Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Insight 1: Regional Attendee Count */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-indigo-400 font-bold uppercase tracking-wider">LOCAL CREW</span>
                  <Users className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {stateAttendees.length > 0 ? stateAttendees.length : 12}+ Verified
                </div>
                <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed">
                  Attendees confirmed traveling from <strong className="text-zinc-200">{userLocation ? userLocation.state : 'your region'}</strong>.
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-900 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>18+ Verified ID Checked</span>
              </div>
            </div>

            {/* Insight 2: Regional Vibe Recommendation */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-fuchsia-400 font-bold uppercase tracking-wider">SOUND MATRIX AFFINITY</span>
                  <Sparkles className="w-4 h-4 text-fuchsia-400" />
                </div>
                <div className="text-base font-black text-white uppercase tracking-tight truncate">
                  {regionalPopularGenre}
                </div>
                <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed">
                  Leading track frequency chosen by partygoers in {userLocation ? userLocation.country : 'your territory'}.
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-900 flex items-center gap-1.5 text-[10px] font-mono text-fuchsia-400">
                <span>Stage 01 & 02 Synced</span>
              </div>
            </div>

            {/* Insight 3: Auto-Filled RSVP Ticket Pass */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-indigo-400 font-bold uppercase tracking-wider">STORED TICKET REGISTRY</span>
                  <Navigation className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">
                  Pre-configured for {userLocation?.flag || '🌐'} {userLocation?.countryCode || 'US'}
                </div>
                <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed">
                  Your state ({userLocation?.state || 'California'}) will automatically load onto your cryptographic digital party pass.
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-900 flex items-center justify-between">
                <button
                  onClick={onOpenRSVP}
                  className="text-xs font-mono font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider transition flex items-center gap-1"
                >
                  <span>Open 18+ RSVP</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
