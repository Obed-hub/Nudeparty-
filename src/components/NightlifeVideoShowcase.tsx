import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Film, 
  Flame, 
  Crown, 
  Heart, 
  Shuffle, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  ExternalLink,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';
import { DestinationCity } from '../types';
import { parseAnyVideoUrl, ParsedVideoResult } from '../utils/universalVideo';

// ==================================================================================
// 🎬 NIGHTLIFE VIDEO PLAYLIST CONFIGURATION
// You can edit or replace ANY videoUrl below with ANY video link:
// - YouTube: 'https://www.youtube.com/watch?v=...' or 'https://youtu.be/...' or Shorts
// - Direct video file: 'https://example.com/video.mp4' or .webm / .mov
// - Vimeo: 'https://vimeo.com/...' or 'https://player.vimeo.com/video/...'
// - Streamable: 'https://streamable.com/...'
// - Loom: 'https://loom.com/share/...'
// - Dailymotion, Wistia, TikTok, or raw embed links
//
// The app will automatically parse it, extract video IDs, and play it seamlessly!
// ==================================================================================

export interface VideoShowcaseItem {
  id: string;
  videoUrl: string; // <-- PUT ANY VIDEO URL HERE!
  title: string;
  tagline: string;
  category: string;
  badge?: string;
  duration?: string;
  views?: string;
  description?: string;
  posterImage?: string; // Optional custom thumbnail/poster
}

export const NIGHTLIFE_VIDEOS_CONFIG: VideoShowcaseItem[] = [
  {
    id: 'video-1',
    // PUT ANY VIDEO URL HERE:
    videoUrl: 'https://www.xvideos.com/video.haauuoo5622/club_orgy_chaos_watch_these_girls_go_wild_all_night_long',
    title: 'Club Night Gone Wild - Naked Orgy with South Florida's Hottest ',
    tagline: 'Lasers, stage choreography & 100+ dancer welcomes',
    category: 'VIP Stage Showcase',
    badge: '🔥 4K STREAM',
    duration: '0:15',
    views: '1.4M views',
    description: 'Immerse in front-row VIP stage views, laser production, and pulse-pounding sound.'
  },
  {
    id: 'video-2',
    // PUT ANY VIDEO URL HERE:
    videoUrl: 'https://www.xvideos.com/video.hblppbo67ca/realitykings_-_in_the_vip_-_fierce_fucking',
    title: '',
    tagline: 'Dirty Party Girls Go Wild Fucked by Man Meat in VIP Club Bash',
    category: 'Ultra Lounge',
    badge: '💎 CINEMA HD',
    duration: '2:15',
    views: '650K views',
    description: 'Private lounge suites and top-tier hospitality for your whole squad.'
  },
  {
    id: 'video-3',
    // PUT ANY VIDEO URL HERE:
    videoUrl: 'https://www.xvideos.com/video.halaeem7e1a/bent_over_and_pounded_hard_one_by_one_at_the_club_orgy',
    title: 'VIP Bottle Service & High-Roller Atmosphere',
    tagline: 'Sparkler trains, premium leather booths & champagne service',
    category: 'Bottle Service',
    badge: '⚡ VIP SUITE',
    duration: '0:15',
    views: '980K views',
    description: 'Front-row leather booths, sparkler bottle service, and dancer introductions.'
  },
  {
    id: 'video-4',
    // PUT ANY VIDEO URL HERE:
    videoUrl: 'https://www.xvideos.com/video.haalivh1b7b/party_girls_go_crazy_on_one_dick_sucking_and_fucking_in_vip',
    title: 'Main Room Euphoria & Midnight Countdown',
    tagline: 'Weekend celebration vibes, confetti drops & party energy',
    category: 'Main Stage',
    badge: '✨ MAIN ROOM',
    duration: '0:15',
    views: '1.2M views',
    description: 'Unmatched party energy, master acoustics, and full-room celebrations.'
  },
  {
    id: 'video-5',
    // PUT ANY VIDEO URL HERE:
    videoUrl: 'https://www.xvideos.com/video.halikok996d/night_out_nymphos_flashing_fucking_and_loving_every_second',
    title: 'Complimentar',
    tagline: 'Direct luxury pickup from your hotel with zero cover charges',
    category: 'Party Bus Transit',
    badge: '🚐 FREE LIMO',
    duration: '0:15',
    views: '840K views',
    description: 'Step into your private chauffeur party bus with VIP dropoff right at the velvet rope.'
  }
];

