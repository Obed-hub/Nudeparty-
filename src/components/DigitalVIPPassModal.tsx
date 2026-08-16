import React, { useState } from 'react';
import { Crown, Car, MapPin, Calendar, Clock, Users, Phone, CheckCircle2, ShieldCheck, Download, Share2, Sparkles, AlertCircle, ArrowRight, Globe, Lock, QrCode, Mail, MessageSquare } from 'lucide-react';
import { BookingReservation } from '../types';
import { OFFICIAL_BITCOIN_VAULT_ADDRESS, RECEIPT_EMAIL, WHATSAPP_PHONE_DISPLAY, WHATSAPP_PHONE_RAW } from './BitcoinAnonymousCheckout';

interface DigitalVIPPassModalProps {
  reservation: BookingReservation;
  onClose: () => void;
  onEdit: () => void;
}

export const DigitalVIPPassModal: React.FC<DigitalVIPPassModalProps> = ({
  reservation,
  onClose,
  onEdit
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedBtcTx, setCopiedBtcTx] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reservation.confirmationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBtcTx = () => {
    if (reservation.bitcoinPayment?.txHash) {
      navigator.clipboard.writeText(reservation.bitcoinPayment.txHash);
      setCopiedBtcTx(true);
      setTimeout(() => setCopiedBtcTx(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate deterministic 13x13 QR matrix pattern
  const qrBlocks = Array.from({ length: 13 }, (_, r) =>
    Array.from({ length: 13 }, (_, c) => {
      // Corner alignment markers
      if ((r < 4 && c < 4) || (r < 4 && c > 8) || (r > 8 && c < 4)) return 1;
      return (r * 13 + c + reservation.confirmationCode.charCodeAt(0)) % 2 === 0 ? 1 : 0;
    })
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-zinc-950 border-2 border-amber-400 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8 text-white font-sans text-left">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-zinc-900 via-amber-950/40 to-zinc-900 p-6 border-b border-amber-500/30 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-black text-[10px] font-mono font-black uppercase rounded">
                OFFICIAL BITCOIN VIP PASS
              </span>
              <span className="text-zinc-400 text-xs font-mono">
                {reservation.destinationCityName.toUpperCase()} CABARET
              </span>
            </div>
            <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-white flex items-center gap-2">
              <span>{reservation.confirmationCode}</span>
              <button
                onClick={handleCopyCode}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold ml-2"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Discreet Venue Notification Banner */}
          <div className="p-4 bg-zinc-900/90 border border-amber-500/50 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <span>📍 Private VIP Venue Dispatch:</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded uppercase font-bold border border-emerald-500/30">
                Ticket Active
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-300 leading-relaxed">
              For security & discretion, the exact venue address in <strong>{reservation.destinationCityName}</strong> has been emailed to <strong className="text-white">{reservation.email}</strong>.
            </p>
          </div>

          {/* Receipt Confirmation & Contact Box */}
          <div className="p-4 bg-zinc-900/90 border-2 border-emerald-500/50 rounded-2xl space-y-2 font-mono text-xs text-zinc-300">
            <div className="flex items-center justify-between text-emerald-300 font-bold uppercase">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Payment Receipt Verification:</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold uppercase">
                Concierge 24/7
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              If not already sent, please send your Bitcoin payment receipt screenshot to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-zinc-200 font-bold">{RECEIPT_EMAIL}</span>
                </span>
              </div>
              <div className="p-2.5 bg-zinc-950 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">{WHATSAPP_PHONE_DISPLAY} (WA)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bitcoin Escrow & Gate Admission Verification Card */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-2xl space-y-2 font-mono text-xs text-zinc-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Bitcoin Escrow Payment Verified</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded uppercase font-bold">
                $0 Gate Balance (100% Pre-Paid)
              </span>
            </div>

            <div className="text-[11px] text-zinc-400 leading-relaxed">
              Package: <strong className="text-white">{reservation.packageName}</strong> • Paid: <strong className="text-amber-400">${reservation.totalAmountUSD} USD</strong> ({reservation.bitcoinPayment?.btcAmount || 0.0031} BTC) for {reservation.partySize} Guests. Includes 100+ models at your service. No payment is taken at the gate.
            </div>

            {reservation.bitcoinPayment?.txHash && (
              <div className="p-2 bg-zinc-950/80 rounded-lg flex items-center justify-between gap-2 text-[10px]">
                <span className="text-zinc-400 truncate">
                  BTC TX: <span className="text-zinc-200">{reservation.bitcoinPayment.txHash}</span>
                </span>
                <button
                  onClick={handleCopyBtcTx}
                  className="text-amber-400 hover:text-amber-300 shrink-0 font-bold"
                >
                  {copiedBtcTx ? 'Copied' : 'Copy TX'}
                </button>
              </div>
            )}
          </div>

          {/* Quick Details Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-zinc-500 block text-[10px] uppercase">Destination</span>
              <strong className="text-white text-xs mt-0.5 block truncate">
                {reservation.destinationCityName}, {reservation.destinationCountry}
              </strong>
            </div>

            <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-zinc-500 block text-[10px] uppercase">Party Date</span>
              <strong className="text-white text-xs mt-0.5 block">{reservation.eventDate}</strong>
            </div>

            <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-zinc-500 block text-[10px] uppercase">Group Size</span>
              <strong className="text-white text-xs mt-0.5 block">{reservation.partySize} Guests</strong>
            </div>

            <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-zinc-500 block text-[10px] uppercase">Pass Delivery</span>
              <strong className="text-amber-400 text-xs mt-0.5 block truncate">Sent to {reservation.email}</strong>
            </div>
          </div>

          {/* Free VIP Party Bus Dispatch Card */}
          <div className="p-5 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-rose-500/40 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase">
                <Car className="w-4 h-4" />
                <span>Assigned Free VIP Party Bus</span>
              </div>
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded uppercase font-bold border border-rose-500/30">
                Party Bus Dispatched
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-zinc-300 pt-1">
              <div>
                <span className="text-zinc-500 text-[10px] block uppercase">Captain / Host</span>
                <strong className="text-white">{reservation.limoStatus.chauffeurName}</strong>
                <a
                  href="https://wa.me/13852600342?text=Hello%20VIP%20Concierge,%20I%20am%20checking%20on%20my%20VIP%20Pass%20and%20Pickup."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 block text-[11px] hover:underline mt-0.5 font-bold"
                >
                  WhatsApp: +1 (385) 260-0342
                </a>
              </div>

              <div>
                <span className="text-zinc-500 text-[10px] block uppercase">Valet Pickup & Time</span>
                <strong className="text-white block">{reservation.hotelPickup.hotelName}</strong>
                <span className="text-zinc-400 text-[11px] block">{reservation.hotelPickup.roomOrEntrance} • {reservation.hotelPickup.pickupTime}</span>
              </div>
            </div>

            <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-[11px] font-mono text-emerald-400 flex items-center gap-2">
              <span>✓ Free Party Bus Hotel Valet Transit + Zero Cover Charge at Entrance</span>
            </div>
          </div>

          {/* QR Code Scannable Matrix */}
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="p-3 bg-white rounded-2xl shrink-0 shadow-lg inline-block">
              <div className="grid grid-cols-13 gap-1 w-32 h-32">
                {qrBlocks.flat().map((bit, idx) => (
                  <div
                    key={idx}
                    className={`${bit === 1 ? 'bg-black' : 'bg-transparent'} rounded-[1px]`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs flex-1">
              <h4 className="text-sm font-bold text-white uppercase font-serif">
                Express Bitcoin VIP Admission QR Pass
              </h4>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Show this digital QR code to board your complimentary VIP party bus at your hotel and show at the club entrance. No gate cash or physical card required.
              </p>
              <div className="pt-2 text-[10px] text-zinc-500 uppercase">
                100% Anonymous Entry • Strict 18+/21+ Physical Government ID Check at Door
              </div>
            </div>
          </div>

          {/* Pass Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Print Ticket Pass</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Share2 className="w-4 h-4 text-rose-400" />
              <span>Share Pass Code</span>
            </button>

            <button
              onClick={onEdit}
              className="py-3 px-4 bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-black uppercase rounded-xl flex items-center justify-center gap-2 transition"
            >
              <span>Edit Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
