import React, { useState, useMemo } from 'react';
import { RSVPData, TicketTier, UserLocation } from '../types';
import { COUNTRIES_DATA, MUSIC_GENRES, DRINK_PREFERENCES, TICKET_TIERS, COMFORT_LEVELS } from '../data/locationData';
import { calculateAge, generatePassCode } from '../utils/ageValidator';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  User, 
  Sparkles, 
  Music, 
  Wine, 
  AlertCircle, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Radio, 
  HeartHandshake, 
  Flame, 
  CheckCircle2, 
  Info,
  CameraOff,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RSVPFormProps {
  onRSVPSuccess: (rsvp: RSVPData) => void;
  initialData?: RSVPData | null;
  userLocation?: UserLocation | null;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onRSVPSuccess, initialData, userLocation }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Form State
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [partyNickname, setPartyNickname] = useState(initialData?.partyNickname || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [birthDate, setBirthDate] = useState(initialData?.birthDate || '2004-06-15');
  
  // Location State (defaults from userLocation if available)
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    initialData?.countryCode || userLocation?.countryCode || 'US'
  );
  const [selectedState, setSelectedState] = useState(
    initialData?.state || userLocation?.state || 'California'
  );
  const [selectedCity, setSelectedCity] = useState(initialData?.city || 'Los Angeles');
  const [customCity, setCustomCity] = useState('');
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || '');

  // Experience State
  const [ticketTier, setTicketTier] = useState<TicketTier>(initialData?.ticketTier || 'GA_18_PLUS');
  const [comfortLevel, setComfortLevel] = useState(initialData?.comfortLevel || 'full_nude');
  const [musicVibes, setMusicVibes] = useState<string[]>(initialData?.musicVibes || ['Tech House & Deep House', 'Afrobeats / Amapiano']);
  const [drinkPreference, setDrinkPreference] = useState(initialData?.drinkPreference || 'Craft Cocktails & Spirits');
  const [songTitle, setSongTitle] = useState(initialData?.songRequestTitle || '');
  const [songArtist, setSongArtist] = useState(initialData?.songRequestArtist || '');
  
  // Plus One State
  const [hasPlusOne, setHasPlusOne] = useState(initialData?.hasPlusOne || false);
  const [plusOneName, setPlusOneName] = useState(initialData?.plusOneName || '');
  const [plusOneAge, setPlusOneAge] = useState(initialData?.plusOneAge ? String(initialData.plusOneAge) : '21');

  // Safety & Emergency
  const [emergencyName, setEmergencyName] = useState(initialData?.emergencyContactName || '');
  const [emergencyPhone, setEmergencyPhone] = useState(initialData?.emergencyContactPhone || '');
  const [agreeIdCheck, setAgreeIdCheck] = useState(initialData?.agreedToIdCheck ?? true);
  const [agreeRules, setAgreeRules] = useState(initialData?.agreedToRules ?? true);
  const [agreeConsent, setAgreeConsent] = useState(initialData?.agreedToConsentPolicy ?? true);
  const [agreeNoCameras, setAgreeNoCameras] = useState(initialData?.agreedToNoCameraPolicy ?? true);

  // Form Error feedback
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  // Compute live age validation
  const ageValidation = useMemo(() => calculateAge(birthDate), [birthDate]);

  // Selected country object
  const currentCountry = useMemo(() => {
    return COUNTRIES_DATA.find(c => c.code === selectedCountryCode) || COUNTRIES_DATA[0];
  }, [selectedCountryCode]);

  // Available states for selected country
  const availableStates = useMemo(() => {
    return currentCountry.states || [];
  }, [currentCountry]);

  // Available cities for selected state
  const availableCities = useMemo(() => {
    const stateObj = availableStates.find(s => s.name === selectedState);
    return stateObj ? stateObj.cities : [];
  }, [availableStates, selectedState]);

  // Handle Country change
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    const country = COUNTRIES_DATA.find(c => c.code === countryCode);
    if (country && country.states.length > 0) {
      setSelectedState(country.states[0].name);
      setSelectedCity(country.states[0].cities[0] || 'Other');
    } else {
      setSelectedState('Region');
      setSelectedCity('Other');
    }
  };

  // Handle State change
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const stateObj = availableStates.find(s => s.name === stateName);
    if (stateObj && stateObj.cities.length > 0) {
      setSelectedCity(stateObj.cities[0]);
    } else {
      setSelectedCity('Other');
    }
  };

  // Toggle Music Vibe
  const toggleVibe = (label: string) => {
    if (musicVibes.includes(label)) {
      setMusicVibes(musicVibes.filter(v => v !== label));
    } else {
      setMusicVibes([...musicVibes, label]);
    }
  };

  // Validate step before progressing
  const validateStep = (step: number): boolean => {
    const errors: string[] = [];

    if (step === 1) {
      if (!fullName.trim()) errors.push('Full legal name is required.');
      if (!email.trim() || !email.includes('@')) errors.push('A valid email is required for pass delivery.');
      if (!phone.trim()) errors.push('Phone number is required for SMS check-in alert.');
      if (!birthDate) {
        errors.push('Date of birth is mandatory for 18+ validation.');
      } else if (!ageValidation.isValid) {
        errors.push(`Age Restriction: You must be 18+ to attend. Current age: ${ageValidation.age} years old.`);
      }
    }

    if (step === 2) {
      if (!selectedCountryCode) errors.push('Please select your country.');
      if (!selectedState) errors.push('Please select your state/province.');
      if (selectedCity === 'Other' && !customCity.trim()) {
        errors.push('Please type your city name.');
      }
    }

    if (step === 3) {
      if (musicVibes.length === 0) errors.push('Select at least 1 music genre preference.');
      if (hasPlusOne) {
        if (!plusOneName.trim()) errors.push('Please enter your +1 guest full name.');
        const pAge = parseInt(plusOneAge, 10);
        if (isNaN(pAge) || pAge < 18) {
          errors.push('Your +1 guest must also be strictly 18+ years old.');
        }
      }
    }

    if (step === 4) {
      if (!emergencyName.trim()) errors.push('Emergency contact name is required for safety.');
      if (!emergencyPhone.trim()) errors.push('Emergency contact phone number is required.');
      if (!agreeIdCheck) errors.push('You must agree to present physical Government Photo ID at the gate.');
      if (!agreeConsent) errors.push('You must agree to the mandatory Consent & Safe-Space Policy.');
      if (!agreeNoCameras) errors.push('You must agree to the Zero-Photography & Camera Privacy Seal Policy.');
      if (!agreeRules) errors.push('You must agree to the 18+ Naturist Code of Conduct and towel hygiene rules.');
    }

    setStepErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setStepErrors([]);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const finalCity = selectedCity === 'Other' ? customCity : selectedCity;
    const passCode = generatePassCode(selectedCountryCode, selectedState);

    const newRsvp: RSVPData = {
      id: initialData?.id || `rsvp-${Date.now()}`,
      fullName,
      partyNickname: partyNickname.trim() || fullName.split(' ')[0],
      email,
      phone,
      birthDate,
      age: ageValidation.age,
      isOver18: true,
      country: currentCountry.name,
      countryCode: selectedCountryCode,
      state: selectedState,
      city: finalCity,
      postalCode,
      ticketTier,
      comfortLevel,
      musicVibes,
      drinkPreference,
      hasPlusOne,
      plusOneName: hasPlusOne ? plusOneName : undefined,
      plusOneAge: hasPlusOne ? parseInt(plusOneAge, 10) : undefined,
      songRequestTitle: songTitle || undefined,
      songRequestArtist: songArtist || undefined,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
      agreedToRules: agreeRules,
      agreedToIdCheck: agreeIdCheck,
      agreedToConsentPolicy: agreeConsent,
      agreedToNoCameraPolicy: agreeNoCameras,
      passCode,
      registeredAt: new Date().toISOString(),
      checkedIn: false
    };

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ec4899']
    });

    onRSVPSuccess(newRsvp);
  };

  const steps = [
    { num: 1, label: '18+ Identity', icon: User },
    { num: 2, label: 'Location', icon: MapPin },
    { num: 3, label: 'Party Vibe', icon: Sparkles },
    { num: 4, label: 'Safety Check', icon: ShieldCheck }
  ];

  return (
    <div id="rsvp-form-container" className="w-full max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative">
      {/* Steps Indicator - Geometric Balance Grid */}
      <div className="grid grid-cols-4 gap-2 mb-8 border-b border-zinc-800 pb-6">
        {steps.map((s) => {
          const isCompleted = currentStep > s.num;
          const isCurrent = currentStep === s.num;

          return (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num < currentStep) setCurrentStep(s.num);
              }}
              className={`p-3 text-left border transition-all ${
                isCurrent
                  ? 'bg-zinc-950 border-indigo-500 text-white shadow-sm'
                  : isCompleted
                  ? 'bg-zinc-950/60 border-zinc-700 text-zinc-300'
                  : 'bg-zinc-950/30 border-zinc-800 text-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                  0{s.num}
                </span>
                {isCompleted && <div className="w-1.5 h-1.5 bg-indigo-400 rotate-45"></div>}
                {isCurrent && <div className="w-1.5 h-1.5 bg-indigo-500 rotate-45"></div>}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider block truncate ${isCurrent ? 'text-indigo-400' : isCompleted ? 'text-zinc-200' : 'text-zinc-500'}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Error alert banner */}
      {stepErrors.length > 0 && (
        <div className="mb-6 p-4 bg-zinc-950 border border-rose-600/50 text-rose-300 text-xs space-y-1 font-mono">
          <div className="flex items-center gap-2 font-bold text-rose-400 text-xs uppercase tracking-wider mb-1">
            <AlertCircle className="w-4 h-4" />
            <span>Validation Exception Detected</span>
          </div>
          {stepErrors.map((err, i) => (
            <p key={i} className="flex items-center gap-1.5 text-rose-200/90">
              • {err}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* STEP 1: IDENTITY & 18+ AGE CHECK */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-indigo-400 block mb-1">
                01. IDENTITY & AGE CONFIRMATION
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Personal & Legal Identity</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Our environment enforces a strict 18+ policy. Enter your legal identification details as shown on physical credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Legal Full Name <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="input-full-name"
                  type="text"
                  required
                  placeholder="e.g. Jordan Mitchell"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 text-zinc-200 text-xs placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Party Nickname / Handle <span className="text-zinc-500">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">@</span>
                  <input
                    id="input-nickname"
                    type="text"
                    placeholder="JordanVibes"
                    value={partyNickname}
                    onChange={(e) => setPartyNickname(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 pl-8 pr-3.5 py-3.5 text-zinc-200 text-xs placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Strict Date of Birth Verification */}
            <div className="bg-zinc-950 border border-zinc-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-200">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Date of Birth (Strictly 18+)</span> <span className="text-indigo-400">*</span>
                </label>
                {ageValidation.isValid ? (
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-zinc-900 px-2.5 py-1 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {ageValidation.age} YRS OLD (ELIGIBLE)
                  </span>
                ) : (
                  <span className="text-[11px] font-mono font-bold text-rose-400 bg-zinc-900 px-2.5 py-1 border border-rose-500/40">
                    AGE: {ageValidation.age} YRS (UNDER 18)
                  </span>
                )}
              </div>

              <input
                id="input-birth-date"
                type="date"
                required
                value={birthDate}
                max="2026-08-22"
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 p-3.5 text-zinc-100 font-mono text-xs focus:outline-none focus:border-indigo-500"
              />

              {/* Age Feedback Banner */}
              <div
                className={`p-3.5 text-xs flex items-start gap-3 border font-mono ${
                  ageValidation.isValid
                    ? 'bg-zinc-900/90 border-emerald-500/30 text-emerald-300'
                    : 'bg-zinc-900/90 border-rose-500/40 text-rose-300'
                }`}
              >
                {ageValidation.isValid ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold block uppercase">{ageValidation.message}</span>
                  <span className="text-[11px] text-zinc-400 mt-0.5 block">
                    Security will physically verify this against your Government ID at the door.
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Email Address (Pass Delivery) <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="input-email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 text-zinc-200 text-xs placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Phone Number (SMS Verification) <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="input-phone"
                  type="tel"
                  required
                  placeholder="+1 (385) 260-0342"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 text-zinc-200 text-xs placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION SELECTOR (COUNTRY, STATE, CITY) */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-indigo-400 block mb-1">
                02. REGIONAL REGISTRY & LOCATION
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Origin Country & State</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Select your Country, State/Province, and City to synchronize with regional guestlist registries.
              </p>
            </div>

            {/* Country Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Country of Residence <span className="text-indigo-400">*</span>
              </label>
              <select
                id="select-country"
                value={selectedCountryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {COUNTRIES_DATA.map((c) => (
                  <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                    {c.flag} {c.name} ({c.dialCode})
                  </option>
                ))}
              </select>
            </div>

            {/* State / Province Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  State / Province / Region <span className="text-indigo-400">*</span>
                </label>
                <select
                  id="select-state"
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {availableStates.map((s) => (
                    <option key={s.code} value={s.name} className="bg-zinc-900 text-white">
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  City / Metro <span className="text-indigo-400">*</span>
                </label>
                <select
                  id="select-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {availableCities.map((city) => (
                    <option key={city} value={city} className="bg-zinc-900 text-white">
                      {city}
                    </option>
                  ))}
                  <option value="Other" className="bg-zinc-900 text-white">
                    ✍️ Other / Custom City
                  </option>
                </select>
              </div>
            </div>

            {/* Custom City entry if "Other" is picked */}
            {selectedCity === 'Other' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Type Your City Name <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="input-custom-city"
                  type="text"
                  required
                  placeholder="Enter your city name"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Postal / Zip Code <span className="text-zinc-500">(Optional)</span>
              </label>
              <input
                id="input-postal-code"
                type="text"
                placeholder="e.g. 90210 / SW1A 1AA / 10001"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3.5 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Region Summary Badge */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs text-zinc-300 font-mono">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>
                  Pass Origin: <strong className="text-white">{selectedCity === 'Other' ? customCity || 'Custom' : selectedCity}, {selectedState} ({currentCountry.name})</strong>
                </span>
              </div>
              <span className="text-base">{currentCountry.flag}</span>
            </div>
          </div>
        )}

        {/* STEP 3: PARTY VIBE, TICKET TIER & REFRESHMENTS */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-indigo-400 block mb-1">
                03. TICKET TIER & EXPERIENCE MATRIX
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Pass Tier & Music Selections</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Configure your VIP party credentials, specify music preferences, and select refreshments.
              </p>
            </div>

            {/* Ticket Tier Cards */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
                Select Pass Tier <span className="text-indigo-400">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TICKET_TIERS.map((tier) => {
                  const isSelected = ticketTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setTicketTier(tier.id)}
                      className={`p-5 border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-zinc-950 border-indigo-500 shadow-lg shadow-indigo-600/10'
                          : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3.5 right-3.5 w-4 h-4 bg-indigo-600 text-white flex items-center justify-center rotate-45">
                          <span className="-rotate-45 text-[10px] font-bold">✓</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-indigo-400 block mb-1">
                          {tier.badge}
                        </span>
                        <h4 className="font-black text-sm text-white uppercase mb-1">{tier.name}</h4>
                        <div className="text-xs font-bold text-fuchsia-400 font-mono mb-2">
                          {tier.price}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug mb-3">
                          {tier.description}
                        </p>
                      </div>

                      <div className="border-t border-zinc-800/80 pt-2.5 space-y-1 text-[10px] text-zinc-300 font-mono">
                        {tier.perks.slice(0, 2).map((perk, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="text-indigo-400">+</span> {perk}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Naturist / Clothing-Optional Comfort Level Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
                Clothing-Optional & Comfort Preference <span className="text-indigo-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMFORT_LEVELS.map((lvl) => {
                  const isSelected = comfortLevel === lvl.id;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => setComfortLevel(lvl.id)}
                      className={`p-4 border flex items-start gap-3 cursor-pointer transition ${
                        isSelected
                          ? 'bg-zinc-950 border-indigo-500 text-white shadow-md shadow-indigo-600/10'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{lvl.icon}</span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide text-white">{lvl.label}</div>
                        <div className="text-[11px] text-zinc-400 font-mono mt-0.5 leading-snug">{lvl.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Music Genre Chips */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
                Select Sonic Preferences <span className="text-indigo-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {MUSIC_GENRES.map((genre) => {
                  const isChecked = musicVibes.includes(genre.label);
                  return (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => toggleVibe(genre.label)}
                      className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider border flex items-center gap-2 transition ${
                        isChecked
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <span>{genre.icon}</span>
                      <span>{genre.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drink & Bar Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
                Refreshment Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DRINK_PREFERENCES.map((drink) => {
                  const isSelected = drinkPreference === drink.label;
                  return (
                    <div
                      key={drink.id}
                      onClick={() => setDrinkPreference(drink.label)}
                      className={`p-3.5 border flex items-center gap-3 cursor-pointer transition ${
                        isSelected
                          ? 'bg-zinc-950 border-indigo-500 text-white'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-lg">{drink.icon}</span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide text-white">{drink.label}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{drink.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Song Request for DJ Box */}
            <div className="bg-zinc-950 border border-zinc-800 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <Music className="w-4 h-4" />
                <span>Live DJ Queue Track Request (Optional)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Track Title (e.g. Laser Dance)"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Artist (e.g. Bicep / Fred Again)"
                  value={songArtist}
                  onChange={(e) => setSongArtist(e.target.value)}
                  className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Plus One (+1) Checkbox */}
            <div className="bg-zinc-950 border border-zinc-800 p-5 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPlusOne}
                  onChange={(e) => setHasPlusOne(e.target.checked)}
                  className="w-4 h-4 bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-0"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Add +1 Guest to Reservation</span>
                  <span className="text-[11px] text-zinc-400 block font-mono">
                    Guest must be 18+ and show matching physical identification.
                  </span>
                </div>
              </label>

              {hasPlusOne && (
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                      +1 Legal Full Name <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Guest full legal name"
                      value={plusOneName}
                      onChange={(e) => setPlusOneName(e.target.value)}
                      className="w-full p-3 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                      +1 Guest Age (18+) <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="18"
                      max="99"
                      placeholder="e.g. 21"
                      value={plusOneAge}
                      onChange={(e) => setPlusOneAge(e.target.value)}
                      className="w-full p-3 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: SAFETY, EMERGENCY & TERMS */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-indigo-400 block mb-1">
                04. PROTOCOLS & SECURITY CHECK
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Emergency Contact & Policy Terms</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Guest safety is paramount. Supply an emergency contact and confirm all door verification terms.
              </p>
            </div>

            {/* Emergency Contact */}
            <div className="bg-zinc-950 border border-zinc-800 p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <HeartHandshake className="w-4 h-4" />
                <span>Emergency Contact Person</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                    Contact Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    id="input-emergency-name"
                    type="text"
                    required
                    placeholder="Guardian / Close Contact"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                    Emergency Phone <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    id="input-emergency-phone"
                    type="tel"
                    required
                    placeholder="+1 (385) 260-0342"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Mandatory Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start gap-3.5 p-4 bg-zinc-950 border border-zinc-800 cursor-pointer">
                <input
                  id="checkbox-id-check"
                  type="checkbox"
                  checked={agreeIdCheck}
                  onChange={(e) => setAgreeIdCheck(e.target.checked)}
                  className="w-4 h-4 mt-0.5 bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white block mb-0.5 uppercase tracking-wider">Mandatory 18+ Physical Photo ID Verification</strong>
                  I certify that I am at least 18 years old (born {birthDate}) and will present physical, unexpired government photo ID at entry turnstiles.
                </span>
              </label>

              <label className="flex items-start gap-3.5 p-4 bg-zinc-950 border border-zinc-800 cursor-pointer">
                <input
                  id="checkbox-consent"
                  type="checkbox"
                  checked={agreeConsent}
                  onChange={(e) => setAgreeConsent(e.target.checked)}
                  className="w-4 h-4 mt-0.5 bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white block mb-0.5 uppercase tracking-wider">Enthusiastic Consent & Safe-Space Policy</strong>
                  I understand this is a body-positive, clothing-optional sanctuary. Consent is strictly mandatory for any interaction. Touching without permission, harassment, or non-consensual acts will result in immediate removal.
                </span>
              </label>

              <label className="flex items-start gap-3.5 p-4 bg-zinc-950 border border-zinc-800 cursor-pointer">
                <input
                  id="checkbox-no-camera"
                  type="checkbox"
                  checked={agreeNoCameras}
                  onChange={(e) => setAgreeNoCameras(e.target.checked)}
                  className="w-4 h-4 mt-0.5 bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white block mb-0.5 uppercase tracking-wider">Strict Zero-Photography & Sealed Phone Cameras</strong>
                  I agree to have tamper-evident privacy seals placed over all phone cameras at the door and will not take photos, videos, or recordings anywhere inside the venue.
                </span>
              </label>

              <label className="flex items-start gap-3.5 p-4 bg-zinc-950 border border-zinc-800 cursor-pointer">
                <input
                  id="checkbox-rules"
                  type="checkbox"
                  checked={agreeRules}
                  onChange={(e) => setAgreeRules(e.target.checked)}
                  className="w-4 h-4 mt-0.5 bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-white block mb-0.5 uppercase tracking-wider">Towel Hygiene & Footwear Rules</strong>
                  I agree to always sit on my own clean towel when seated on venue furniture and to wear footwear (shoes/slides) at all times for safety.
                </span>
              </label>
            </div>

            {/* Summary Review Box */}
            <div className="p-4 bg-zinc-950 border border-indigo-600/40 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-indigo-300 font-bold uppercase">
                <span>Pass Review: {fullName}</span>
                <span>{ageValidation.age} YRS OLD</span>
              </div>
              <div className="text-zinc-400 flex items-center justify-between">
                <span>Location: {selectedCity === 'Other' ? customCity : selectedCity}, {selectedState} ({currentCountry.name})</span>
                <span className="text-fuchsia-400 font-bold">{ticketTier.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Form Navigation Controls */}
        <div className="mt-10 pt-6 border-t border-zinc-800 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-widest border border-zinc-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest transition shadow-lg shadow-indigo-600/20"
            >
              <span>CONTINUE STEP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs transition shadow-2xl shadow-indigo-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>GENERATE CRYPTOGRAPHIC 18+ PASS</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
