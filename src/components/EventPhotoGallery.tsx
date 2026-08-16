import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  Flame, 
  Play, 
  Pause, 
  ArrowRight,
  Eye,
  SlidersHorizontal,
  Grid,
  Layers
} from 'lucide-react';
import { DestinationCity } from '../types';
import { RunwayStageBackdrop } from './RunwayStageBackdrop';

export interface EventPhoto {
  id: string;
  title: string;
  category: 'runway' | 'vip_lounge' | 'limo_transit' | 'bachelor' | 'atmosphere';
  categoryLabel: string;
  imageUrl?: string;
  useRunwayBackdrop?: boolean;
  location: string;
  eventDate: string;
  guestReview: string;
  guestName: string;
  guestType: string;
  rating: number;
  tags: string[];
  attendeesCount: string;
}

interface EventPhotoGalleryProps {
  city: DestinationCity;
  onOpenBooking: (packageId?: any) => void;
  onOpenHostChat?: () => void;
}

export const EVENT_PHOTOS: EventPhoto[] = [
  {
    id: 'photo-1',
    title: 'Mainstage Catwalk Runway & Numbered Score Card Auction',
    category: 'runway',
    categoryLabel: 'Runway & Catwalk Stages',
    useRunwayBackdrop: true,
    location: 'Main Runway Arena, Little Darlings',
    eventDate: 'Last Weekend',
    guestReview: 'The runway score card countdown was unmatched! Front-row booth with bottle service gave our group the best view in the entire club.',
    guestName: 'Marcus T. & Bachelor Crew',
    guestType: 'Platinum VIP Table Guest',
    rating: 5.0,
    tags: ['Catwalk Stage', 'Auction Cards', 'Front Row VIP', 'Nightclub Arena'],
    attendeesCount: '850+ In Attendance'
  },
  {
    id: 'photo-2',
    title: 'Ultra-VIP Stage-Front Leather Booths & Bottle Service',
    category: 'vip_lounge',
    categoryLabel: 'VIP Bottle & Booth Lounges',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    location: 'Mezzanine Penthouse Lounge',
    eventDate: 'Friday Midnight Showcase',
    guestReview: 'Dedicated host met us at the curb, bypassed the 200-person general admission line completely, and escorted us to our reserved leather section.',
    guestName: 'Julian R. & Executive Group',
    guestType: 'Diamond Private Penthouse Guest',
    rating: 5.0,
    tags: ['Leather Booths', 'Premium Mixers', 'Dedicated Hostess', 'Zero Line Wait'],
    attendeesCount: 'Exclusive 12 Guests'
  },
  {
    id: 'photo-3',
    title: 'Complimentary Mercedes Sprinter & Escalade VIP Pickup Fleet',
    category: 'limo_transit',
    categoryLabel: 'Party Bus & VIP Transit Arrivals',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    location: 'Hotel Strip Curbside VIP Dispatch',
    eventDate: 'Daily Continuous Service',
    guestReview: 'The luxury Escalade pulled up right at our hotel valet on time. Chilled beverages and music ready before we even walked through the club doors.',
    guestName: 'Derek S.',
    guestType: 'Free VIP Transfer Passenger',
    rating: 5.0,
    tags: ['Hotel Door-to-Door', 'Champagne Chiller', 'Complimentary Ride', 'Discreet Transit'],
    attendeesCount: 'Up to 24 Passengers'
  },
  {
    id: 'photo-4',
    title: 'Bachelor Party Stage Initiation & Celebration Rituals',
    category: 'bachelor',
    categoryLabel: 'Bachelor & Celebrity Parties',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    location: 'Main Stage Spotlight Podium',
    eventDate: 'Saturday Night Prime',
    guestReview: 'We got our groom-to-be brought onto the main stage with custom shoutouts and performer serenades. Best bachelor send-off imaginable.',
    guestName: 'Tyler & 9 Groomsmen',
    guestType: 'Gold Bachelor VIP Package',
    rating: 5.0,
    tags: ['Bachelor Roast', 'Stage Spotlight', 'Group Shots', 'Free Souvenir T-Shirts'],
    attendeesCount: '10 Groomsmen'
  },
  {
    id: 'photo-5',
    title: 'Nightclub Laser Spectacle, Laser Canopy & DJ Euphoria',
    category: 'atmosphere',
    categoryLabel: 'Crowd Euphoria & Atmosphere',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    location: 'Atmosphere Soundstage',
    eventDate: 'Weekend Peak Hours (1:00 AM - 4:00 AM)',
    guestReview: 'The energy, high-powered multi-color lasers, and acoustic sound system made it feel like an elite festival combined with world-class cabaret.',
    guestName: 'Christian V.',
    guestType: 'VIP All-Access Weekend Pass',
    rating: 5.0,
    tags: ['Laser Canopies', 'Club Acoustics', 'High-Energy DJ', 'Peak Midnight Hours'],
    attendeesCount: '1,200+ Partygoers'
  },
  {
    id: 'photo-6',
    title: 'Champagne Sparkler Parade & Velvet Rope Escort',
    category: 'vip_lounge',
    categoryLabel: 'VIP Bottle & Booth Lounges',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    location: 'Velvet Rope Ring & Owner Cabana',
    eventDate: 'Sunday Afterhours Special',
    guestReview: 'The sparkler train and bottle presentation had the whole venue looking at our table. Unbelievable attention to detail from the host team.',
    guestName: 'Alex & Sophia B.',
    guestType: 'Birthday & Anniversary VIP',
    rating: 5.0,
    tags: ['Sparkler Train', 'Moët & Dom Pérignon', 'Hostess Escort', 'VIP Reserved Seating'],
    attendeesCount: 'Reserved Private Table'
  },
  {
    id: 'photo-7',
    title: '30-Passenger Luxury Party Bus with Dance Poles & High-Watt Audio',
    category: 'limo_transit',
    categoryLabel: 'Party Bus & VIP Transit Arrivals',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop',
    location: 'Party Bus Route to Little Darlings',
    eventDate: 'Every Weekend from 8:00 PM',
    guestReview: 'The pre-game on the party bus with dynamic LEDs and dance poles was practically a whole party before we even reached the venue. 10/10 service.',
    guestName: 'Brandon K. & Frat Reunion',
    guestType: 'Group Party Bus Pass',
    rating: 5.0,
    tags: ['Dance Poles', 'Club Lighting In-Transit', 'BYOB Coolers', 'Direct Club Entrance'],
    attendeesCount: '30 Guests Capacity'
  },
  {
    id: 'photo-8',
    title: 'Late-Night Intimate VIP Private Cabana Experiences',
    category: 'runway',
    categoryLabel: 'Runway & Catwalk Stages',
    useRunwayBackdrop: true,
    location: 'Runway Side Cabanas',
    eventDate: 'Thursday Ladies & Gents Night',
    guestReview: 'Private cabana right off the catwalk provided the ultimate mix of privacy and live stage energy. Seamless anonymous Bitcoin checkout as well.',
    guestName: 'Evan M.',
    guestType: 'Private Cabana Patron',
    rating: 5.0,
    tags: ['Runway Proximity', 'Plush Privacy Curtains', 'Personal Server', 'Top-Shelf BYOB'],
    attendeesCount: 'Private Section'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'runway', label: 'Catwalk & Runway Stages' },
  { id: 'vip_lounge', label: 'VIP Booths & Bottles' },
  { id: 'limo_transit', label: 'Party Buses & Transit' },
  { id: 'bachelor', label: 'Bachelor Celebrations' },
  { id: 'atmosphere', label: 'Nightclub Atmosphere' }
];

