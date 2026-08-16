import React, { useState, useMemo } from 'react';
import { Search, Check, Car, ChevronRight, X, Compass, MapPin } from 'lucide-react';
import { DestinationCity, SupportedCurrency } from '../types';
import { GLOBAL_DESTINATIONS, SUPPORTED_CURRENCIES } from '../data/globalDestinationsData';
import { ALL_50_US_STATES, buildDestinationCityFromUSStateAndCity } from '../data/usStatesData';

interface GlobalDestinationSelectorProps {
  selectedCity: DestinationCity;
  onSelectCity: (city: DestinationCity) => void;
  selectedCurrency: SupportedCurrency;
  onSelectCurrency: (curr: SupportedCurrency) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const GlobalDestinationSelector: React.FC<GlobalDestinationSelectorProps> = ({
  selectedCity,
  onSelectCity,
  selectedCurrency,
  onSelectCurrency,
  isOpen = false,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'US_STATES' | 'TOP_HUBS' | 'GLOBAL'>('US_STATES');
  const [selectedStateCode, setSelectedStateCode] = useState<string>(() => {
    const match = ALL_50_US_STATES.find(s => s.name.toLowerCase() === selectedCity.stateOrRegion.toLowerCase());
    return match ? match.code : 'NV';
  });
  const [search, setSearch] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [cityPickedNotice, setCityPickedNotice] = useState<string | null>(null);

  const currentStateObj = useMemo(() => {
    return ALL_50_US_STATES.find(s => s.code === selectedStateCode) || ALL_50_US_STATES[0];
  }, [selectedStateCode]);

  const filteredStates = useMemo(() => {
    if (!search.trim()) return ALL_50_US_STATES;
    const q = search.toLowerCase();
    return ALL_50_US_STATES.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.popularCities.some(c => c.toLowerCase().includes(q))
    );
  }, [search]);

  const handlePickCity = (cityName: string) => {
    const newCity = buildDestinationCityFromUSStateAndCity(currentStateObj, cityName);
    onSelectCity(newCity);
    setCityPickedNotice(`📍 Location Confirmed for ${cityName}, ${currentStateObj.name}! Secret party location & bus boarding details will be sent directly to your email.`);
    setTimeout(() => {
      if (onClose) onClose();
    }, 1200);
  };

  const handleCustomCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCity.trim()) return;
    const newCity = buildDestinationCityFromUSStateAndCity(currentStateObj, customCity.trim());
    onSelectCity(newCity);
    setCityPickedNotice(`📍 Location Confirmed for ${customCity.trim()}, ${currentStateObj.name}! Secret party location & bus boarding details will be sent directly to your email.`);
    setTimeout(() => {
      if (onClose) onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-950 border border-amber-500/50 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-tight">
                18+ TOTALLY NUDE PARTY • Select State & City
              </h2>
              <span className="text-[10px] text-zinc-400 font-mono block">All 50 US States & Top Worldwide Cabarets</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Currency Selector */}
            <select
              value={selectedCurrency}
              onChange={(e) => onSelectCurrency(e.target.value as SupportedCurrency)}
              className="bg-zinc-950 border border-zinc-700 text-amber-400 text-xs px-2 py-1 rounded-lg font-mono focus:outline-none"
              aria-label="Select currency"
            >
              {SUPPORTED_CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>

            {onClose && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1 text-zinc-400 hover:text-white rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-3 p-1.5 bg-zinc-900/60 border-b border-zinc-800 gap-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab('US_STATES')}
            className={`py-2 rounded-lg font-bold transition text-center ${
              activeTab === 'US_STATES' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🇺🇸 50 US States
          </button>
          <button
            onClick={() => setActiveTab('TOP_HUBS')}
            className={`py-2 rounded-lg font-bold transition text-center ${
              activeTab === 'TOP_HUBS' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🔥 Top US Cities
          </button>
          <button
            onClick={() => setActiveTab('GLOBAL')}
            className={`py-2 rounded-lg font-bold transition text-center ${
              activeTab === 'GLOBAL' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🌍 International
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Email Notification Alert when City is Picked */}
          {cityPickedNotice && (
            <div className="p-3 bg-amber-500/20 border border-amber-400 rounded-xl text-xs font-mono text-amber-200 flex items-start gap-2 shadow-lg animate-pulse">
              <span className="text-base shrink-0">✉️</span>
              <div>
                <strong className="block text-amber-300 font-bold">Email Dispatch Activated:</strong>
                <span>{cityPickedNotice}</span>
              </div>
            </div>
          )}

          {activeTab === 'US_STATES' && (
            <>
              {/* Step 1: Select State */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase font-bold mb-1.5">
                  1. Select US State ({filteredStates.length} Available)
                </label>
                
                {/* Search State input */}
                <div className="relative mb-2">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search state or city..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 pl-9 pr-3 py-2 text-xs text-white rounded-xl focus:outline-none focus:border-amber-400 font-mono"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* State Dropdown / Grid */}
                <div className="max-h-36 overflow-y-auto border border-zinc-800 rounded-xl p-1.5 grid grid-cols-2 sm:grid-cols-3 gap-1 bg-zinc-900/40">
                  {filteredStates.map(s => {
                    const isSelected = s.code === selectedStateCode;
                    return (
                      <button
                        key={s.code}
                        onClick={() => setSelectedStateCode(s.code)}
                        className={`p-2 rounded-lg text-left text-xs font-mono transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-400 text-black font-bold'
                            : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{s.name} ({s.code})</span>
                        <span className="text-[10px] opacity-70 ml-1 shrink-0">{s.minLegalAge}+</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select City in that State */}
              <div className="pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase font-bold">
                    2. Select City in <span className="text-amber-400">{currentStateObj.name}</span>
                  </label>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <Car className="w-3 h-3" /> Free Party Bus
                  </span>
                </div>

                {/* Popular Cities for the State */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {currentStateObj.popularCities.map(cityName => {
                    const isCurrent = selectedCity.name.toLowerCase() === cityName.toLowerCase() && selectedCity.stateOrRegion.toLowerCase() === currentStateObj.name.toLowerCase();
                    return (
                      <button
                        key={cityName}
                        onClick={() => handlePickCity(cityName)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-mono transition flex items-center justify-between ${
                          isCurrent
                            ? 'bg-amber-400 text-black font-bold border-amber-400'
                            : 'bg-zinc-900 border-zinc-800 text-white hover:border-amber-400 hover:bg-zinc-850'
                        }`}
                      >
                        <span className="truncate font-bold">{cityName}</span>
                        {isCurrent ? <Check className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom City input */}
                <form onSubmit={handleCustomCitySubmit} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder={`Other city in ${currentStateObj.name}...`}
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-700 px-3 py-2 text-xs font-mono text-white rounded-xl focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-800 hover:bg-amber-400 hover:text-black text-amber-400 text-xs font-mono font-bold rounded-xl transition uppercase"
                  >
                    Select
                  </button>
                </form>
              </div>
            </>
          )}

          {activeTab === 'TOP_HUBS' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GLOBAL_DESTINATIONS.filter(c => c.countryCode === 'US').map(city => (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    if (onClose) onClose();
                  }}
                  className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    selectedCity.id === city.id
                      ? 'bg-amber-400 text-black font-bold border-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-white hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{city.flagEmoji}</span>
                    <div>
                      <div className="text-xs font-bold font-mono">{city.name}</div>
                      <div className="text-[10px] text-zinc-400">{city.stateOrRegion} • {city.minLegalAge}+</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}

          {activeTab === 'GLOBAL' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GLOBAL_DESTINATIONS.filter(c => c.countryCode !== 'US').map(city => (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    onSelectCurrency(city.currency);
                    if (onClose) onClose();
                  }}
                  className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    selectedCity.id === city.id
                      ? 'bg-amber-400 text-black font-bold border-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-white hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{city.flagEmoji}</span>
                    <div>
                      <div className="text-xs font-bold font-mono">{city.name}</div>
                      <div className="text-[10px] text-zinc-400">{city.country} • {city.currency}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Active: <strong className="text-amber-400">{selectedCity.name}, {selectedCity.stateOrRegion || selectedCity.country}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-300 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
