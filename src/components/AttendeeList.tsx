import React, { useState, useMemo } from 'react';
import { RSVPData } from '../types';
import { Users, Search, Filter, ShieldCheck, MapPin, Sparkles, Flame } from 'lucide-react';

interface AttendeeListProps {
  attendees: RSVPData[];
}

export const AttendeeList: React.FC<AttendeeListProps> = ({ attendees }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('ALL');
  const [selectedTierFilter, setSelectedTierFilter] = useState('ALL');

  // Extract unique countries
  const countries = useMemo(() => {
    const set = new Set(attendees.map(a => a.country));
    return ['ALL', ...Array.from(set)];
  }, [attendees]);

  // Filter attendees
  const filteredAttendees = useMemo(() => {
    return attendees.filter(att => {
      const matchesSearch = 
        att.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.partyNickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = selectedCountryFilter === 'ALL' || att.country === selectedCountryFilter;
      const matchesTier = selectedTierFilter === 'ALL' || att.ticketTier === selectedTierFilter;

      return matchesSearch && matchesCountry && matchesTier;
    });
  }, [attendees, searchQuery, selectedCountryFilter, selectedTierFilter]);

  const tierBadges = {
    GA_18_PLUS: { label: 'GA 18+', class: 'bg-zinc-950 text-indigo-400 border-indigo-500/50' },
    VIP_LOUNGE: { label: 'VIP MATRIX', class: 'bg-zinc-950 text-fuchsia-400 border-fuchsia-500/50' },
    BACKSTAGE_ACCESS: { label: 'BACKSTAGE', class: 'bg-zinc-950 text-indigo-300 border-indigo-400/50' },
    EARLY_BIRD: { label: 'EARLY BIRD', class: 'bg-zinc-950 text-zinc-300 border-zinc-700' }
  };

  return (
    <section id="guestlist-section" className="py-16 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase mb-1">
              <Users className="w-4 h-4" />
              <span>04. ATTENDEE MATRIX DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Verified 18+ Guest List</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Community members and music lovers registered from across states, provinces, and countries.
            </p>
          </div>

          <div className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-zinc-300 uppercase">
            Total Confirmed: <strong className="text-indigo-400">{attendees.length} Attendees</strong>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 mb-6 flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by tag, name, city, state, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Country Dropdown */}
          <div className="w-full md:w-1/4">
            <select
              value={selectedCountryFilter}
              onChange={(e) => setSelectedCountryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'ALL REGIONS' : c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Tier Dropdown */}
          <div className="w-full md:w-1/4">
            <select
              value={selectedTierFilter}
              onChange={(e) => setSelectedTierFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">ALL PASS TIERS</option>
              <option value="GA_18_PLUS">GENERAL ADMISSION 18+</option>
              <option value="VIP_LOUNGE">VIP GEOMETRIC LOUNGE</option>
              <option value="BACKSTAGE_ACCESS">BACKSTAGE PASS</option>
            </select>
          </div>
        </div>

        {/* Attendee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredAttendees.map((att) => {
            const badge = tierBadges[att.ticketTier] || tierBadges.GA_18_PLUS;

            return (
              <div
                key={att.id}
                className="bg-zinc-900 border border-zinc-800 p-5 flex flex-col justify-between hover:border-zinc-700 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="font-black text-sm text-white uppercase flex items-center gap-1.5">
                        <span>{att.partyNickname || att.fullName}</span>
                      </div>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {att.fullName.split(' ')[0]} {att.fullName.split(' ')[1]?.[0] ? `${att.fullName.split(' ')[1][0]}.` : ''}
                      </span>
                    </div>

                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 border uppercase ${badge.class}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono mt-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{att.city}, {att.state}</span>
                  </div>

                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5 uppercase">
                    {att.country}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1 text-emerald-400 font-bold uppercase">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Age: {att.age}</span>
                  </div>

                  <span className="text-[10px] text-indigo-400 truncate max-w-[110px] uppercase">
                    {att.musicVibes[0] || 'Good Vibes'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAttendees.length === 0 && (
          <div className="text-center py-12 bg-zinc-900 border border-zinc-800 p-6">
            <p className="text-zinc-400 font-mono text-xs uppercase">No attendees match your filter parameters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountryFilter('ALL');
                setSelectedTierFilter('ALL');
              }}
              className="mt-4 px-5 py-2 bg-zinc-950 text-indigo-400 border border-zinc-800 text-xs font-bold uppercase tracking-wider hover:bg-zinc-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
