import React, { useState } from 'react';
import { calculateAge } from '../utils/ageValidator';
import { COUNTRIES_DATA } from '../data/locationData';
import { ShieldCheck, ShieldAlert, AlertCircle, CheckCircle2, Lock, ArrowRight, RotateCcw, MapPin } from 'lucide-react';
import { UserLocation } from '../types';

interface AgeGateModalProps {
  isOpen: boolean;
  onVerifyPass: (birthDate: string, location: UserLocation) => void;
  onDecline?: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({ isOpen, onVerifyPass }) => {
  const [birthDate, setBirthDate] = useState('2004-05-12');
  const [countryCode, setCountryCode] = useState('US');
  const [stateName, setStateName] = useState('California');
  const [confirmedOver18, setConfirmedOver18] = useState(true);
  const [isDenied, setIsDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const currentCountry = COUNTRIES_DATA.find(c => c.code === countryCode) || COUNTRIES_DATA[0];
  const availableStates = currentCountry.states || [];

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    const country = COUNTRIES_DATA.find(c => c.code === code);
    if (country && country.states.length > 0) {
      setStateName(country.states[0].name);
    } else {
      setStateName('Region');
    }
  };

  const ageResult = calculateAge(birthDate);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) {
      setErrorMessage('Please enter your date of birth.');
      return;
    }

    if (!confirmedOver18) {
      setErrorMessage('You must check the box to confirm you are 18 years or older.');
      return;
    }

    if (!ageResult.isValid) {
      setIsDenied(true);
      return;
    }

    const stateObj = availableStates.find(s => s.name === stateName);
    const userLoc: UserLocation = {
      country: currentCountry.name,
      countryCode: currentCountry.code,
      state: stateName,
      stateCode: stateObj?.code || '',
      flag: currentCountry.flag,
      updatedAt: new Date().toISOString()
    };

    onVerifyPass(birthDate, userLoc);
  };

  const handleTriggerDecline = () => {
    setIsDenied(true);
  };

  return (
    <div id="age-gate-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md animate-fadeIn">
      <div className="bg-zinc-900 border-2 border-indigo-600 w-full max-w-lg shadow-2xl relative overflow-hidden text-left">
        {/* Top Header Strip */}
        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/90">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-indigo-500 rotate-45 flex items-center justify-center">
              <span className="-rotate-45 font-mono text-[9px] font-black text-white">18</span>
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-white">VIVID NOCTURNE</span>
          </div>
          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 border ${
            isDenied 
              ? 'bg-rose-950 text-rose-300 border-rose-700/50'
              : 'bg-indigo-950 text-indigo-400 border-indigo-700/50'
          }`}>
            {isDenied ? 'ACCESS RESTRICTED' : '18+ VERIFICATION GATE'}
          </span>
        </div>

        {isDenied ? (
          /* DENIED ACCESS SCREEN */
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="bg-rose-950/40 border border-rose-600/60 p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-rose-900/50 border border-rose-500 flex items-center justify-center rotate-45 mb-5 shrink-0 shadow-lg shadow-rose-950/50">
                <ShieldAlert className="w-7 h-7 text-rose-400 -rotate-45" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2">
                ACCESS DENIED: AGE RESTRICTION ENFORCED
              </h2>
              <p className="text-xs text-rose-200/90 leading-relaxed max-w-md font-mono">
                You must be 18 years of age or older to enter this website and register for event access. Admission is strictly restricted to adults aged 18 and over in accordance with venue licensing and security regulations.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 space-y-2 text-xs font-mono text-zinc-400">
              <div className="text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Security Protocol Notice:</span>
              </div>
              <p className="leading-relaxed">
                Physical government-issued photo ID (Passport, Driver's License, National Identity Card) is inspected by licensed security personnel at turnstiles. No digital photos, screenshots, or minors permitted.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsDenied(false);
                  setErrorMessage('');
                }}
                className="flex-1 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider border border-zinc-700 transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                <span>Re-check Date of Birth</span>
              </button>

              <a
                href="https://google.com"
                className="flex-1 py-3.5 bg-rose-700 hover:bg-rose-600 text-white font-bold uppercase tracking-widest text-xs transition text-center shadow-lg shadow-rose-900/30 flex items-center justify-center"
              >
                Exit Website
              </a>
            </div>
          </div>
        ) : (
          /* VERIFICATION FORM */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Eligibility Check Hero Card */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-3 flex items-center gap-2">
                <span>01. MANDATORY 18+ NATURIST EVENT NOTICE</span>
              </h2>
              <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4 sm:p-5">
                <div className="text-4xl sm:text-5xl font-black text-indigo-400 font-mono shrink-0">18+</div>
                <div className="space-y-1 text-xs text-zinc-300 font-mono leading-relaxed">
                  <div className="text-fuchsia-400 font-bold uppercase tracking-wider">
                    Clothing-Optional & Naturist Environment
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    This is an 18+ body-positive naturist event with strict consent, sealed phone cameras, and mandatory government photo ID check at entry.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              {/* Date of Birth */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-2">
                  02. DATE OF BIRTH VERIFICATION
                </h2>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Location Selector (Country & State dropdowns) */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-2 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>03. YOUR LOCATION (COUNTRY & STATE)</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Country</label>
                    <select
                      value={countryCode}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-zinc-200 text-xs font-mono focus:outline-none focus:border-indigo-500"
                    >
                      {COUNTRIES_DATA.map((c) => (
                        <option key={c.code} value={c.code} className="bg-zinc-900 text-white">
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">State / Province</label>
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-zinc-200 text-xs font-mono focus:outline-none focus:border-indigo-500"
                    >
                      {availableStates.map((s) => (
                        <option key={s.code || s.name} value={s.name} className="bg-zinc-900 text-white">
                          {s.name} ({s.code || s.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 18+ Confirmation Checkbox */}
              <div className="bg-zinc-950 border border-zinc-800 p-3.5 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gate-confirm-checkbox"
                  checked={confirmedOver18}
                  onChange={(e) => setConfirmedOver18(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-indigo-600 rounded bg-zinc-900 border-zinc-700 shrink-0 cursor-pointer"
                />
                <label htmlFor="gate-confirm-checkbox" className="text-xs text-zinc-300 font-mono leading-relaxed cursor-pointer select-none">
                  I confirm that I am <strong className="text-white">18 years of age or older</strong>, acknowledge this is an <strong className="text-indigo-400">18+ naturist & clothing-optional event</strong>, and agree to adhere strictly to consent, towel hygiene, and zero-photography rules.
                </label>
              </div>

              {/* Live Age Validation Status */}
              <div
                className={`p-3 text-xs flex items-center gap-2 border font-mono ${
                  ageResult.isValid
                    ? 'bg-zinc-950 border-emerald-600/40 text-emerald-300'
                    : 'bg-zinc-950 border-rose-600/40 text-rose-300'
                }`}
              >
                {ageResult.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span className="font-semibold">{ageResult.message}</span>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-950/40 border border-rose-600/50 text-rose-300 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 uppercase tracking-widest text-xs transition-colors shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>CONFIRM 18+ & ENTER WEBSITE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleTriggerDecline}
                  className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 text-[11px] font-mono uppercase tracking-widest transition border border-zinc-800"
                >
                  I am under 18 years old (Deny Access)
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
