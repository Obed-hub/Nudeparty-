import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Film, 
  Flame, 
  Crown, 
  Heart, 
  Shuffle, 
  Maximize2, 
  Minimize2, 
  Tv, 
  CheckCircle2, 
  ExternalLink,
  Volume2
} from 'lucide-react';
import { DestinationCity } from '../types';

interface NightlifeVideoShowcaseProps {
  city: DestinationCity;
  onOpenBooking: () => void;
}

export interface YouTubeTeaser {
  id: string;
  youtubeId: string;
  title: string;
  tagline: string;
  category: string;
  badge: string;
  duration: string;
  views: string;
  description: string;
}

export const YOUTUBE_NIGHTLIFE_VIDEOS: YouTubeTeaser[] = [
  {
    id: 'yt-vegas-lights',
    youtubeId: '4NRXx6U8ABQ',
    title: 'Neon Nights & VIP Strip Atmosphere',
    tagline: 'High-energy neon lighting, stage choreography, laser shows & 100+ performers',
    category: 'VIP Stage Show',
    badge: '⚡ ULTRA NEON',
    duration: '3:20',
    views: '840K views',
    description: 'Immerse in late-night high-octane vibes, dazzling neon aesthetics, and front-row stage energy.'
  },
  {
    id: 'yt-masquerade',
    youtubeId: 'k2qgadSvNyU',
    title: 'VIP Masquerade & Ultra Cabaret Suite',
    tagline: 'Anonymous VIP booths, sparkler bottle service, private cabanas & glamour',
    category: 'Ultra Lounge',
    badge: '🎭 MASQUERADE',
    duration: '3:45',
    views: '1.2M views',
    description: 'Chic lounge interiors, masquerade mystery, and top-tier hospitality for your entire squad.'
  },
  {
    id: 'yt-partybus',
    youtubeId: 'OPf0YbXqDm0',
    title: 'Free Luxury VIP Party Bus & Transit Experience',
    tagline: 'Complimentary hotel pickup, sound systems, LED mood lights & drink stops',
    category: 'Party Bus Transit',
    badge: '🚐 FREE TRANSIT',
    duration: '4:30',
    views: '960K views',
    description: 'Step into your private chauffeur transit ride with direct VIP dropoff and waived covers.'
  },
  {
    id: 'yt-club-energy',
    youtubeId: 'fRh_vgS2dFE',
    title: 'Catwalk Runway & Stage Dance Showcase',
    tagline: 'World-class choreography, center-stage spotlight roasts & dancer welcomes',
    category: 'Runway Catwalk',
    badge: '🔥 CATWALK',
    duration: '3:25',
    views: '1.5M views',
    description: 'Front-row VIP leather booths, master sound systems, and 100+ models at your service.'
  },
  {
    id: 'yt-festival-edm',
    youtubeId: '60ItHLz5WEA',
    title: 'Laser Spectacular & Main Room Euphoria',
    tagline: 'Stunning visual production, bass drops & unmatched weekend party energy',
    category: 'Main Stage',
    badge: '✨ LASER STAGE',
    duration: '3:32',
    views: '710K views',
    description: 'Epic festival-grade lighting rigs, sparkler bottle trains, and pulse-pounding beats.'
  },
  {
    id: 'yt-latin-heat',
    youtubeId: 'kJQP7kiw5Fk',
    title: 'Tropical Midnight & Latin Beats Lounge',
    tagline: 'Sensual rhythms, craft cocktail mixes, VIP suites & island party vibes',
    category: 'VIP Cabaret',
    badge: '🌴 TROPICAL VIP',
    duration: '4:41',
    views: '2.1M views',
    description: 'Exotic rhythms, luxury lounge decor, and nonstop entertainment until dawn.'
  }
];

