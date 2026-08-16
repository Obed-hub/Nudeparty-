import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Sparkles, 
  Car, 
  Lock, 
  Calendar, 
  MapPin, 
  Users, 
  HeartHandshake,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { DestinationCity, VIPPackageId } from '../types';

interface VerifiedTestimonialsSectionProps {
  city: DestinationCity;
  onOpenBooking: (packageId?: VIPPackageId) => void;
  onOpenHostChat?: () => void;
}

interface Testimonial {
  id: string;
  author: string;
  cityOrigin: string;
  eventCity: string;
  avatarColor: string;
  avatarInitials: string;
  packageType: string;
  packageId: VIPPackageId;
  category: 'bachelor' | 'ladies' | 'couples' | 'limo' | 'crypto';
  categoryLabel: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  verifiedBadge: string;
  helpfulCount: number;
  highlights: string[];
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'rev-1',
    author: 'Marcus Thornton & 8 Groomsmen',
    cityOrigin: 'Los Angeles, CA',
    eventCity: 'Las Vegas, NV',
    avatarColor: 'from-amber-400 to-amber-600',
    avatarInitials: 'MT',
    packageType: 'Gold Bachelor VIP Ritual',
    packageId: 'gold_bachelor',
    category: 'bachelor',
    categoryLabel: 'Bachelor Parties',
    rating: 5.0,
    date: '3 days ago',
    title: 'Unbelievable bachelor send-off — runway auction was insane!',
    review: 'Booked the Gold Bachelor package for our group of 9. The luxury vehicle picked us up right outside our hotel valet without any delay. We skipped a 150-person line at the velvet ropes and walked directly into our leather booth. Getting our bachelor up on the catwalk runway with custom shoutouts made the whole trip.',
    verifiedBadge: 'Verified Bachelor Package Guest',
    helpfulCount: 47,
    highlights: ['Zero Line Wait', 'Stage-Front Booth', 'Curbside VIP Transit']
  },
  {
    id: 'rev-2',
    author: 'Brianna & Chloe (Bachelorette Crew)',
    cityOrigin: 'Dallas, TX',
    eventCity: 'Miami, FL',
    avatarColor: 'from-rose-500 to-pink-500',
    avatarInitials: 'BC',
    packageType: 'Champagne Suite & VIP Hostess',
    packageId: 'champagne_suite',
    category: 'ladies',
    categoryLabel: 'Ladies & Bachelorette',
    rating: 5.0,
    date: '1 week ago',
    title: 'The staff treated our bachelorette squad like royalty!',
    review: 'We were skeptical about booking online, but our host met us at the door, brought us directly to our reserved mezzanine cabana with chilled champagne and sparklers. Super safe, ultra-fun atmosphere, and the music kept the energy going all night.',
    verifiedBadge: 'Verified Bachelorette VIP',
    helpfulCount: 38,
    highlights: ['Host Concierge', 'Sparkler Bottle Service', 'Safe & Fun Vibe']
  },
  {
    id: 'rev-3',
    author: 'David & Sophia K.',
    cityOrigin: 'Chicago, IL',
    eventCity: 'Las Vegas, NV',
    avatarColor: 'from-purple-500 to-indigo-500',
    avatarInitials: 'DS',
    packageType: 'Couples Fantasy Stage-Front VIP',
    packageId: 'couples_fantasy',
    category: 'couples',
    categoryLabel: 'Couples & VIP Tables',
    rating: 5.0,
    date: '2 weeks ago',
    title: 'Perfect couples experience with complete discretion',
    review: 'My partner and I wanted to experience world-class cabaret together. The Couples Fantasy package gave us prime booth seating right along the main runway. Completely upscale, respectful performers, and zero waiting anywhere.',
    verifiedBadge: 'Verified Couples VIP Pass',
    helpfulCount: 29,
    highlights: ['Couples Friendly', 'Front-Row Seating', 'Top Discretion']
  },
  {
    id: 'rev-4',
    author: 'Alexander V.',
    cityOrigin: 'New York, NY',
    eventCity: 'Las Vegas, NV',
    avatarColor: 'from-emerald-400 to-teal-600',
    avatarInitials: 'AV',
    packageType: 'Baller Penthouse + Escalade Transit',
    packageId: 'baller_penthouse',
    category: 'crypto',
    categoryLabel: 'Bitcoin Checkout',
    rating: 5.0,
    date: '3 weeks ago',
    title: 'Anonymous Bitcoin payment was seamless and instant',
    review: 'Paid via BTC directly through the web app. Got our instant QR pass and WhatsApp dispatch confirmation in under 3 minutes. Chauffeur had our names on the private manifest and we entered with absolute privacy.',
    verifiedBadge: 'Verified Anonymous BTC Booking',
    helpfulCount: 54,
    highlights: ['100% Anonymous Crypto', 'Instant QR Pass', 'Private Chauffeur']
  },
  {
    id: 'rev-5',
    author: 'Jason R. & 14 Frat Alumni',
    cityOrigin: 'Denver, CO',
    eventCity: 'Scottsdale, AZ',
    avatarColor: 'from-orange-500 to-amber-500',
    avatarInitials: 'JR',
    packageType: '30-Passenger Luxury Party Bus VIP Pass & Service',
    packageId: 'silver_starter',
    category: 'limo',
    categoryLabel: 'Party Bus & Transit',
    rating: 5.0,
    date: 'Last month',
    title: 'Party bus alone was worth every single dollar',
    review: 'Our group of 14 was picked up in a luxury party bus equipped with dance poles, neon lasers, and incredible sound. We got to bring our own beverages (BYOB coolers provided) and arrived at the club hyped and ready. Host ushered us right in.',
    verifiedBadge: 'Verified Party Bus Passenger',
    helpfulCount: 42,
    highlights: ['Party Bus Sound & Lasers', 'BYOB Friendly', 'Group Velvet Rope Entry']
  },
  {
    id: 'rev-6',
    author: 'Christian M.',
    cityOrigin: 'Seattle, WA',
    eventCity: 'Las Vegas, NV',
    avatarColor: 'from-cyan-400 to-blue-600',
    avatarInitials: 'CM',
    packageType: 'Weekend All-Access VIP FastPass',
    packageId: 'weekend_all_access',
    category: 'bachelor',
    categoryLabel: 'Bachelor Parties',
    rating: 5.0,
    date: 'Last month',
    title: 'Best decision for our Las Vegas trip',
    review: 'Having this pass allowed us to walk straight past a massive line on a Saturday night. The VIP hostess made sure our ice and mixers were constantly replenished and we had the best view of the headline performances.',
    verifiedBadge: 'Verified All-Access Passholder',
    helpfulCount: 31,
    highlights: ['Line Bypass', 'Premium Mixers', 'Headline View']
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Verified Reviews' },
  { id: 'bachelor', label: 'Bachelor Celebrations' },
  { id: 'ladies', label: 'Ladies & Bachelorette' },
  { id: 'couples', label: 'Couples & VIP Tables' },
  { id: 'limo', label: 'Party Buses & Transit' },
  { id: 'crypto', label: 'Anonymous Bitcoin' }
];

