import React, { useState } from 'react';
import { RSVPData } from '../types';
import { QRCodePass, BarcodeGenerator } from './QRCodePass';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Share2, 
  Download, 
  RotateCw, 
  CheckCircle2, 
  UserCheck, 
  Flame, 
  Volume2, 
  Copy, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PartyPassCardProps {
  rsvp: RSVPData;
  onEdit?: () => void;
}

export const PartyPassCard: React.FC<PartyPassCardProps> = ({ rsvp, onEdit }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(rsvp.passCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPass = () => {
    setDownloadSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My 18+ Neon Velocity Party Pass',
        text: `I just locked in my pass for Neon Velocity! Verified 18+ attendee: ${rsvp.partyNickname || rsvp.fullName}. Location: ${rsvp.city}, ${rsvp.country}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyCode();
    }
  };

  const tierColors = {
    GA_18_PLUS: {
      border: 'border-zinc-700',
      badge: 'bg-zinc-950 text-indigo-400 border-indigo-500/50',
      bgGlow: 'bg-zinc-900',
      label: 'GENERAL ADMISSION 18+',
      accent: 'text-indigo-400'
    },
    VIP_LOUNGE: {
      border: 'border-indigo-500/60',
      badge: 'bg-zinc-950 text-fuchsia-400 border-fuchsia-500/50',
      bgGlow: 'bg-zinc-900',
      label: 'VIP GEOMETRIC LOUNGE',
      accent: 'text-fuchsia-400'
    },
    BACKSTAGE_ACCESS: {
      border: 'border-indigo-400',
      badge: 'bg-zinc-950 text-indigo-300 border-indigo-400/50',
      bgGlow: 'bg-zinc-900',
      label: 'BACKSTAGE & SOUND MATRIX',
      accent: 'text-indigo-300'
    },
    EARLY_BIRD: {
      border: 'border-zinc-700',
      badge: 'bg-zinc-950 text-zinc-300 border-zinc-700',
      bgGlow: 'bg-zinc-900',
      label: 'EARLY BIRD PASS',
      accent: 'text-zinc-300'
    }
  }[rsvp.ticketTier] || {
    border: 'border-zinc-700',
    badge: 'bg-zinc-950 text-indigo-400 border-indigo-500/50',
    bgGlow: 'bg-zinc-900',
    label: 'GENERAL ADMISSION 18+',
    accent: 'text-indigo-400'
  };

  return (
    <div id="party-pass-container" className="w-full max-w-xl mx-auto my-6">
      {/* Top Banner Message */}
      <div className="bg-zinc-900 border border-indigo-500/40 p-4 mb-4 flex items-center justify-between gap-3 text-zinc-200 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-950 border border-indigo-500/50 flex items-center justify-center rotate-45 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 -rotate-45" />
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider text-white">RSVP Verified • 18+ Access Granted</h4>
            <p className="text-[11px] text-zinc-400 font-mono">
              Physical Government ID required at entry turnstile.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-zinc-800 transition"
          title="Flip pass"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Flip</span>
        </button>
      </div>

      {/* Main Pass Card */}
      <div
        id="digital-party-pass"
        className={`relative w-full p-6 sm:p-8 border shadow-2xl transition-all duration-500 overflow-hidden bg-zinc-900 ${tierColors.border}`}
      >
        {!isFlipped ? (
          /* FRONT OF PASS */
          <div className="relative z-10 flex flex-col gap-6">
            {/* Header / Event Title */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 border uppercase ${tierColors.badge}`}>
                    {tierColors.label}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-zinc-950 text-emerald-400 px-2.5 py-1 border border-emerald-500/40 uppercase">
                    <ShieldCheck className="w-3 h-3" />
                    18+ VERIFIED
                  </span>
                  {rsvp.comfortLevel && (
                    <span className="text-[10px] font-mono font-bold bg-zinc-950 text-indigo-300 px-2.5 py-1 border border-indigo-500/40 uppercase">
                      {rsvp.comfortLevel.replace(/_/g, ' ')}
                    </span>
                  )}
                  <span className="text-[10px] font-mono font-bold bg-zinc-950 text-amber-300 px-2.5 py-1 border border-amber-500/40 uppercase">
                    SEALED CAMERA ONLY
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                  NOCTURNE MATRIX
                </h3>
                <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-0.5">
                  18+ Naturist & Clothing-Optional Sound Sanctuary
                </p>
              </div>

              {/* Holographic Watermark Badge */}
              <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 p-1 flex flex-col items-center justify-center text-center shadow-lg rotate-45 shrink-0">
                <div className="-rotate-45 flex flex-col items-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-[8px] font-mono font-bold text-white uppercase">18+</span>
                </div>
              </div>
            </div>

            {/* Attendee Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 p-4">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-400 block mb-1">
                  ATTENDEE CREDENTIAL
                </span>
                <div className="text-base font-black text-white uppercase">
                  {rsvp.fullName}
                </div>
                {rsvp.partyNickname && (
                  <span className="text-xs font-mono text-fuchsia-400 font-bold flex items-center gap-1 mt-0.5">
                    <Flame className="w-3 h-3 text-fuchsia-400" />
                    @{rsvp.partyNickname}
                  </span>
                )}
                <div className="mt-3 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">AGE: <strong className="text-white">{rsvp.age} YRS</strong></span>
                  <span className="text-zinc-400">DOB: <strong className="text-white">{rsvp.birthDate}</strong></span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-400 block mb-1">
                  REGIONAL ORIGIN
                </span>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="truncate">{rsvp.city}, {rsvp.state}</span>
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">
                  {rsvp.country}
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">BAR:</span>
                  <span className="text-indigo-300 font-bold text-[11px] truncate max-w-[140px]">
                    {rsvp.drinkPreference}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Time & Venue Bar */}
            <div className="bg-zinc-950 border border-zinc-800 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span className="font-bold">SAT, AUG 22, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>21:00 – 04:30</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>WAREHOUSE MATRIX</span>
              </div>
            </div>

            {/* QR Code & Digital Barcode Section */}
            <div className="bg-zinc-950 border border-zinc-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest uppercase mb-1">
                  CRYPTOGRAPHIC PASS ID
                </span>
                <div className="flex items-center gap-2 mb-3">
                  <code className="text-base font-mono font-black text-indigo-300 bg-zinc-900 px-3 py-1 border border-zinc-800">
                    {rsvp.passCode}
                  </code>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition"
                    title="Copy pass code"
                  >
                    {copied ? <Check className="w-4 h-4 text-indigo-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>DOOR STATUS: <strong className="text-white uppercase">AUTHORIZED ENTRY</strong></span>
                </div>
                {rsvp.hasPlusOne && (
                  <div className="mt-2 text-[11px] font-mono text-indigo-300 bg-zinc-900 px-2.5 py-1 border border-zinc-800">
                    +1 GUEST: <strong>{rsvp.plusOneName}</strong> (18+ VERIFIED)
                  </div>
                )}
              </div>

              {/* QR Component */}
              <div className="shrink-0">
                <QRCodePass text={`PARTY_PASS_18_${rsvp.passCode}_${rsvp.id}_${rsvp.fullName}`} size={120} />
              </div>
            </div>

            {/* Bottom Barcode */}
            <div className="pt-2 flex flex-col items-center justify-center border-t border-zinc-800">
              <BarcodeGenerator code={rsvp.passCode} />
            </div>
          </div>
        ) : (
          /* BACK OF PASS (SAFETY, EMERGENCY, HOUSE RULES) */
          <div className="relative z-10 flex flex-col gap-4 text-zinc-200 min-h-[460px]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h4 className="font-black text-white text-base uppercase tracking-tight">Pass Protocols & Door Verification</h4>
              </div>
              <span className="text-xs font-mono text-zinc-400">{rsvp.passCode}</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed font-mono">
              <div className="bg-zinc-950 border border-zinc-800 p-4">
                <strong className="text-indigo-400 block mb-1 uppercase">1. Age & Physical ID Verification</strong>
                Strictly 18+ on August 22, 2026. Security will verify the DOB on this pass ({rsvp.birthDate}) against your physical government photo ID. No screenshots or photocopies.
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4">
                <strong className="text-fuchsia-400 block mb-1 uppercase">2. Naturist Etiquette & Towel Covenant</strong>
                <p className="text-zinc-400 mb-1">Comfort Choice: <strong className="text-white uppercase">{rsvp.comfortLevel?.replace(/_/g, ' ') || 'Clothing Optional'}</strong></p>
                <p className="text-zinc-400 mb-1">Camera Policy: <strong className="text-amber-400">Strict Zero Photography / Tamper Seals Applied</strong></p>
                <p className="text-zinc-400">Towel Policy: <strong className="text-indigo-300">Must sit on clean towel on all shared seating</strong></p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4">
                <strong className="text-indigo-400 block mb-1 uppercase">3. Emergency Contact Protocol</strong>
                <p className="text-zinc-400">Designated Contact: <strong className="text-white">{rsvp.emergencyContactName}</strong></p>
                <p className="text-zinc-400">Emergency Phone: <strong className="text-white">{rsvp.emergencyContactPhone}</strong></p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] uppercase tracking-wider">Enthusiastic Verbal Consent Mandatory. Zero Tolerance Harassment Policy.</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-800 text-center">
              <button
                onClick={() => setIsFlipped(false)}
                className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-zinc-200 font-bold uppercase tracking-widest text-xs transition border border-zinc-800"
              >
                RETURN TO FRONT OF PASS
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pass Actions Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleDownloadPass}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs transition shadow-lg shadow-indigo-600/20"
        >
          {downloadSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          <span>{downloadSuccess ? 'Pass Saved' : 'Download Pass'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase tracking-widest text-xs border border-zinc-800 shadow-sm transition"
        >
          <Share2 className="w-4 h-4 text-indigo-400" />
          <span>Share Pass</span>
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold uppercase tracking-widest text-xs border border-zinc-800 shadow-sm transition"
        >
          <RotateCw className="w-4 h-4 text-indigo-400" />
          <span>{isFlipped ? 'Show QR Matrix' : 'House Rules'}</span>
        </button>

        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-3 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider transition"
          >
            Edit RSVP
          </button>
        )}
      </div>
    </div>
  );
};
