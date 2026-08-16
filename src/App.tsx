import React, { useState } from 'react';
import { VegasNavbar } from './components/VegasNavbar';
import { VegasHero } from './components/VegasHero';
import { GlobalDestinationSelector } from './components/GlobalDestinationSelector';
import { GlobalVenueExplorer } from './components/GlobalVenueExplorer';
import { LimoBanner } from './components/LimoBanner';
import { VIPPackagesGrid } from './components/VIPPackagesGrid';
import { BookingWizard } from './components/BookingWizard';
import { DigitalVIPPassModal } from './components/DigitalVIPPassModal';
import { PartyCostCalculator } from './components/PartyCostCalculator';
import { BachelorVipSpecial } from './components/BachelorVipSpecial';
import { EntertainerShowcase } from './components/EntertainerShowcase';
import { ByobMenuSection } from './components/ByobMenuSection';
import { VegasVenueFaq } from './components/VegasVenueFaq';
import { EventPhotoGallery } from './components/EventPhotoGallery';
import { VerifiedTestimonialsSection } from './components/VerifiedTestimonialsSection';
import { LiveLadiesBookingToast } from './components/LiveLadiesBookingToast';
import { HostChatModal } from './components/HostChatModal';
import { GLOBAL_DESTINATIONS, INITIAL_DEMO_RESERVATION, convertCurrency } from './data/globalDestinationsData';
import { ALL_50_US_STATES, buildDestinationCityFromUSStateAndCity } from './data/usStatesData';
import { BookingReservation, DestinationCity, DestinationVenue, SupportedCurrency, VIPPackageId } from './types';
import { RunwayStageBackdrop } from './components/RunwayStageBackdrop';
import { Crown, Car, Phone, ShieldCheck, Ticket, Sparkles, Flame, CheckCircle2, ChevronRight, Heart, Globe, MapPin, Compass } from 'lucide-react';