export const EventPhotoGallery: React.FC<EventPhotoGalleryProps> = ({
  city,
  onOpenBooking,
  onOpenHostChat
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [lightboxPhoto, setLightboxPhoto] = useState<EventPhoto | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({ 'photo-1': true, 'photo-2': true });

  const filteredPhotos = selectedCategory === 'all'
    ? EVENT_PHOTOS
    : EVENT_PHOTOS.filter(p => p.category === selectedCategory);

  // Auto-play interval for carousel mode
  useEffect(() => {
    if (!isAutoPlay || viewMode !== 'carousel' || filteredPhotos.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % filteredPhotos.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlay, viewMode, filteredPhotos.length]);

  // Adjust active slide if category filter shrinks the list
  useEffect(() => {
    if (activeSlide >= filteredPhotos.length) {
      setActiveSlide(0);
    }
  }, [selectedCategory, filteredPhotos.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLightboxNav = (direction: 'next' | 'prev') => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxPhoto.id);
    if (currentIndex === -1) return;

    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % filteredPhotos.length
      : (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;

    setLightboxPhoto(filteredPhotos[nextIndex]);
  };

  const currentPhoto = filteredPhotos[activeSlide] || filteredPhotos[0];

  return (
    <section id="event-gallery" className="py-20 bg-zinc-950 text-white relative overflow-hidden border-t border-b border-zinc-800/80">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-rose-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Header with Verified Social Proof Badges */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-rose-400" />
              <span>LIVE EVENT ARCHIVES & SOCIAL PROOF</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif uppercase tracking-tight text-white leading-tight">
              Real Parties. Real Guests. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-amber-200 bg-clip-text text-transparent">
                Uncensored VIP Memories
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-mono leading-relaxed">
              Explore authentic moments captured from past celebrations, bachelor blowouts, catwalk auctions, and luxury party bus arrivals in <strong className="text-amber-300">{city.name}</strong>.
            </p>
          </div>

          {/* Social Proof Stats Quick Panel */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0 font-mono text-xs">
            <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-white text-base">4.98 / 5.0</span>
              </div>
              <p className="text-zinc-400 text-[11px]">2,800+ VIP Reviews</p>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl">
              <div className="flex items-center gap-1 text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold text-white text-base">100%</span>
              </div>
              <p className="text-zinc-400 text-[11px]">Guaranteed Entry</p>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1 text-rose-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="font-bold text-white text-base">14,500+</span>
              </div>
              <p className="text-zinc-400 text-[11px]">Guests Hosted</p>
            </div>
          </div>
        </div>

        {/* Filter Bar & View Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveSlide(0);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                      : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && <span className="text-[10px] opacity-80">({filteredPhotos.length})</span>}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle & Autoplay Switch */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 font-mono text-xs">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-1 flex items-center">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  viewMode === 'carousel'
                    ? 'bg-zinc-800 text-amber-300 font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Interactive Carousel View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Carousel</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-amber-300 font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Full Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Grid ({filteredPhotos.length})</span>
              </button>
            </div>

            {viewMode === 'carousel' && (
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`p-2 rounded-xl border transition ${
                  isAutoPlay
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
                title={isAutoPlay ? 'Pause Carousel Auto-play' : 'Resume Carousel Auto-play'}
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* CAROUSEL VIEW */}
        {viewMode === 'carousel' && currentPhoto && (
          <div className="space-y-6">
            <div 
              className="relative w-full rounded-3xl overflow-hidden border-2 border-zinc-800 bg-zinc-900/90 shadow-2xl group transition"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              {/* Main Photo / Stage Canvas Display */}
              <div 
                className="relative w-full h-[360px] sm:h-[480px] md:h-[560px] cursor-pointer overflow-hidden bg-black flex items-center justify-center"
                onClick={() => setLightboxPhoto(currentPhoto)}
              >
                {currentPhoto.useRunwayBackdrop ? (
                  <div className="w-full h-full relative">
                    <RunwayStageBackdrop className="w-full h-full object-cover scale-100 group-hover:scale-105 transition duration-700" overlayOpacity="opacity-95" />
                  </div>
                ) : (
                  <img
                    src={currentPhoto.imageUrl}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                )}

                {/* Ambient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-amber-400 text-black text-xs font-mono font-black uppercase rounded-lg shadow-lg">
                      {currentPhoto.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold rounded-lg border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Event Photo
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      onClick={(e) => toggleLike(currentPhoto.id, e)}
                      className={`p-2.5 rounded-xl backdrop-blur-md border transition ${
                        likedPhotos[currentPhoto.id]
                          ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30'
                          : 'bg-black/60 text-zinc-300 border-zinc-700 hover:text-rose-400'
                      }`}
                      title="Favorite Photo"
                    >
                      <Heart className={`w-4 h-4 ${likedPhotos[currentPhoto.id] ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => setLightboxPhoto(currentPhoto)}
                      className="p-2.5 rounded-xl bg-black/60 text-zinc-300 border border-zinc-700 hover:text-amber-400 backdrop-blur-md transition"
                      title="Expand to Fullscreen Lightbox"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Photo Metadata & Testimonial Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-left bg-zinc-950/85 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                          <MapPin className="w-3.5 h-3.5" />
                          {currentPhoto.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {currentPhoto.eventDate}
                        </span>
                        <span>•</span>
                        <span className="text-zinc-300">{currentPhoto.attendeesCount}</span>
                      </div>

                      <h3 className="text-lg sm:text-2xl font-black font-serif text-white uppercase tracking-tight">
                        {currentPhoto.title}
                      </h3>

                      {/* Guest Quote */}
                      <p className="text-xs sm:text-sm text-zinc-300 italic font-mono leading-relaxed border-l-2 border-amber-400 pl-3 py-0.5">
                        "{currentPhoto.guestReview}"
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs font-mono font-bold text-white">
                          — {currentPhoto.guestName}
                        </span>
                        <span className="text-[11px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {currentPhoto.guestType}
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-400 ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking('gold_bachelor');
                        }}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-mono text-xs font-black uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Reserve Similar VIP Pass</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxPhoto(currentPhoto);
                        }}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs font-bold uppercase rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View High-Res Details</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Carousel Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevSlide();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-700 backdrop-blur-md transition opacity-80 hover:opacity-100 hover:scale-110 z-20"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextSlide();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-700 backdrop-blur-md transition opacity-80 hover:opacity-100 hover:scale-110 z-20"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Track & Thumbnails Strip */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800/80">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {filteredPhotos.map((photo, index) => {
                    const isSelected = index === activeSlide;
                    return (
                      <button
                        key={photo.id}
                        onClick={() => setActiveSlide(index)}
                        className={`relative w-24 sm:w-28 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition duration-300 text-left ${
                          isSelected
                            ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20 ring-2 ring-amber-400/40'
                            : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                        }`}
                      >
                        {photo.useRunwayBackdrop ? (
                          <div className="w-full h-full bg-zinc-900">
                            <RunwayStageBackdrop className="w-full h-full object-cover" overlayOpacity="opacity-90" />
                          </div>
                        ) : (
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-zinc-300 rounded truncate max-w-[90%]">
                          #{index + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                className="bg-zinc-900/90 border border-zinc-800 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-xl group transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
              >
                {/* Photo Thumbnail */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-black">
                  {photo.useRunwayBackdrop ? (
                    <div className="w-full h-full">
                      <RunwayStageBackdrop className="w-full h-full object-cover group-hover:scale-105 transition duration-500" overlayOpacity="opacity-90" />
                    </div>
                  ) : (
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40 pointer-events-none" />

                  {/* Top Category Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-400 text-black text-[10px] font-mono font-black uppercase rounded-lg shadow">
                    {photo.categoryLabel}
                  </span>

                  {/* Like Button */}
                  <button
                    onClick={(e) => toggleLike(photo.id, e)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition ${
                      likedPhotos[photo.id]
                        ? 'bg-rose-500 text-white border-rose-400'
                        : 'bg-black/60 text-zinc-300 border-zinc-700 hover:text-rose-400'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedPhotos[photo.id] ? 'fill-current' : ''}`} />
                  </button>

                  <span className="absolute bottom-3 left-3 text-[11px] font-mono text-zinc-300 flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded border border-zinc-700">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {photo.location}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 font-mono">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>{photo.eventDate}</span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-base font-black font-serif text-white uppercase group-hover:text-amber-300 transition">
                      {photo.title}
                    </h3>

                    <p className="text-xs text-zinc-300 italic line-clamp-2 leading-relaxed">
                      "{photo.guestReview}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white text-[11px] truncate max-w-[150px]">{photo.guestName}</p>
                      <p className="text-[10px] text-amber-400/80">{photo.guestType}</p>
                    </div>

                    <span className="text-[11px] text-rose-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Social Proof Verification Banner */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-500/40">
                100% DISCRETION POLICY
              </span>
              <span className="text-xs text-zinc-400">● Zero Private Cameras Allowed Inside Cabins</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white font-serif uppercase tracking-tight">
              Want Front-Row Catwalk Access for Your Group in {city.name}?
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Book online to lock in reserved leather seating, complimentary vehicle pickup from any hotel or address, and zero wait time at the velvet ropes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onOpenBooking('gold_bachelor')}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-mono text-xs font-black uppercase rounded-2xl transition shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book VIP Pass Now</span>
            </button>
            {onOpenHostChat && (
              <button
                onClick={onOpenHostChat}
                className="px-5 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700 font-mono text-xs font-bold uppercase rounded-2xl transition flex items-center justify-center gap-2"
              >
                <span>Chat with VIP Host</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setLightboxPhoto(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-zinc-900 border-2 border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/80 hover:bg-black text-zinc-300 hover:text-white border border-zinc-700 transition"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Navigation Arrows */}
            <button
              onClick={() => handleLightboxNav('prev')}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-700 transition"
              aria-label="Previous Lightbox Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleLightboxNav('next')}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-700 transition"
              aria-label="Next Lightbox Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Main Image Area */}
              <div className="lg:col-span-8 relative h-[320px] sm:h-[450px] lg:h-[580px] bg-black flex items-center justify-center overflow-hidden">
                {lightboxPhoto.useRunwayBackdrop ? (
                  <div className="w-full h-full">
                    <RunwayStageBackdrop className="w-full h-full object-cover" overlayOpacity="opacity-95" />
                  </div>
                ) : (
                  <img
                    src={lightboxPhoto.imageUrl}
                    alt={lightboxPhoto.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                <span className="absolute bottom-4 left-4 px-3 py-1 bg-amber-400 text-black text-xs font-mono font-black uppercase rounded-lg shadow">
                  {lightboxPhoto.categoryLabel}
                </span>
              </div>

              {/* Sidebar Metadata & Guest Review */}
              <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 font-mono bg-zinc-950">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/30">
                      VERIFIED GUEST REVIEW
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400 ml-auto">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-black font-serif text-white uppercase tracking-tight leading-snug">
                    {lightboxPhoto.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-zinc-400">
                    <p className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{lightboxPhoto.location}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{lightboxPhoto.eventDate}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-zinc-400">
                      <Users className="w-3.5 h-3.5" />
                      <span>{lightboxPhoto.attendeesCount}</span>
                    </p>
                  </div>

                  {/* Review Quote Block */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
                    <p className="text-xs text-zinc-300 italic leading-relaxed">
                      "{lightboxPhoto.guestReview}"
                    </p>
                    <div className="pt-2 border-t border-zinc-800">
                      <p className="text-xs font-bold text-white">{lightboxPhoto.guestName}</p>
                      <p className="text-[10px] text-amber-400">{lightboxPhoto.guestType}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {lightboxPhoto.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] rounded border border-zinc-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lightbox CTA */}
                <div className="space-y-2 pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      setLightboxPhoto(null);
                      onOpenBooking('gold_bachelor');
                    }}
                    className="w-full py-3 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black font-mono text-xs font-black uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Book Similar VIP Experience</span>
                  </button>
                  <p className="text-[10px] text-zinc-500 text-center">
                    Complimentary VIP pickup & reserved seating included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
