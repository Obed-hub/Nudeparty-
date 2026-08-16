import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Car, Wine, Sparkles } from 'lucide-react';
import { DestinationCity } from '../types';

interface VegasVenueFaqProps {
  city: DestinationCity;
}

export const VegasVenueFaq: React.FC<VegasVenueFaqProps> = ({ city }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: `What is the legal age requirement to enter venues in ${city.name}?`,
      a: `In ${city.name} (${city.country}), the legal minimum age is strictly ${city.minLegalAge}+ years old. All guests MUST present a valid, unexpired physical government photo ID (Driver's License, State ID, Military ID, or Passport). Digital photos of IDs or student cards are strictly prohibited.`
    },
    {
      q: `How does the Free Luxury Pickup work in ${city.name}?`,
      a: `When you book any VIP package, complimentary vehicle/chauffeur transit from your hotel or resort is included at $0 extra charge. Your driver texts you 15-20 minutes before pickup, meets your squad at the main valet, and provides front-of-line dropoff at the VIP side door.`
    },
    {
      q: `What is the alcohol and bottle policy in ${city.name}?`,
      a: city.byobAllowed
        ? `In ${city.name}, adult cabarets operate under a BYOB (Bring Your Own Bottle) policy! You can bring your own sealed liquor, champagne, wine, and beer. Your driver can stop at a retail beverage store on the way. Unlimited ice buckets, glassware, and mixers are provided at your VIP table.`
        : `In ${city.name}, premier venues offer full VIP bottle service, premium spirits, craft cocktails, and exotic hookah tables with dedicated VIP hostesses serving your booth throughout the evening.`
    },
    {
      q: `What is the dress code?`,
      a: `Dress to impress! Upscale casual or nightlife attire is encouraged. Collared shirts, button-downs, polo shirts, clean fitted jeans, and clean shoes are ideal. Avoid athletic sweatpants, gym shorts, torn tank tops, or steel-toed work boots.`
    },
    {
      q: `Are photos or videos allowed inside the club?`,
      a: `To protect the privacy of all entertainers, guests, and VIP celebrities, cell phone photography and video recording are strictly prohibited inside the main showroom and private VIP suites. You may check your phone with our security concierge or keep it tucked away.`
    },
    {
      q: `How much are tickets and how do I pay?`,
      a: `Tickets are strictly $50 per person (Every Friday). To protect total guest and entertainer anonymity and privacy, all tickets MUST be paid via Bitcoin (BTC) in advance before receiving your digital passes. No payment (no cash, no credit cards) is accepted at the gate under any circumstances. Once Bitcoin is verified, your passes and private venue address are sent directly to your email.`
    },
    {
      q: `How do I contact support or ask questions before booking?`,
      a: `In case of any questions or requests for information, please message our WhatsApp concierge at +1 (385) 260-0342 (Messages Only) or send an email to joinsexcompany@gmail.com. Our VIP host team monitors all channels 24/7 and responds immediately.`
    },
    {
      q: `Can I pay at the gate or door?`,
      a: `No. There is strictly NO payment accepted at the gate. All attendees must have a valid, pre-paid Bitcoin QR pass prior to boarding the free VIP party bus or arriving at the door.`
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-zinc-950 text-white border-t border-zinc-800 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>VIP ADMISSIONS & FAQ • {city.name.toUpperCase()}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-serif tracking-tight">
            FREQUENTLY ASKED <span className="text-amber-400">QUESTIONS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 font-mono">
            Everything you need to know about bookings, free pickups, and venue policies in {city.name}.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-mono text-sm font-bold text-white hover:text-amber-300 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-zinc-800/60 text-xs font-mono text-zinc-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