export function App() {
  const [selectedCity, setSelectedCity] = useState<DestinationCity>(GLOBAL_DESTINATIONS[0]);
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>('USD');
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState<BookingReservation | null>(INITIAL_DEMO_RESERVATION);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<VIPPackageId>('gold_bachelor');
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isHostChatOpen, setIsHostChatOpen] = useState(false);
  const [selectedStateCodeQuick, setSelectedStateCodeQuick] = useState('NV');

  const handleOpenBooking = (packageId?: VIPPackageId) => {
    if (packageId) {
      setSelectedPackageId(packageId);
    }
    setIsBookingOpen(true);
  };

  const handleQuickLimoRequest = (hotelName: string) => {
    setSelectedPackageId('gold_bachelor');
    setIsBookingOpen(true);
  };

  const handleBookVenue = (venue: DestinationVenue) => {
    setSelectedPackageId('gold_bachelor');
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (reservation: BookingReservation) => {
    setCurrentReservation(reservation);
    setIsBookingOpen(false);
    setIsPassOpen(true);
  };

  const handleQuickStateSelect = (stateCode: string) => {
    setSelectedStateCodeQuick(stateCode);
    const stateObj = ALL_50_US_STATES.find(s => s.code === stateCode);
    if (stateObj) {
      const defaultCityName = stateObj.popularCities[0];
      const newCity = buildDestinationCityFromUSStateAndCity(stateObj, defaultCityName);
      setSelectedCity(newCity);
      setSelectedCurrency('USD');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-400 selection:text-black font-sans antialiased relative w-full max-w-full overflow-x-hidden">
      {/* Global VIP Runway Stage with Numbered Cards Background (User Image) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden max-w-full">
        <RunwayStageBackdrop className="w-full h-full object-cover" overlayOpacity="opacity-45" />
        {/* Luxury multi-layer dark gradient & neon ambient glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/85 to-zinc-950 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/70 to-zinc-950 pointer-events-none" />
      </div>

      {/* Global Navbar with 50 States Live Ticker */}
      <VegasNavbar
        city={selectedCity}
        currency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        onOpenCitySelector={() => setIsCitySelectorOpen(true)}
        currentReservation={currentReservation}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPass={() => setIsPassOpen(true)}
        onOpenHostChat={() => setIsHostChatOpen(true)}
      />

      {/* Global & 50 US States Destination Selector Modal */}
      <GlobalDestinationSelector
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          setSelectedCurrency(city.currency);
        }}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        isOpen={isCitySelectorOpen}
        onClose={() => setIsCitySelectorOpen(false)}
      />

      {/* Embedded Booking Modal when triggered */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-4xl my-auto">
            <BookingWizard
              initialCity={selectedCity}
              initialPackageId={selectedPackageId}
              currency={selectedCurrency}
              onBookingSuccess={handleBookingSuccess}
              onClose={() => setIsBookingOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Digital VIP Pass Modal */}
      {isPassOpen && currentReservation && (
        <DigitalVIPPassModal
          reservation={currentReservation}
          onClose={() => setIsPassOpen(false)}
          onEdit={() => {
            setIsPassOpen(false);
            setSelectedPackageId(currentReservation.packageId);
            setIsBookingOpen(true);
          }}
        />
      )}

      {/* Host Chat Assistant Modal */}
      {isHostChatOpen && (
        <HostChatModal
          city={selectedCity}
          currency={selectedCurrency}
          onClose={() => setIsHostChatOpen(false)}
          onBookVIP={() => handleOpenBooking()}
        />
      )}

      {/* Live Ladies & VIP Guests Booking Near You Toast Notification */}
      <LiveLadiesBookingToast
        city={selectedCity}
        onOpenBooking={handleOpenBooking}
      />

      {/* Hero Section with State & City Picker & Free Pickup Dispatcher */}
      <VegasHero
        city={selectedCity}
        currency={selectedCurrency}
        onOpenBooking={handleOpenBooking}
        onQuickPickupRequest={handleQuickLimoRequest}
        onOpenCalculator={() => {
          const el = document.getElementById('calculator-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCitySelector={() => setIsCitySelectorOpen(true)}
      />

      {/* VIP Packages Grid (Calculated in Selected Currency) */}
      <VIPPackagesGrid
        city={selectedCity}
        currency={selectedCurrency}
        onSelectPackage={(pkgId) => handleOpenBooking(pkgId)}
        onOpenHostChat={() => setIsHostChatOpen(true)}
      />

      {/* Curated High-Quality Event Photos Gallery & Carousel */}
      <EventPhotoGallery
        city={selectedCity}
        onOpenBooking={handleOpenBooking}
        onOpenHostChat={() => setIsHostChatOpen(true)}
      />

      {/* Verified Guest Testimonials & Reviews Section */}
      <VerifiedTestimonialsSection
        city={selectedCity}
        onOpenBooking={handleOpenBooking}
        onOpenHostChat={() => setIsHostChatOpen(true)}
      />

      {/* Global Featured Cabarets & Venues Explorer */}
      <GlobalVenueExplorer
        city={selectedCity}
        currency={selectedCurrency}
        onBookVenue={handleBookVenue}
        onOpenCitySelector={() => setIsCitySelectorOpen(true)}
      />

      {/* 100% Free Hotel Pickup Banner & Route Estimator */}
      <LimoBanner
        city={selectedCity}
        onReservePickup={(hotel) => handleQuickLimoRequest(hotel)}
        onOpenCitySelector={() => setIsCitySelectorOpen(true)}
      />

      {/* Bachelor VIP Ritual Spotlight */}
      <BachelorVipSpecial
        city={selectedCity}
        currency={selectedCurrency}
        onBookBachelor={() => handleOpenBooking('gold_bachelor')}
      />

      {/* Group Party Cost Splitter & Calculator */}
      <PartyCostCalculator
        city={selectedCity}
        currency={selectedCurrency}
        onBookCalculated={(pkgId) => handleOpenBooking(pkgId)}
      />

      {/* Global Entertainers & Headliners Showcase */}
      <EntertainerShowcase
        city={selectedCity}
        onSelectVIP={() => handleOpenBooking('gold_bachelor')}
      />

      {/* Table Mixers & Exotic Hookah Menu */}
      <ByobMenuSection
        city={selectedCity}
        currency={selectedCurrency}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Venue Policies & FAQ */}
      <VegasVenueFaq city={selectedCity} />

      {/* All 50 US States Quick Directory Bar */}
      <section className="py-14 bg-zinc-900 border-t border-zinc-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>COVERING EVERY STATE IN THE USA</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-serif uppercase tracking-tight">
                Select Any State & City in America
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Choose the state and city you live in for instant VIP party reservations and complimentary luxury pickup dispatch.
              </p>
            </div>

            <button
              onClick={() => setIsCitySelectorOpen(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-mono text-xs font-black uppercase rounded-xl transition shadow-lg flex items-center gap-2 shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>Open 50-State Selector</span>
            </button>
          </div>

          {/* 50 States Quick Badge Grid */}
          <div className="flex flex-wrap gap-1.5 pt-2 max-h-48 overflow-y-auto pr-1">
            {ALL_50_US_STATES.map((st) => {
              const isActiveState = selectedCity.stateOrRegion.toLowerCase() === st.name.toLowerCase();
              return (
                <button
                  key={st.code}
                  onClick={() => handleQuickStateSelect(st.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
                    isActiveState
                      ? 'bg-amber-400 text-black font-black shadow-md ring-2 ring-amber-400'
                      : 'bg-zinc-950 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <span className="font-bold opacity-75">{st.code}</span>
                  <span>{st.name}</span>
                  <span className="text-[10px] opacity-60">({st.minLegalAge}+)</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-12 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-zinc-900">
            {/* Col 1: Brand & License */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-rose-600 rounded-xl flex items-center justify-center text-black font-bold">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xl font-black text-white font-serif uppercase tracking-tight">
                      LITTLE DARLINGS
                    </h4>
                    <span className="text-[10px] font-mono font-black bg-amber-400 text-black px-1.5 py-0.5 rounded uppercase">
                      NUDE PARTY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 tracking-widest block uppercase">
                    Premier 18+ VIP Nude Party & Adult Cabaret Network
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-mono leading-relaxed max-w-sm">
                The premier booking network for totally nude 18+ cabarets, stag weekends, and Little Darlings Nude Party VIP experiences across all 50 states in the USA and worldwide. Free hotel pickup included on all reservations.
              </p>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-amber-300 flex items-center justify-between">
                <span>Active City: <strong>{selectedCity.flagEmoji} {selectedCity.name}, {selectedCity.stateOrRegion}</strong></span>
                <button onClick={() => setIsCitySelectorOpen(true)} className="underline text-amber-400 text-[10px] font-bold">Change</button>
              </div>
            </div>

            {/* Col 2: Top US States & Hubs */}
            <div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-4">
                🇺🇸 Top US States
              </h5>
              <ul className="space-y-2 text-xs font-mono text-zinc-400">
                {['NV', 'FL', 'TX', 'CA', 'NY', 'GA', 'IL'].map(code => {
                  const s = ALL_50_US_STATES.find(item => item.code === code);
                  if (!s) return null;
                  return (
                    <li key={s.code}>
                      <button
                        onClick={() => handleQuickStateSelect(s.code)}
                        className="hover:text-amber-300 transition text-left"
                      >
                        {s.name} ({s.popularCities[0]})
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Col 3: International Top Destinations */}
            <div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-4">
                🌍 International Top
              </h5>
              <ul className="space-y-2 text-xs font-mono text-zinc-400">
                {GLOBAL_DESTINATIONS.filter(c => c.countryCode !== 'US').map(c => (
                  <li key={c.id}>
                    <button
                      onClick={() => {
                        setSelectedCity(c);
                        setSelectedCurrency(c.currency);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-amber-300 transition text-left"
                    >
                      {c.name}, {c.country}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: 24/7 Global VIP Dispatch */}
            <div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-4">
                24/7 VIP Concierge
              </h5>
              <div className="space-y-3 text-xs font-mono text-zinc-400">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Hotline in {selectedCity.name}:</span>
                  <a href={`tel:${selectedCity.emergencyHostPhone}`} className="text-white hover:text-amber-400 font-bold block mt-0.5">
                    {selectedCity.emergencyHostPhone}
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Local VIP Host:</span>
                  <strong className="text-amber-300">{selectedCity.hostName}</strong>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">24/7 WhatsApp (Messages Only):</span>
                  <a
                    href="https://wa.me/13852600342?text=Hello%20VIP%20Concierge,%20I%20have%20a%20question%20or%20need%20information."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold block mt-0.5 text-xs"
                  >
                    +1 (385) 260-0342
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Official Email Support:</span>
                  <a
                    href="mailto:joinsexcompany@gmail.com?subject=Information%20Request%20-%20Little%20Darlings%20VIP"
                    className="text-amber-400 hover:underline font-bold block mt-0.5 text-xs break-all"
                  >
                    joinsexcompany@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Transit Dispatch:</span>
                  <span className="text-emerald-400 font-bold">Chauffeurs Active 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Compliance Disclaimer */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500 text-center md:text-left">
            <div>
              © 2026 Little Darlings Nude Party VIP Network. Strictly {selectedCity.minLegalAge}+ admission in {selectedCity.name}, {selectedCity.stateOrRegion}. Physical government-issued photo ID required.
            </div>

            <div className="flex items-center gap-4">
              <span>Zero Upfront Risk</span>
              <span>•</span>
              <span>Free Luxury Pickup</span>
              <span>•</span>
              <span>All 50 US States Covered</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
