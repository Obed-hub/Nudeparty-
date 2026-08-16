export type VideoPlatform = 
  | 'youtube' 
  | 'vimeo' 
  | 'dailymotion' 
  | 'streamable' 
  | 'loom' 
  | 'wistia' 
  | 'tiktok'
  | 'direct_file' 
  | 'generic_embed';

export interface ParsedVideoResult {
  rawUrl: string;
  platform: VideoPlatform;
  platformName: string;
  isDirectFile: boolean;
  embedUrl: string;
  bgEmbedUrl: string; // Tailored for silent, autoplaying background ambient video
  directFileUrl?: string;
  thumbnailUrl: string;
  videoId?: string;
}

// Fallback high-res nightlife thumbnails for video posters
const FALLBACK_THUMBNAILS = [
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?q=80&w=800&auto=format&fit=crop'
];

export const DEFAULT_DIRECT_MP4 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

/**
 * Universal video parser that accepts ANY video link or embed code:
 * - Direct Video Files (.mp4, .webm, .ogg, .mov, .m4v, .m3u8, Cloudinary, AWS S3, GCS, CDNs)
 * - YouTube (watch, youtu.be, shorts, live, embed, with query params)
 * - Vimeo (vimeo.com/123, player.vimeo.com/video/123)
 * - Dailymotion (dailymotion.com/video/..., dai.ly/...)
 * - Streamable (streamable.com/...)
 * - Loom (loom.com/share/..., loom.com/embed/...)
 * - Wistia (wistia.com/medias/..., fast.wistia.net/...)
 * - TikTok (tiktok.com/@.../video/...)
 * - Paste of <iframe> or <video> HTML tags
 */