interface NightlifeVideoShowcaseProps {
  city: DestinationCity;
  onOpenBooking: () => void;
}

export const NightlifeVideoShowcase: React.FC<NightlifeVideoShowcaseProps> = ({
  city,
  onOpenBooking
}) => {
  // If the current city has a custom video URL defined in city object, use it; otherwise use playlist
  const initialItem = city.nightlifeVideoUrl
    ? {
        id: `city-custom-${city.id}`,
        videoUrl: city.nightlifeVideoUrl,
        title: `${city.name} VIP Nightlife Showcase`,
        tagline: `Exclusive stage show and VIP atmosphere in ${city.name}`,
        category: 'Featured City Stream',
        badge: '🌟 FEATURED',
        duration: 'HD',
        views: 'VIP Stream',
        description: `Official featured video stream for ${city.name}.`
      }
    : NIGHTLIFE_VIDEOS_CONFIG[0];

  const [selectedVideo, setSelectedVideo] = useState<VideoShowcaseItem>(initialItem);
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  // Sync if city changes and city has its own videoUrl
  useEffect(() => {
    if (city.nightlifeVideoUrl) {
      setSelectedVideo({
        id: `city-custom-${city.id}`,
        videoUrl: city.nightlifeVideoUrl,
        title: `${city.name} VIP Nightlife Showcase`,
        tagline: `Exclusive stage show and VIP atmosphere in ${city.name}`,
        category: 'Featured City Stream',
        badge: '🌟 FEATURED',
        duration: 'HD',
        views: 'VIP Stream',
        description: `Official featured video stream for ${city.name}.`
      });
    }
  }, [city.id, city.nightlifeVideoUrl]);

  // Parse ANY video URL dynamically using universalVideo engine
  const parsedVideo: ParsedVideoResult = parseAnyVideoUrl(selectedVideo.videoUrl);

  // Reset error when switching video
  useEffect(() => {
    setVideoError(false);
  }, [selectedVideo.videoUrl]);

  // Random video shuffler
  const handleRandomVideo = () => {
    const available = NIGHTLIFE_VIDEOS_CONFIG.filter(v => v.videoUrl !== selectedVideo.videoUrl);
    if (available.length === 0) return;
    const randomIndex = Math.floor(Math.random() * available.length);
    setSelectedVideo(available[randomIndex] || NIGHTLIFE_VIDEOS_CONFIG[0]);
  };

  const handleRestartVideo = () => {
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = 0;
      videoElementRef.current.play().catch(() => {});
    }
  };

  return (
    <section id="nightlife-cinema-section" className="py-16 bg-black text-white relative border-t-2 border-amber-500/20 overflow-hidden text-left">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className={`mx-auto px-4 sm:px-6 relative z-10 transition-all duration-300 ${isTheaterMode ? 'max-w-[98%]' : 'max-w-7xl'}`}>
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-lg shadow-amber-500/5">
            <Film className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>NIGHTLIFE CINEMA & REELS • {city.name.toUpperCase()}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-serif tracking-tight text-white leading-none">
            EXPERIENCE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-500">ATMOSPHERE</span>
          </h2>
          
          <p className="text-zinc-300 text-sm sm:text-base mt-3 font-mono max-w-2xl mx-auto leading-relaxed">
            Watch VIP atmosphere reels, stage choreography, and private booth previews in {city.name}. 100+ models at your service tonight.
          </p>

          {/* Quick Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <button
              onClick={handleRandomVideo}
              className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 border border-amber-400/40 text-amber-300 rounded-xl font-mono text-xs font-bold uppercase flex items-center gap-2 transition shadow-md active:scale-95 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              <span>🎲 Shuffle Video</span>
            </button>

            <button
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl font-mono text-xs font-bold uppercase flex items-center gap-2 transition cursor-pointer"
            >
              {isTheaterMode ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Standard View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Big Cinema View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Video Player Grid */}
        <div className={`grid grid-cols-1 gap-6 items-start ${isTheaterMode ? 'lg:grid-cols-12' : 'lg:grid-cols-12'}`}>
          
          {/* Main Cinema Player Container */}
          <div className={`${isTheaterMode ? 'lg:col-span-9' : 'lg:col-span-8'} bg-zinc-950 border-2 border-amber-500/50 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)] relative group`}>
            
            {/* Top Bar with Format Badge & Details */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-400/40 rounded-lg text-[11px] font-mono text-amber-300 font-bold shrink-0 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>{parsedVideo.platformName.toUpperCase()}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-serif uppercase truncate">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono truncate">
                    {selectedVideo.category} {selectedVideo.views ? `• ${selectedVideo.views}` : ''} {selectedVideo.duration ? `• ${selectedVideo.duration}` : ''}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <a
                  href={selectedVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-[11px] font-mono rounded-lg border border-zinc-700 flex items-center gap-1 transition"
                  title="Open video URL in new tab"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden md:inline">Source Link</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black text-xs font-mono font-black uppercase rounded-lg transition shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Get VIP Pass</span>
                </button>
              </div>
            </div>

            {/* Universal Video Playback Area: HTML5 Video vs Universal Embed Iframe */}
            <div className="relative w-full aspect-video min-h-[280px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[520px] bg-black flex items-center justify-center overflow-hidden">
              
              {parsedVideo.isDirectFile ? (
                /* Native HTML5 Video Player for MP4 / WebM / Direct Media Files */
                <video
                  ref={videoElementRef}
                  key={parsedVideo.directFileUrl}
                  src={parsedVideo.directFileUrl}
                  controls
                  autoPlay
                  playsInline
                  loop
                  muted={isMuted}
                  poster={selectedVideo.posterImage || parsedVideo.thumbnailUrl}
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-contain bg-black"
                >
                  <source src={parsedVideo.directFileUrl} />
                  Your browser does not support HTML5 video streaming.
                </video>
              ) : (
                /* Universal Web Embed Player (YouTube, Vimeo, Streamable, Loom, Dailymotion, Wistia) */
                <iframe
                  key={parsedVideo.embedUrl}
                  src={parsedVideo.embedUrl}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full absolute inset-0 border-0"
                  onError={() => setVideoError(true)}
                />
              )}

              {/* Graceful Fallback if URL fails */}
              {videoError && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center space-y-3 z-20">
                  <Film className="w-10 h-10 text-rose-400" />
                  <h4 className="text-sm font-mono font-bold uppercase text-white">Video Stream Notice</h4>
                  <p className="text-xs text-zinc-400 font-mono max-w-md">
                    This video URL could not be played directly inside an iframe. You can view it directly via the source link.
                  </p>
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-amber-400 text-black text-xs font-mono font-bold rounded-xl uppercase"
                  >
                    Open Source Video Link
                  </a>
                </div>
              )}
            </div>

            {/* Video Description & VIP Guarantee Bar */}
            <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 max-w-xl">
                <p className="text-xs sm:text-sm font-mono text-zinc-300 font-medium">
                  {selectedVideo.tagline}
                </p>
                {selectedVideo.description && (
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {selectedVideo.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 shrink-0 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100+ Models at Your Service Tonight</span>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className={`${isTheaterMode ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-3 font-mono`}>
            
            {/* Playlist Header */}
            <div className="p-3.5 bg-zinc-950/90 border border-zinc-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase block tracking-wider">
                  🎬 Video Playlist ({NIGHTLIFE_VIDEOS_CONFIG.length})
                </span>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Select any video to play
                </p>
              </div>
              <span className="text-[10px] bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" /> 100+ Models
              </span>
            </div>

            {/* Video Playlist Cards */}
            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {NIGHTLIFE_VIDEOS_CONFIG.map((item) => {
                const isCurrent = selectedVideo.videoUrl === item.videoUrl;
                const parsed = parseAnyVideoUrl(item.videoUrl);

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedVideo(item)}
                    className={`w-full p-3 rounded-2xl border transition text-left flex items-center gap-3 group relative cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400'
                        : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    {/* Thumbnail with Play indicator */}
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-zinc-700 bg-black shadow-md">
                      <img
                        src={item.posterImage || parsed.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isCurrent ? 'bg-amber-400 text-black' : 'bg-black/70 text-white'}`}>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      {item.duration && (
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 py-0.2 rounded font-mono font-bold">
                          {item.duration}
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-amber-300 font-bold uppercase truncate">
                          {item.badge || item.category}
                        </span>
                        {item.views && (
                          <span className="text-[10px] text-zinc-400">{item.views}</span>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-white truncate mt-0.5 font-serif uppercase group-hover:text-amber-300 transition">
                        {item.title}
                      </h5>
                      <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                        {item.tagline}
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

            {/* VIP Pass Callout Card */}
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
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-black text-xs font-black uppercase rounded-xl transition font-mono shadow-lg flex items-center justify-center gap-2 cursor-pointer"
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