export const NightlifeVideoShowcase: React.FC<NightlifeVideoShowcaseProps> = ({
  city,
  onOpenBooking
}) => {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeTeaser>(YOUTUBE_NIGHTLIFE_VIDEOS[0]);
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);
  const [customYtInput, setCustomYtInput] = useState<string>('');
  const [showEmbedInput, setShowEmbedInput] = useState<boolean>(false);

  // Random YouTube video selector
  const handleRandomVideo = () => {
    const available = YOUTUBE_NIGHTLIFE_VIDEOS.filter(v => v.youtubeId !== selectedVideo.youtubeId);
    const randomIndex = Math.floor(Math.random() * available.length);
    const randomChoice = available[randomIndex] || YOUTUBE_NIGHTLIFE_VIDEOS[0];
    setSelectedVideo(randomChoice);
  };

  // Allow custom YouTube video embedding
  const handleCustomYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customYtInput.trim()) return;

    let extractedId = customYtInput.trim();
    // Support full youtube URLs (e.g. youtube.com/watch?v=XYZ or youtu.be/XYZ)
    if (extractedId.includes('youtube.com/watch?v=')) {
      extractedId = extractedId.split('watch?v=')[1]?.split('&')[0] || extractedId;
    } else if (extractedId.includes('youtu.be/')) {
      extractedId = extractedId.split('youtu.be/')[1]?.split('?')[0] || extractedId;
    } else if (extractedId.includes('youtube.com/embed/')) {
      extractedId = extractedId.split('embed/')[1]?.split('?')[0] || extractedId;
    }

    if (extractedId) {
      const customTeaser: YouTubeTeaser = {
        id: `custom-${Date.now()}`,
        youtubeId: extractedId,
        title: `Custom Nightlife Reel (${extractedId})`,
        tagline: `Streaming in ${city.name} VIP Cinema`,
        category: 'Custom Stream',
        badge: '📺 LIVE REEL',
        duration: 'Live HD',
        views: 'VIP Stream',
        description: 'Custom nightlife video loaded into the VIP Cinema player.'
      };
      setSelectedVideo(customTeaser);
      setCustomYtInput('');
      setShowEmbedInput(false);
    }
  };

  return (
    <section id="nightlife-cinema-section" className="py-16 bg-black text-white relative border-t-2 border-amber-500/20 overflow-hidden text-left">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className={`mx-auto px-4 sm:px-6 relative z-10 transition-all duration-300 ${isTheaterMode ? 'max-w-[98%]' : 'max-w-7xl'}`}>
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-lg shadow-amber-500/5">
            <Film className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>NIGHTLIFE CINEMA & YOUTUBE TEASERS • {city.name.toUpperCase()}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-serif tracking-tight text-white leading-none">
            EXPERIENCE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-500">ATMOSPHERE</span>
          </h2>
          
          <p className="text-zinc-300 text-sm sm:text-base mt-3 font-mono max-w-2xl mx-auto leading-relaxed">
            Watch real YouTube nightlife reels, stage show teasers, party bus vibes, and front-row VIP previews in {city.name}. Over 100+ models at your service.
          </p>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <button
              onClick={handleRandomVideo}
              className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 border border-amber-400/40 text-amber-300 rounded-xl font-mono text-xs font-bold uppercase flex items-center gap-2 transition shadow-md active:scale-95"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>🎲 Shuffle Random YouTube Video</span>
            </button>

            <button
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl font-mono text-xs font-bold uppercase flex items-center gap-2 transition"
            >
              {isTheaterMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Standard View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Expand Big Cinema View</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowEmbedInput(!showEmbedInput)}
              className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white rounded-xl font-mono text-xs flex items-center gap-1.5 transition"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Paste YouTube Link</span>
            </button>
          </div>

          {/* Custom YouTube URL input modal/drawer */}
          {showEmbedInput && (
            <form onSubmit={handleCustomYoutubeSubmit} className="mt-4 max-w-xl mx-auto flex gap-2 p-2 bg-zinc-900/95 border border-amber-500/40 rounded-2xl shadow-xl">
              <input
                type="text"
                placeholder="Paste YouTube Video URL or Video ID (e.g. 4NRXx6U8ABQ)..."
                value={customYtInput}
                onChange={(e) => setCustomYtInput(e.target.value)}
                className="flex-1 bg-black/60 border border-zinc-700 px-3.5 py-2 rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-black uppercase rounded-xl transition"
              >
                Embed Video
              </button>
            </form>
          )}
        </div>

        {/* Video Player Grid (Extra Large Cinema View) */}
        <div className={`grid grid-cols-1 gap-6 items-start ${isTheaterMode ? 'lg:grid-cols-12' : 'lg:grid-cols-12'}`}>
          
          {/* Main Big YouTube Cinema Player */}
          <div className={`${isTheaterMode ? 'lg:col-span-9' : 'lg:col-span-8'} bg-zinc-950 border-2 border-amber-500/50 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)] relative group`}>
            
            {/* Top Bar with Clear Responsive Layout (No Button Collision) */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-400/40 rounded-lg text-[11px] font-mono text-amber-300 font-bold shrink-0 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>{selectedVideo.badge}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-serif uppercase truncate">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono truncate">
                    {selectedVideo.category} • {selectedVideo.views} • {selectedVideo.duration}
                  </p>
                </div>
              </div>

              {/* Action Buttons in Top Bar */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  onClick={handleRandomVideo}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-[11px] font-mono font-bold rounded-lg border border-zinc-700 flex items-center gap-1 transition"
                  title="Play another random video"
                >
                  <Shuffle className="w-3 h-3" />
                  <span className="hidden sm:inline">Shuffle</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black text-xs font-mono font-black uppercase rounded-lg transition shadow-md flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Get VIP Pass</span>
                </button>
              </div>
            </div>

            {/* Embedded YouTube 16:9 Big Player */}
            <div className="relative w-full aspect-video min-h-[280px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[520px] bg-black">
              <iframe
                key={selectedVideo.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&mute=0&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full absolute inset-0 border-0"
              />
            </div>

            {/* Video Description & VIP Guarantee Bar */}
            <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 max-w-xl">
                <p className="text-xs sm:text-sm font-mono text-zinc-300 font-medium">
                  {selectedVideo.tagline}
                </p>
                <p className="text-[11px] text-zinc-400 font-mono">
                  {selectedVideo.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 shrink-0 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100+ Models at Your Service Tonight</span>
              </div>
            </div>
          </div>

          {/* Playlist & Teaser Selector Sidebar */}
          <div className={`${isTheaterMode ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-3 font-mono`}>
            
            {/* Playlist Header */}
            <div className="p-3.5 bg-zinc-950/90 border border-zinc-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase block tracking-wider">
                  🎬 Nightlife Teasers ({YOUTUBE_NIGHTLIFE_VIDEOS.length})
                </span>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Select a video to stream in the big cinema player
                </p>
              </div>
              <span className="text-[10px] bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" /> 100+ Models
              </span>
            </div>

            {/* YouTube Teaser Cards */}
            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {YOUTUBE_NIGHTLIFE_VIDEOS.map((teaser) => {
                const isCurrent = selectedVideo.youtubeId === teaser.youtubeId;
                const thumbnailUrl = `https://img.youtube.com/vi/${teaser.youtubeId}/hqdefault.jpg`;

                return (
                  <button
                    key={teaser.id}
                    onClick={() => setSelectedVideo(teaser)}
                    className={`w-full p-3 rounded-2xl border transition text-left flex items-center gap-3 group relative ${
                      isCurrent
                        ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400'
                        : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    {/* Thumbnail with Play indicator */}
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-zinc-700 bg-black shadow-md">
                      <img
                        src={thumbnailUrl}
                        alt={teaser.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          // Fallback thumbnail if HQ fails
                          (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${teaser.youtubeId}/0.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isCurrent ? 'bg-amber-400 text-black' : 'bg-black/70 text-white'}`}>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 py-0.2 rounded font-mono font-bold">
                        {teaser.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-amber-300 font-bold uppercase truncate">
                          {teaser.category}
                        </span>
                        <span className="text-[10px] text-zinc-400">{teaser.views}</span>
                      </div>
                      <h5 className="text-xs font-bold text-white truncate mt-0.5 font-serif uppercase group-hover:text-amber-300 transition">
                        {teaser.title}
                      </h5>
                      <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                        {teaser.tagline}
                      </p>
                    </div>

                    {isCurrent && (
                      <span className="absolute top-2 right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick VIP Pass Callout Card */}
            <div className="p-4 bg-gradient-to-br from-amber-500/15 via-zinc-900 to-rose-500/15 border border-amber-500/40 rounded-2xl space-y-2.5 shadow-xl">
              <div className="flex items-center justify-between text-amber-300 font-bold text-xs uppercase">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>Reserve VIP Passes Tonight</span>
                </div>
                <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded font-mono font-bold">100+ MODELS</span>
              </div>
              
              <p className="text-zinc-300 text-xs leading-relaxed font-mono">
                Choose the <strong>$50 Friday Pass</strong> or the <strong>$100 Weekend Pass</strong> (Fri night – Sun eve). Includes free hotel pickup, zero cover charges, front-row leather booths, and 100+ models.
              </p>
              
              <button
                onClick={onOpenBooking}
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black text-xs font-black uppercase rounded-xl transition font-mono shadow-lg flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                <span>Book Instant VIP Package</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