export function parseAnyVideoUrl(inputUrl: string): ParsedVideoResult {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return {
      rawUrl: DEFAULT_DIRECT_MP4,
      platform: 'direct_file',
      platformName: 'Direct Video (MP4)',
      isDirectFile: true,
      embedUrl: DEFAULT_DIRECT_MP4,
      bgEmbedUrl: DEFAULT_DIRECT_MP4,
      directFileUrl: DEFAULT_DIRECT_MP4,
      thumbnailUrl: FALLBACK_THUMBNAILS[1]
    };
  }

  let cleanUrl = inputUrl.trim();

  // If user pasted an iframe or embed HTML snippet in code or input, extract the src URL
  if (cleanUrl.includes('<iframe') || cleanUrl.includes('<video') || cleanUrl.includes('<embed')) {
    const srcMatch = cleanUrl.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      cleanUrl = srcMatch[1].trim();
    }
  }

  // 1. Direct Video Files (.mp4, .webm, .ogg, .mov, .m4v, .m3u8, .mpd) or common media storage CDNs
  const directVideoFileExtensions = /\.(mp4|webm|ogg|mov|m4v|m3u8|ogv)(\?.*)?$/i;
  const isStorageDirectVideo = /storage\.googleapis\.com|blob\.core\.windows\.net|s3\.amazonaws\.com|cloudinary\.com\/.*\/video\/upload|cdn\.discordapp\.com\/attachments|video\.twimg\.com|v\.redd\.it/i.test(cleanUrl);

  if (directVideoFileExtensions.test(cleanUrl) || isStorageDirectVideo) {
    return {
      rawUrl: cleanUrl,
      platform: 'direct_file',
      platformName: 'Direct Video (MP4/WebM)',
      isDirectFile: true,
      embedUrl: cleanUrl,
      bgEmbedUrl: cleanUrl,
      directFileUrl: cleanUrl,
      thumbnailUrl: FALLBACK_THUMBNAILS[1]
    };
  }

  // 2. YouTube URLs (Comprehensive parsing if user pastes a YouTube URL)
  let ytId = '';

  if (cleanUrl.includes('youtu.be/')) {
    const after = cleanUrl.split('youtu.be/')[1] || '';
    ytId = after.split('?')[0].split('/')[0].split('&')[0].split('#')[0];
  } else if (cleanUrl.includes('youtube.com/shorts/')) {
    const after = cleanUrl.split('youtube.com/shorts/')[1] || '';
    ytId = after.split('?')[0].split('/')[0].split('&')[0].split('#')[0];
  } else if (cleanUrl.includes('youtube.com/live/')) {
    const after = cleanUrl.split('youtube.com/live/')[1] || '';
    ytId = after.split('?')[0].split('/')[0].split('&')[0].split('#')[0];
  } else if (cleanUrl.includes('youtube.com/embed/') || cleanUrl.includes('youtube-nocookie.com/embed/')) {
    const match = cleanUrl.match(/embed\/([^?&/#]+)/);
    if (match && match[1]) ytId = match[1];
  } else if (cleanUrl.includes('youtube.com/v/')) {
    const match = cleanUrl.match(/\/v\/([^?&/#]+)/);
    if (match && match[1]) ytId = match[1];
  } else if (cleanUrl.includes('youtube.com/watch') || cleanUrl.includes('music.youtube.com/watch') || cleanUrl.includes('m.youtube.com/watch')) {
    try {
      const urlObj = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
      const v = urlObj.searchParams.get('v');
      if (v) ytId = v;
    } catch {
      const match = cleanUrl.match(/[?&]v=([^&/#]+)/);
      if (match && match[1]) ytId = match[1];
    }
  }

  // Check if someone passed a raw 11-char YouTube ID (e.g. "4NRXx6U8ABQ")
  if (!ytId && /^[a-zA-Z0-9_-]{11}$/.test(cleanUrl) && !cleanUrl.includes('.') && !cleanUrl.includes('/')) {
    ytId = cleanUrl;
  }

  if (ytId) {
    return {
      rawUrl: cleanUrl.startsWith('http') ? cleanUrl : `https://www.youtube.com/watch?v=${ytId}`,
      platform: 'youtube',
      platformName: 'YouTube Stream',
      isDirectFile: false,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`,
      bgEmbedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      videoId: ytId
    };
  }

  // 3. Vimeo (vimeo.com/123456789 or player.vimeo.com/video/123456789)
  if (cleanUrl.includes('vimeo.com')) {
    const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      const id = vimeoMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'vimeo',
        platformName: 'Vimeo Stream',
        isDirectFile: false,
        embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=0&title=0&byline=0&portrait=0`,
        bgEmbedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0`,
        thumbnailUrl: `https://vumbnail.com/${id}.jpg`,
        videoId: id
      };
    }
  }

  // 4. Dailymotion (dailymotion.com/video/ID or dai.ly/ID)
  if (cleanUrl.includes('dailymotion.com') || cleanUrl.includes('dai.ly')) {
    const dailyMatch = cleanUrl.match(/(?:dailymotion\.com\/video\/|dai\.ly\/)([a-zA-Z0-9]+)/);
    if (dailyMatch && dailyMatch[1]) {
      const id = dailyMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'dailymotion',
        platformName: 'Dailymotion',
        isDirectFile: false,
        embedUrl: `https://www.dailymotion.com/embed/video/${id}?autoplay=1`,
        bgEmbedUrl: `https://www.dailymotion.com/embed/video/${id}?autoplay=1&mute=1&controls=0`,
        thumbnailUrl: `https://www.dailymotion.com/thumbnail/video/${id}`,
        videoId: id
      };
    }
  }

  // 5. Streamable (streamable.com/ID or streamable.com/e/ID)
  if (cleanUrl.includes('streamable.com')) {
    const streamableMatch = cleanUrl.match(/streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/);
    if (streamableMatch && streamableMatch[1]) {
      const id = streamableMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'streamable',
        platformName: 'Streamable',
        isDirectFile: false,
        embedUrl: `https://streamable.com/e/${id}?autoplay=1`,
        bgEmbedUrl: `https://streamable.com/e/${id}?autoplay=1&muted=1&nocontrols=1`,
        thumbnailUrl: `https://cdn-cf-east.streamable.com/image/${id}.jpg`,
        videoId: id
      };
    }
  }

  // 6. Loom (loom.com/share/ID or loom.com/embed/ID)
  if (cleanUrl.includes('loom.com')) {
    const loomMatch = cleanUrl.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
    if (loomMatch && loomMatch[1]) {
      const id = loomMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'loom',
        platformName: 'Loom',
        isDirectFile: false,
        embedUrl: `https://www.loom.com/embed/${id}?autoplay=1`,
        bgEmbedUrl: `https://www.loom.com/embed/${id}?autoplay=1&muted=1&hideEmbedTopBar=true`,
        thumbnailUrl: FALLBACK_THUMBNAILS[2],
        videoId: id
      };
    }
  }

  // 7. Wistia (wistia.com/medias/ID or fast.wistia.net/embed/iframe/ID)
  if (cleanUrl.includes('wistia.com') || cleanUrl.includes('wistia.net')) {
    const wistiaMatch = cleanUrl.match(/(?:wistia\.com\/medias\/|fast\.wistia\.net\/embed\/iframe\/)([a-zA-Z0-9]+)/);
    if (wistiaMatch && wistiaMatch[1]) {
      const id = wistiaMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'wistia',
        platformName: 'Wistia',
        isDirectFile: false,
        embedUrl: `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true`,
        bgEmbedUrl: `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&muted=true&controlsVisibleOnLoad=false`,
        thumbnailUrl: FALLBACK_THUMBNAILS[3],
        videoId: id
      };
    }
  }

  // 8. TikTok (tiktok.com/@.../video/123456789)
  if (cleanUrl.includes('tiktok.com')) {
    const tikMatch = cleanUrl.match(/video\/(\d+)/);
    if (tikMatch && tikMatch[1]) {
      const id = tikMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'tiktok',
        platformName: 'TikTok',
        isDirectFile: false,
        embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
        bgEmbedUrl: `https://www.tiktok.com/embed/v2/${id}`,
        thumbnailUrl: FALLBACK_THUMBNAILS[0],
        videoId: id
      };
    }
  }

  // 9. Generic Web Video URL Fallback
  const safeHttpUrl = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') 
    ? cleanUrl 
    : `https://${cleanUrl}`;

  return {
    rawUrl: safeHttpUrl,
    platform: 'generic_embed',
    platformName: 'Custom Video Stream',
    isDirectFile: false,
    embedUrl: safeHttpUrl,
    bgEmbedUrl: safeHttpUrl,
    thumbnailUrl: FALLBACK_THUMBNAILS[0]
  };
}
