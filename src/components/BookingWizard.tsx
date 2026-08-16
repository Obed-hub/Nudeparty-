import React, { useState, useMemo } from 'react';
import { Crown, Car, Calendar, Users, Clock, Check, Sparkles, MapPin, ShieldCheck, Phone, Mail, User, ArrowRight, ArrowLeft, AlertCircle, Lock, AlertTriangle, QrCode, Heart, Flame } from 'lucide-react';
import { VIPPackageId, VIPPackage, BookingReservation, DestinationCity, SupportedCurrency } from '../types';
import { GLOBAL_VIP_PACKAGES, convertCurrency } from '../data/globalDestinationsData';
import { ALL_50_US_STATES, buildDestinationCityFromUSStateAndCity } from '../data/usStatesData';
import { BitcoinAnonymousCheckout } from './BitcoinAnonymousCheckout';

interface BookingWizardProps {
  initialCity: DestinationCity;
  initialPackageId?: VIPPackageId;
  currency: SupportedCurrency;
  onBookingSuccess: (reservation: BookingReservation) => void;
  onClose: () => void;
}

// Helper to generate upcoming Fridays & Weekends
const getUpcomingDates = (count = 12) => {
  const dates: { value: string; label: string; weekendLabel: string }[] = [];
  const current = new Date();
  const dayOfWeek = current.getDay(); // 0 is Sunday, 5 is Friday
  let daysUntilFriday = (5 - dayOfWeek + 7) % 7;
  if (daysUntilFriday === 0) {
    daysUntilFriday = 0;
  }
  const nextFriday = new Date(current);
  nextFriday.setDate(current.getDate() + daysUntilFriday);

  for (let i = 0; i < count; i++) {
    const friDate = new Date(nextFriday);
    friDate.setDate(nextFriday.getDate() + i * 7);
    
    const sunDate = new Date(friDate);
    sunDate.setDate(friDate.getDate() + 2);

    const iso = friDate.toISOString().split('T')[0];
    const friFormatted = friDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    const sunFormatted = sunDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    dates.push({
      value: iso,
      label: `Friday • ${friFormatted}`,
      weekendLabel: `Weekend: Fri ${friFormatted} – Sun ${sunFormatted}`
    });
  }
  return dates;
};

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialCity,
  initialPackageId = 'silver_starter',
  currency,
  onBookingSuccess,
  onClose
}) => {
  const upcomingDates = useMemo(() => getUpcomingDates(12), []);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCity, setSelectedCity] = useState<DestinationCity>(initialCity);
  const [selectedPackageId, setSelectedPackageId] = useState<VIPPackageId>(initialPackageId);
  const [partySize, setPartySize] = useState<number>(2);
  const [eventDate, setEventDate] = useState<string>(() => upcomingDates[0]?.value || '2026-08-21');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 PM');
  const [cityNotification, setCityNotification] = useState<string | null>(
    `📍 ${initialCity.name} Selected: Exact private venue location & party bus boarding details will be sent directly to your email upon Bitcoin confirmation.`
  );
  
  // Free VIP Party bus details
  const [hotelPickupRequired, setHotelPickupRequired] = useState(true);
  const [hotelName, setHotelName] = useState(initialCity.topHotels[0]?.name || 'City Hotel');
  const [customHotel, setCustomHotel] = useState('');
  const [pickupSpot, setPickupSpot] = useState('Front Main Valet');
  const [vehicleType, setVehicleType] = useState(initialCity.limoFleetTypes[0] || 'Free VIP Party Bus');

  // Contact
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState<any>('Bachelor Party');
  const [customNotes, setCustomNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const [selectedUSStateCode, setSelectedUSStateCode] = useState<string>(() => {
    const match = ALL_50_US_STATES.find(s => s.name.toLowerCase() === initialCity.stateOrRegion.toLowerCase());
    return match ? match.code : 'NV';
  });

  const selectedPkg = GLOBAL_VIP_PACKAGES.find(p => p.id === selectedPackageId) || GLOBAL_VIP_PACKAGES[0];

  // Dynamic Pricing based on selected package rate per person
  const isWeekendPackage = selectedPackageId === 'weekend_all_access';
  const pricePerPersonUSD = selectedPkg.price; // $50 for Friday Pass, $100 for Weekend Package, etc.
  const totalUSD = partySize * pricePerPersonUSD;
  const convertedTotal = convertCurrency(totalUSD, currency);
  const perPersonConverted = convertCurrency(pricePerPersonUSD, currency);

  const handleGoToBitcoinPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!guestName.trim() || !email.trim() || !phone.trim()) {
      setFormError('Please enter your name, email, and phone number for party bus dispatch & ticket email delivery.');
      return;
    }
    setStep(4);
  };

  const handleBitcoinPaymentSuccess = (txDetails: { btcAmount: number; btcAddress: string; txHash: string }) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const destinationPrefix = selectedCity.name.substring(0, 3).toUpperCase();
    const confirmationCode = `VIP-${destinationPrefix}-${randomSuffix}`;
    const venue = selectedCity.featuredVenues[0]?.name || `${selectedCity.name} VIP Cabaret`;

    const newReservation: BookingReservation = {
      id: `res_${Date.now()}`,
      confirmationCode,
      destinationCityId: selectedCity.id,
      destinationCityName: selectedCity.name,
      destinationCountry: selectedCity.country,
      venueName: venue,
      guestName,
      email,
      phone,
      partySize,
      eventDate,
      timeSlot,
      packageId: selectedPackageId,
      packageName: selectedPkg.name,
      basePackagePriceUSD: totalUSD,
      selectedCurrency: currency,
      currencySymbol: convertCurrency(1, currency).symbol,
      exchangeRate: convertedTotal.amount / totalUSD,
      basePackagePriceConverted: convertedTotal.amount,
      selectedAddOns: [],
      hotelPickup: {
        required: hotelPickupRequired,
        hotelName: customHotel || hotelName,
        roomOrEntrance: pickupSpot,
        pickupTime: timeSlot,
        liquorStoreStop: true,
        vehicleType
      },
      totalAmountUSD: totalUSD,
      totalAmountConverted: convertedTotal.amount,
      depositPaidUSD: totalUSD,
      depositPaidConverted: convertedTotal.amount,
      balanceDueAtDoorConverted: 0,
      costPerPersonConverted: perPersonConverted.amount,
      customNotes,
      occasion,
      paymentChoice: 'bitcoin_anonymous',
      bitcoinPayment: {
        btcAmount: txDetails.btcAmount,
        btcAddress: txDetails.btcAddress,
        txHash: txDetails.txHash,
        isPaid: true
      },
      status: 'CONFIRMED',
      limoStatus: {
        assigned: true,
        chauffeurName: `${selectedCity.hostName.split(' ')[0]} Party Bus Captain`,
        chauffeurPhone: selectedCity.emergencyHostPhone,
        vehicleType,
        licensePlate: `VIP-${Math.floor(100 + Math.random() * 900)}`,
        etaMinutes: 15
      },
      createdAt: new Date().toISOString()
    };

    onBookingSuccess(newReservation);
  };

  return (
    <div className="bg-zinc-950 border border-amber-500/50 rounded-2xl overflow-hidden shadow-2xl text-white font-sans text-left max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white uppercase font-mono flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>VIP Booking • {selectedCity.name}, {selectedCity.stateOrRegion}</span>
          </h2>
          <span className="text-xs font-mono text-zinc-400">
            Package: <strong className="text-amber-400">{selectedPkg.name}</strong> • ${pricePerPersonUSD}/ea (Total: {convertedTotal.formatted})
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-zinc-400 hover:text-white rounded-lg transition"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* 4 Step Tabs */}
      <div className="grid grid-cols-4 bg-zinc-900/60 border-b border-zinc-800 text-[11px] font-mono">
        <button
          onClick={() => setStep(1)}
          className={`py-2 text-center font-bold border-b-2 transition truncate px-1 ${
            step === 1 ? 'border-amber-400 text-amber-400 bg-amber-400/10' : 'border-transparent text-zinc-400'
          }`}
        >
          1. Package & City
        </button>
        <button
          onClick={() => setStep(2)}
          className={`py-2 text-center font-bold border-b-2 transition truncate px-1 ${
            step === 2 ? 'border-amber-400 text-amber-400 bg-amber-400/10' : 'border-transparent text-zinc-400'
          }`}
        >
          2. Date & Bus
        </button>
        <button
          onClick={() => setStep(3)}
          className={`py-2 text-center font-bold border-b-2 transition truncate px-1 ${
            step === 3 ? 'border-amber-400 text-amber-400 bg-amber-400/10' : 'border-transparent text-zinc-400'
          }`}
        >
          3. Contact
        </button>
        <button
          onClick={() => {
            if (guestName && email && phone) setStep(4);
          }}
          className={`py-2 text-center font-bold border-b-2 transition truncate px-1 ${
            step === 4 ? 'border-amber-400 text-amber-400 bg-amber-400/10' : 'border-transparent text-zinc-400'
          }`}
        >
          4. ₿ Bitcoin Pay
        </button>
      </div>

      {/* Form Content */}
      <div className="p-4 sm:p-5">
        
        {/* STEP 1: Package Selection & City & Guests */}
        {step === 1 && (
          <div className="space-y-4">
            {/* 100+ Models Guarantee Global Banner */}
            <div className="p-3 bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-purple-500/20 border border-rose-500/40 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-tight">
                  ALL PACKAGES INCLUDE OVER 100+ MODELS/GIRLS AT YOUR SERVICE
                </span>
              </div>
              <span className="text-[10px] font-mono bg-rose-500 text-white px-2 py-0.5 rounded font-black shrink-0">
                100+ MODELS
              </span>
            </div>

            {/* Package Selector */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-amber-300 font-bold mb-2">
                Choose Your VIP Package:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GLOBAL_VIP_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  const pkgConverted = convertCurrency(pkg.price, currency);
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/20 ring-1 ring-amber-400'
                          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-bold font-serif uppercase text-white truncate">
                          {pkg.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-400 shrink-0">
                          {pkgConverted.formatted} / ea
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-400 line-clamp-1 mb-2">
                        {pkg.subtitle}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-zinc-800/80">
                        <span className="text-rose-400 font-bold">✓ 100+ Models Included</span>
                        <span className="text-emerald-400">Free Party Bus</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* City & State Dropdown */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Select State:</label>
                <select
                  value={selectedUSStateCode}
                  onChange={(e) => {
                    const stCode = e.target.value;
                    setSelectedUSStateCode(stCode);
                    const stObj = ALL_50_US_STATES.find(s => s.code === stCode);
                    if (stObj) {
                      const newCity = buildDestinationCityFromUSStateAndCity(stObj, stObj.popularCities[0]);
                      setSelectedCity(newCity);
                      setHotelName(newCity.topHotels[0]?.name || 'City Hotel');
                      setCityNotification(`📍 ${newCity.name}, ${stObj.name} Selected: Exact private venue location & party bus boarding details will be sent directly to your email upon Bitcoin payment confirmation.`);
                    }
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                >
                  {ALL_50_US_STATES.map(s => (
                    <option key={s.code} value={s.code}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Select City:</label>
                <select
                  value={selectedCity.name}
                  onChange={(e) => {
                    const cityName = e.target.value;
                    const stObj = ALL_50_US_STATES.find(s => s.code === selectedUSStateCode) || ALL_50_US_STATES[0];
                    const newCity = buildDestinationCityFromUSStateAndCity(stObj, cityName);
                    setSelectedCity(newCity);
                    setHotelName(newCity.topHotels[0]?.name || 'City Hotel');
                    setCityNotification(`📍 ${cityName}, ${stObj.name} Selected: Exact private venue location & party bus boarding details will be sent directly to your email upon Bitcoin payment confirmation.`);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                >
                  {(ALL_50_US_STATES.find(s => s.code === selectedUSStateCode)?.popularCities || []).map(cityName => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* City Email Disclosure Notice */}
            {cityNotification && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs font-mono text-amber-200 flex items-start gap-2">
                <span className="text-amber-400 text-sm shrink-0">✉️</span>
                <span>{cityNotification}</span>
              </div>
            )}

            {/* Guests Count Selector */}
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-2">
              <label className="block text-[11px] font-mono uppercase text-zinc-400 font-bold flex items-center justify-between">
                <span>Number of Guests:</span>
                <span className="text-amber-400">${pricePerPersonUSD} x {partySize} = ${totalUSD} USD ({convertedTotal.formatted})</span>
              </label>
              
              <div className="flex items-center gap-3">
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 flex-1">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPartySize(num)}
                      className={`py-2 text-xs font-mono font-bold rounded-lg transition ${
                        partySize === num
                          ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                          : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold font-mono text-xs uppercase rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Next: {isWeekendPackage ? 'Weekend Dates' : 'Friday Date'} & Free Party Bus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Friday / Weekend Date, Time & Free Party Bus */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-mono uppercase text-amber-300 font-bold mb-1">
                  {isWeekendPackage ? 'Weekend Duration (Fri night – Sun eve):' : 'Party Date (Every Friday):'}
                </label>
                <select
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-amber-500/50 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                >
                  {upcomingDates.map(d => (
                    <option key={d.value} value={d.value}>
                      {isWeekendPackage ? d.weekendLabel : d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  {isWeekendPackage ? 'First Friday Pickup Time:' : 'Friday Pickup Time:'}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="9:00 PM">9:00 PM (Early Bird)</option>
                  <option value="10:00 PM">10:00 PM (Prime Time)</option>
                  <option value="11:00 PM">11:00 PM (Late Night)</option>
                  <option value="12:00 AM">12:00 AM (Midnight Squad)</option>
                  <option value="1:00 AM">1:00 AM (Afterhours)</option>
                </select>
              </div>
            </div>

            {/* Weekend package perks badge */}
            {isWeekendPackage && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs font-mono text-amber-200 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>$100 WEEKEND ALL-ACCESS INCLUDES:</span>
                </div>
                <p className="text-zinc-300 text-[11px]">
                  Valid continuous access from Friday Night (8 PM) all the way through Sunday Evening (11 PM). Includes unlimited party bus shuttles, priority VIP entrance, and 100+ models/girls at your service throughout the entire weekend.
                </p>
              </div>
            )}

            {/* Free Party Bus Hotel Pickup Spot */}
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1 flex items-center justify-between">
                <span>Free Party Bus Hotel Pickup in {selectedCity.name}:</span>
                <span className="text-emerald-400 font-bold text-[10px]">100% Free Ride</span>
              </label>
              
              <select
                value={hotelName}
                onChange={(e) => {
                  setHotelName(e.target.value);
                  if (e.target.value !== 'Other Custom Hotel / Airbnb') {
                    setCustomHotel('');
                  }
                }}
                className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400 mb-2"
              >
                {selectedCity.topHotels.map(h => (
                  <option key={h.id} value={h.name}>{h.name}</option>
                ))}
                <option value="Other Custom Hotel / Airbnb">Other Custom Hotel / Airbnb</option>
              </select>

              {hotelName === 'Other Custom Hotel / Airbnb' && (
                <input
                  type="text"
                  placeholder="Enter custom pickup address..."
                  value={customHotel}
                  onChange={(e) => setCustomHotel(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                />
              )}
            </div>

            {/* Location Email Disclosure Notice */}
            <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-[11px] font-mono text-zinc-300 space-y-1">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <span>✉️ Discreet Address Dispatch:</span>
              </div>
              <p className="text-zinc-400">
                The exact private address and party bus boarding instructions for {selectedCity.name} will be emailed to your inbox upon Bitcoin confirmation.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold font-mono text-xs uppercase rounded-xl transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold font-mono text-xs uppercase rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Next: Contact Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact & Submit */}
        {step === 3 && (
          <form onSubmit={handleGoToBitcoinPayment} className="space-y-4">
            {formError && (
              <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl text-xs font-mono text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Your Full Name / Nickname:</label>
              <input
                type="text"
                placeholder="e.g. Alex Johnson (or VIP Nickname)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">WhatsApp / Phone Number:</label>
                <input
                  type="tel"
                  placeholder="+1 (385) 260-0342"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-amber-300 font-bold mb-1">
                  Email (Where Tickets & Location Are Sent):
                </label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-amber-500/50 px-3 py-2 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            {/* Mandatory Anonymous Bitcoin Notice */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl space-y-1 text-xs font-mono">
              <div className="text-amber-300 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>MANDATORY BITCOIN PRE-PAYMENT (NO GATE CASH)</span>
              </div>
              <p className="text-zinc-400 text-[11px]">
                To maintain 100% discretion and entertainer privacy, tickets are pre-paid exclusively with Bitcoin. No payment is taken at the gate.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold font-mono text-xs uppercase rounded-xl transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold font-mono text-xs uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>Proceed to Bitcoin Payment (${totalUSD})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Bitcoin Anonymous Escrow Checkout */}
        {step === 4 && (
          <BitcoinAnonymousCheckout
            partySize={partySize}
            perPersonUSD={pricePerPersonUSD}
            currency={currency}
            cityName={selectedCity.name}
            onPaymentConfirmed={handleBitcoinPaymentSuccess}
            onBack={() => setStep(3)}
          />
        )}

      </div>
    </div>
  );
};