export const VerifiedTestimonialsSection: React.FC<VerifiedTestimonialsSectionProps> = ({
  city,
  onOpenBooking,
  onOpenHostChat
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  const filteredReviews = selectedCategory === 'all'
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.filter(r => r.category === selectedCategory);

  const handleLike = (id: string, initialCount: number) => {
    if (userVoted[id]) return;
    setUserVoted(prev => ({ ...prev, [id]: true }));
    setHelpfulLikes(prev => ({ ...prev, [id]: (prev[id] || initialCount) + 1 }));
  };

  return (
    <section id="reviews-section" className="py-20 bg-zinc-950 text-white relative overflow-hidden border-b border-zinc-800/80 text-left">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Top Header & Trust Score Highlights */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% VERIFIED GUEST REVIEWS & SOCIAL PROOF</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif uppercase tracking-tight text-white leading-tight">
              Trusted by 14,000+ Guests. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-amber-200 bg-clip-text text-transparent">
                Rated 4.98 Out of 5.0 Stars
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-mono leading-relaxed">
              Read real feedback from bachelors, couples, bachelorettes, and VIP groups who booked party passes, luxury party buses, and stage-front seating in <strong className="text-amber-300">{city.name}</strong> and nationwide.
            </p>
          </div>

          {/* Social Proof Aggregate Scorecard */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/40 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-6 shrink-0 font-mono">
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-3xl sm:text-4xl font-black font-serif text-white">4.98</span>
                <span className="text-sm text-zinc-400">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-zinc-400">Based on 3,420+ Verified Bookings</p>
            </div>

            <div className="h-10 w-px bg-zinc-800 hidden sm:block" />

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>100% Entry Waived</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Car className="w-4 h-4 shrink-0" />
                <span>Free Pickup</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Total Discretion</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Zero Line Wait</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800 pb-5">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                    : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && <span className="text-[10px] opacity-80">({filteredReviews.length})</span>}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((item) => {
            const currentLikes = helpfulLikes[item.id] || item.helpfulCount;
            const hasVoted = userVoted[item.id];

            return (
              <div 
                key={item.id}
                className="bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-5 transition duration-300 hover:-translate-y-1 font-mono group"
              >
                {/* Header: Author + Star Rating + Verified Badge */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.avatarColor} p-0.5 shadow-md shrink-0 flex items-center justify-center`}>
                        <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center font-serif font-black text-amber-300 text-sm">
                          {item.avatarInitials}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-white font-serif tracking-tight truncate max-w-[160px]">
                          {item.author}
                        </h4>
                        <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{item.cityOrigin}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Verified Ticket Badge */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-800/80 text-[10px]">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {item.verifiedBadge}
                    </span>
                    <span className="text-zinc-400">{item.date}</span>
                  </div>

                  {/* Review Title & Body */}
                  <div className="space-y-2 pt-1">
                    <h5 className="text-sm font-bold text-amber-300 leading-snug">
                      "{item.title}"
                    </h5>
                    <p className="text-xs text-zinc-300 leading-relaxed italic">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Feature Highlights Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.highlights.map((h, hIdx) => (
                      <span 
                        key={hIdx}
                        className="px-2 py-0.5 bg-zinc-950 text-zinc-400 text-[10px] rounded-md border border-zinc-800 flex items-center gap-1"
                      >
                        <Check className="w-2.5 h-2.5 text-amber-400" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Package Link & Helpful Thumbs Up */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => onOpenBooking(item.packageId)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline truncate"
                    title={`Book ${item.packageType}`}
                  >
                    <span>{item.packageType}</span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </button>

                  <button
                    onClick={() => handleLike(item.id, item.helpfulCount)}
                    disabled={hasVoted}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition ${
                      hasVoted
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                        : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-700'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-current' : ''}`} />
                    <span>{currentLikes}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Social Proof & Direct Concierge Reservation Box */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase rounded border border-amber-400/30">
                100% RISK-FREE RESERVATIONS
              </span>
              <span className="text-xs text-zinc-400">● Lock in Your Spot in {city.name}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white font-serif uppercase tracking-tight">
              Ready to Experience Little Darlings VIP Treatment?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Every pass includes free pickup from your hotel or address, waived general admission cover, and reserved VIP seating.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto font-mono">
            <button
              onClick={() => onOpenBooking('gold_bachelor')}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black text-xs font-black uppercase rounded-2xl transition shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Your VIP Pass Now</span>
            </button>
            {onOpenHostChat && (
              <button
                onClick={onOpenHostChat}
                className="px-5 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700 text-xs font-bold uppercase rounded-2xl transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask VIP Concierge</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
