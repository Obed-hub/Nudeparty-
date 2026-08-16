import React, { useState } from 'react';
import { SAFETY_AND_HOUSE_RULES } from '../data/partyData';
import { 
  ShieldCheck, 
  MapPin, 
  Car, 
  HeartHandshake, 
  Droplets, 
  PhoneCall, 
  Sparkles, 
  Shirt, 
  Check, 
  AlertTriangle, 
  Clock, 
  HelpCircle 
} from 'lucide-react';

export const VenueGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is nudity mandatory or is clothing optional?',
      a: 'The party is clothing-optional and body-positive. You are free to be fully nude, wear swimwear/underwear, body paint, rave accessories, or stay comfortably clothed. We celebrate body positivity in an inclusive, non-judgmental atmosphere. Everyone\'s personal comfort level is honored.'
    },
    {
      q: 'What is the strict zero-photography and phone camera policy?',
      a: 'To guarantee absolute privacy and comfort for all guests, tamper-evident security stickers are placed over all front and rear cameras at the entrance. Unsealing camera stickers or attempting to take photos/videos will result in immediate permanent ejection.'
    },
    {
      q: 'What is the towel and hygiene policy?',
      a: 'For personal and shared hygiene, every guest is required to sit on a clean towel whenever sitting on chairs, couches, or benches. You may bring your own towel or rent a sanitized plush towel from the venue locker desk. Footwear (sneakers, slides) is required on all dancefloors.'
    },
    {
      q: 'Are secure lockers and changing rooms available?',
      a: 'Yes, we provide staffed and monitored changing areas with electronic pin-code lockers for bags, personal clothes, and valuables. Lockers are included with VIP/Backstage passes and available as an add-on for GA.'
    },
    {
      q: 'What is the consent and anti-harassment policy?',
      a: 'Consent is non-negotiable, continuous, and enthusiastic. Looking is fine, but staring or unwelcome advances are not tolerated. Keep your hands to yourself—touching requires explicit verbal consent. Dedicated Consent Ambassadors and security patrol the space.'
    },
    {
      q: 'What types of ID are acceptable for 18+ age verification?',
      a: 'Acceptable physical IDs include: Valid Government-issued Driver\'s License, State/Provincial Photo ID card, or Passport. School IDs, gym cards, and digital screenshots are NOT accepted. Your birthdate must verify that you are at least 18 years old.'
    }
  ];

  return (
    <section id="venue-section" className="py-16 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>05. PROTOCOLS & VENUE DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Venue, Access & FAQ Guide</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Operational guidelines covering 18+ age verification, arrival logistics, and house policies.
          </p>
        </div>

        {/* 2-Column Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Venue & Transportation Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="w-10 h-10 bg-zinc-950 border border-indigo-500/50 flex items-center justify-center rotate-45 shrink-0">
                <MapPin className="w-4 h-4 text-indigo-400 -rotate-45" />
              </div>
              <div>
                <h3 className="font-black text-base text-white uppercase tracking-wide">Warehouse Matrix & Courtyard</h3>
                <span className="text-xs text-zinc-400 font-mono">440 METRO BLVD • ARTS DISTRICT</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-3 bg-zinc-950 p-4 border border-zinc-800">
                <Car className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block uppercase tracking-wider mb-0.5">Ride-Share & Transit Hub</strong>
                  <span className="text-zinc-400 font-mono text-[11px] leading-relaxed block">
                    Designated Uber/Lyft drop-off at Gate 2. Covered waiting bay with security and device charging stations open 24/7.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-950 p-4 border border-zinc-800">
                <Clock className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block uppercase tracking-wider mb-0.5">Turnstiles Open: 21:00 Sharp</strong>
                  <span className="text-zinc-400 font-mono text-[11px] leading-relaxed block">
                    Peak headline sets begin at 23:30. Early arrivals before 22:30 receive expedited lane access and welcome tokens.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-zinc-950 p-4 border border-zinc-800">
                <Shirt className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block uppercase tracking-wider mb-0.5">Locker Suites & Changing Oasis</strong>
                  <span className="text-zinc-400 font-mono text-[11px] leading-relaxed block">
                    Private changing cabins, secure pin-code lockers for bags and clothes, and towel rental desk. Free locker token with all passes.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety & Harm Reduction Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="w-10 h-10 bg-zinc-950 border border-indigo-500/50 flex items-center justify-center rotate-45 shrink-0">
                <ShieldCheck className="w-4 h-4 text-indigo-400 -rotate-45" />
              </div>
              <div>
                <h3 className="font-black text-base text-white uppercase tracking-wide">18+ Security & Welfare Protocols</h3>
                <span className="text-xs text-zinc-400 font-mono">ZERO TOLERANCE • SAFE SPACE ENFORCED</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              {SAFETY_AND_HOUSE_RULES.map((rule, idx) => (
                <div key={idx} className="bg-zinc-950 p-4 border border-zinc-800">
                  <span className="font-bold text-white uppercase tracking-wider block mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rotate-45" />
                    {rule.title}
                  </span>
                  <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">{rule.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6 text-sm font-black uppercase tracking-wider text-white">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Frequently Addressed Inquiries (FAQ)</span>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-zinc-950 border border-zinc-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-white hover:text-indigo-400 transition"
                  >
                    <span>{faq.q}</span>
                    <span className="text-zinc-500 font-mono text-sm">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-zinc-400 font-mono leading-relaxed border-t border-zinc-900 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
