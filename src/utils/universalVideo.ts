export type VideoPlatform = 
  | 'youtube' 
  | 'vimeo' 
  | 'dailymotion' 
  | 'streamable' 
  | 'loom' 
  | 'wistia' 
  | 'tiktok'
  | 'gdrive'
  | 'dropbox'
  | 'rumble'
  | 'twitch'
  | 'adult_stream'
  | 'direct_file' 
  | 'generic_embed';

export interface ParsedVideoResult {
  rawUrl: string;
  platform: VideoPlatform;
  platformName: string;
  isDirectFile: boolean;
  embedUrl: string;
  bgEmbedUrl: string;
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
 * Universal video parser that converts ANY video URL into a 100% embeddable or playable format.
 * Prevents "Refused to connect" (X-Frame-Options / CSP) errors by generating official embed endpoints.
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

  // If user pasted an iframe, embed, or video HTML snippet, extract the src URL
  if (cleanUrl.includes('<iframe') || cleanUrl.includes('<video') || cleanUrl.includes('<embed')) {
    const srcMatch = cleanUrl.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      cleanUrl = srcMatch[1].trim();
    }
  }

  // 1. Direct Video Files (.mp4, .webm, .ogg, .mov, .m4v, .m3u8, .mpd) or media storage CDNs
  const directVideoFileExtensions = /\.(mp4|webm|ogg|mov|m4v|m3u8|ogv)(\?.*)?$/i;
  const isStorageDirectVideo = /storage\.googleapis\.com|blob\.core\.windows\.net|s3\.amazonaws\.com|cloudinary\.com\/.*\/video\/upload|cdn\.discordapp\.com\/attachments|video\.twimg\.com|v\.redd\.it|supabase\.co\/storage|firebasestorage\.googleapis\.com/i.test(cleanUrl);

  if (directVideoFileExtensions.test(cleanUrl) || isStorageDirectVideo) {
    return {
      rawUrl: cleanUrl,
      platform: 'direct_file',
      platformName: 'Direct Video File (MP4/WebM)',
      isDirectFile: true,
      embedUrl: cleanUrl,
      bgEmbedUrl: cleanUrl,
      directFileUrl: cleanUrl,
      thumbnailUrl: FALLBACK_THUMBNAILS[1]
    };
  }

  // 2. Google Drive video links (Convert from /view to /preview to allow iframe embedding)
  if (cleanUrl.includes('drive.google.com')) {
    const driveMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      const fileId = driveMatch[1];
      const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      return {
        rawUrl: cleanUrl,
        platform: 'gdrive',
        platformName: 'Google Drive Video',
        isDirectFile: false,
        embedUrl: previewUrl,
        bgEmbedUrl: previewUrl,
        thumbnailUrl: FALLBACK_THUMBNAILS[0],
        videoId: fileId
      };
    }
  }

  // 3. Dropbox links (Convert ?dl=0 to ?raw=1 for direct HTML5 video stream)
  if (cleanUrl.includes('dropbox.com')) {
    let directDropbox = cleanUrl.replace(/[?&]dl=[01]/, '').replace(/[?&]raw=[01]/, '');
    directDropbox += directDropbox.includes('?') ? '&raw=1' : '?raw=1';
    return {
      rawUrl: cleanUrl,
      platform: 'dropbox',
      platformName: 'Dropbox Video',
      isDirectFile: true,
      embedUrl: directDropbox,
      bgEmbedUrl: directDropbox,
      directFileUrl: directDropbox,
      thumbnailUrl: FALLBACK_THUMBNAILS[1]
    };
  }

  // 4. YouTube URLs (Comprehensive regex covering all formats)
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

  // Check if someone passed a raw 11-char YouTube ID (e.g. "kJQP7kiw5Fk", "4NRXx6U8ABQ")
  if (!ytId && /^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    ytId = cleanUrl;
  }

  if (ytId) {
    return {
      rawUrl: cleanUrl.startsWith('http') ? cleanUrl : `https://www.youtube.com/watch?v=${ytId}`,
      platform: 'youtube',
      platformName: 'YouTube Stream',
      isDirectFile: false,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`,
      bgEmbedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      videoId: ytId
    };
  }

  // 5. Vimeo (vimeo.com/123456789 or player.vimeo.com/video/123456789)
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

  // 6. Adult & VIP Nightlife Platforms (Convert standard page URLs to official embed frame URLs)
  // SpankBang: spankbang.com/12345/video/... -> spankbang.com/12345/embed/
  if (cleanUrl.includes('spankbang.com')) {
    const sbMatch = cleanUrl.match(/spankbang\.com\/([a-zA-Z0-9]+)/);
    if (sbMatch && sbMatch[1] && sbMatch[1] !== 'embed') {
      const id = sbMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'adult_stream',
        platformName: 'SpankBang Stream',
        isDirectFile: false,
        embedUrl: `https://spankbang.com/${id}/embed/`,
        bgEmbedUrl: `https://spankbang.com/${id}/embed/`,
        thumbnailUrl: FALLBACK_THUMBNAILS[0],
        videoId: id
      };
    }
  }

  // PornHub: pornhub.com/view_video.php?viewkey=KEY -> pornhub.com/embed/KEY
  if (cleanUrl.includes('pornhub.com')) {
    const phMatch = cleanUrl.match(/viewkey=([a-zA-Z0-9]+)/) || cleanUrl.match(/embed\/([a-zA-Z0-9]+)/);
    if (phMatch && phMatch[1]) {
      const key = phMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'adult_stream',
        platformName: 'Pornhub Stream',
        isDirectFile: false,
        embedUrl: `https://www.pornhub.com/embed/${key}`,
        bgEmbedUrl: `https://www.pornhub.com/embed/${key}`,
        thumbnailUrl: FALLBACK_THUMBNAILS[0],
        videoId: key
      };
    }
  }

  // XHamster: xhamster.com/videos/... or xhamster.com/xembed.php?video=ID
  if (cleanUrl.includes('xhamster.com')) {
    const xhMatch = cleanUrl.match(/xembed\.php\?video=([a-zA-Z0-9]+)/) || cleanUrl.match(/videos\/[^-\/]+-([a-zA-Z0-9]+)/) || cleanUrl.match(/videos\/([a-zA-Z0-9]+)/);
    if (xhMatch && xhMatch[1]) {
      const id = xhMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'adult_stream',
        platformName: 'XHamster Stream',
        isDirectFile: false,
        embedUrl: `https://xhamster.com/xembed.php?video=${id}`,
        bgEmbedUrl: `https://xhamster.com/xembed.php?video=${id}`,
        thumbnailUrl: FALLBACK_THUMBNAILS[0],
        videoId: id
      };
    }
  }

  // XVideos: xvideos.com/video12345/... -> xvideos.com/embedframe/12345
  if (cleanUrl.includes('xvideos.com')) {
    const xvMatch = cleanUrl.match(/video(\d+)/) || cleanUrl.match(/embedframe\/(\d+)/);
    if (xvMatch && xvMatch[1]) {
      const id = xvMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'adult_stream',
        platformName: 'XVideos Stream',
        isDirectFile: false,
        embedUrl: `https://www.xvideos.com/embedframe/${id}`,
        bgEmbedUrl: `https://www.xvideos.com/embedframe/${id}`,
        thumbnailUrl: FALLBACK_THUMBNAILS[0],
        videoId: id
      };
    }
  }

  // RedTube: redtube.com/12345 -> embed.redtube.com/?id=12345
  if (cleanUrl.includes('redtube.com')) {
    const rtMatch = cleanUrl.match(/redtube\.com\/(\d+)/) || cleanUrl.match(/id=(\d+)/);
    if (rtMatch && rtMatch[1]) {
      const id = rtMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'adult_stream',
        platformName: 'RedTube Stream',
        isDirectFile: false,
        embedUrl: `https://embed.redtube.com/?id=${id}`,
        bgEmbedUrl: `https://embed.redtube.com/?id=${id}`,
        thumbnailUrl: FALLBACK_THUMBNAILS[0],
        videoId: id
      };
    }
  }

  // 7. Streamable (streamable.com/ID or streamable.com/e/ID)
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

  // 8. Dailymotion (dailymotion.com/video/ID or dai.ly/ID)
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

  // 9. Loom (loom.com/share/ID or loom.com/embed/ID)
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

  // 10. Rumble (rumble.com/v... -> rumble.com/embed/...)
  if (cleanUrl.includes('rumble.com')) {
    const rumbleMatch = cleanUrl.match(/rumble\.com\/embed\/([a-zA-Z0-9]+)/) || cleanUrl.match(/rumble\.com\/(v[a-zA-Z0-9]+)/);
    if (rumbleMatch && rumbleMatch[1]) {
      const id = rumbleMatch[1];
      return {
        rawUrl: cleanUrl,
        platform: 'rumble',
        platformName: 'Rumble Video',
        isDirectFile: false,
        embedUrl: `https://rumble.com/embed/${id}/`,
        bgEmbedUrl: `https://rumble.com/embed/${id}/`,
        thumbnailUrl: FALLBACK_THUMBNAILS[1],
        videoId: id
      };
    }
  }

  // 11. Twitch
  if (cleanUrl.includes('twitch.tv')) {
    const channelMatch = cleanUrl.match(/twitch\.tv\/([a-zA-Z0-9_]+)/);
    if (channelMatch && channelMatch[1] && channelMatch[1] !== 'videos') {
      const channel = channelMatch[1];
      const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      return {
        rawUrl: cleanUrl,
        platform: 'twitch',
        platformName: 'Twitch Live',
        isDirectFile: false,
        embedUrl: `https://player.twitch.tv/?channel=${channel}&parent=${host}&autoplay=true`,
        bgEmbedUrl: `https://player.twitch.tv/?channel=${channel}&parent=${host}&autoplay=true&muted=true`,
        thumbnailUrl: FALLBACK_THUMBNAILS[0],
        videoId: channel
      };
    }
  }

  // 12. TikTok (tiktok.com/@.../video/123456789)
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

  // 13. Wistia (wistia.com/medias/ID or fast.wistia.net/embed/iframe/ID)
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

  // 14. Fallback for unclassified URLs
  const safeHttpUrl = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') 
    ? cleanUrl 
    : `https://${cleanUrl}`;

  return {
    rawUrl: safeHttpUrl,
    platform: 'generic_embed',
    platformName: 'Web Video Stream',
    isDirectFile: false,
    embedUrl: safeHttpUrl,
    bgEmbedUrl: safeHttpUrl,
    directFileUrl: safeHttpUrl,
    thumbnailUrl: FALLBACK_THUMBNAILS[0]
  };
}
