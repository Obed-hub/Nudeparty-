import { DJPerformer, PartyEvent, RSVPData, SongRequest } from '../types';

export const CURRENT_PARTY_EVENT: PartyEvent = {
  title: 'NOCTURNE MATRIX: THE 18+ NATURIST & CLOTHING-OPTIONAL AFTERHOURS',
  tagline: 'Body-Positive Freedom, Immersive Soundscapes, Monitored Lockers, Strict Consent & 18+ Naturist Vibes',
  date: 'Saturday, August 22, 2026',
  isoDate: '2026-08-22T21:00:00',
  time: '9:00 PM – 4:30 AM (Doors close at 1:30 AM)',
  venueName: 'The Sanctuary Warehouse & Open-Air Courtyard Oasis',
  address: '440 Metro Boulevard, Arts & Entertainment District',
  cityState: 'Los Angeles, CA / Live Hub',
  minAge: 18,
  dressCode: 'Clothing-Optional / Naturist / Body-Positive (Towel Mandatory on Furniture • Footwear Required)',
  capacityLimit: 500,
  currentRsvpCount: 384,
  theme: 'Body-Positive Naturist Freedom & Deep Electronic Frequencies'
};

export const DJ_LINEUP: DJPerformer[] = [
  {
    id: 'dj-1',
    name: 'KAIROS // 808',
    handle: '@kairos.wav',
    stage: 'Main Neon Stage',
    timeSlot: '11:30 PM - 01:30 AM',
    genre: 'Tech House / Bassline / Afrobeats Mashups',
    bio: 'Boiler room veteran known for relentless energy drops and infectious percussion grooves.',
    accentColor: 'from-fuchsia-500 to-pink-600'
  },
  {
    id: 'dj-2',
    name: 'AURA NOVA',
    handle: '@auranovaclub',
    stage: 'The Boiler Room Arena',
    timeSlot: '01:30 AM - 03:30 AM (Peak Afterhours)',
    genre: 'Peak-Time Melodic Techno & Acid',
    bio: 'Heavyweight synthesizers, hypnotic vocal hooks, and 140 BPM late-night euphoria.',
    accentColor: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'dj-3',
    name: 'MALIK ST. CLAIR',
    handle: '@malikstclair',
    stage: 'Courtyard Vibe Deck',
    timeSlot: '09:30 PM - 11:30 PM',
    genre: 'Amapiano / Afrobeats / R&B Remixes',
    bio: 'Setting the mood as the sun goes down with smooth log-drum baselines and party warmups.',
    accentColor: 'from-amber-400 to-orange-600'
  },
  {
    id: 'dj-4',
    name: 'DJ CYBERBUNNY',
    handle: '@cyberbunny_dj',
    stage: 'Rooftop Chill & Silent Disco',
    timeSlot: '12:00 AM - 04:00 AM',
    genre: '2000s Pop Remixes / Trap / Hyperpop',
    bio: 'Banger after banger keeping everyone singing along until the lights turn on.',
    accentColor: 'from-emerald-400 to-teal-600'
  }
];

export const INITIAL_SONG_REQUESTS: SongRequest[] = [
  {
    id: 'song-1',
    title: 'Water (Remix)',
    artist: 'Tyla x Marshmello',
    requestedBy: 'Jordan M. (London)',
    genre: 'Afrobeats',
    votes: 42,
    status: 'PLAYING_NEXT',
    timestamp: '10 mins ago'
  },
  {
    id: 'song-2',
    title: 'Drugs From Amsterdam',
    artist: 'Mau P',
    requestedBy: 'Elena R. (Berlin)',
    genre: 'Tech House',
    votes: 38,
    status: 'QUEUED',
    timestamp: '15 mins ago'
  },
  {
    id: 'song-3',
    title: 'Not Like Us (Club Edit)',
    artist: 'Kendrick Lamar',
    requestedBy: 'Marcus T. (Austin)',
    genre: 'Hip-Hop',
    votes: 35,
    status: 'QUEUED',
    timestamp: '22 mins ago'
  },
  {
    id: 'song-4',
    title: 'Espresso (Extended Dance Mix)',
    artist: 'Sabrina Carpenter',
    requestedBy: 'Chloe S. (Toronto)',
    genre: 'Dance Pop',
    votes: 29,
    status: 'QUEUED',
    timestamp: '30 mins ago'
  },
  {
    id: 'song-5',
    title: 'Mnike (Hit Drum Anthem)',
    artist: 'Tyler ICU & Tumelo.za',
    requestedBy: 'Kwame O. (Accra/Lagos)',
    genre: 'Amapiano',
    votes: 27,
    status: 'QUEUED',
    timestamp: '45 mins ago'
  }
];

export const INITIAL_ATTENDEES: RSVPData[] = [
  {
    id: 'rsvp-101',
    fullName: 'Sophia Ramirez',
    partyNickname: 'SophiGlow',
    email: 'sophia.r@example.com',
    phone: '+1 310-555-0192',
    birthDate: '2004-03-15',
    age: 22,
    isOver18: true,
    country: 'United States',
    countryCode: 'US',
    state: 'California',
    city: 'Los Angeles',
    ticketTier: 'VIP_LOUNGE',
    musicVibes: ['Tech House & Deep House', 'Peak-Time Techno & Melodic'],
    drinkPreference: 'Craft Cocktails & Spirits',
    hasPlusOne: true,
    plusOneName: 'Liam Chen',
    plusOneAge: 23,
    emergencyContactName: 'Maria Ramirez',
    emergencyContactPhone: '+1 (385) 260-0342',
    agreedToRules: true,
    agreedToIdCheck: true,
    passCode: 'NP-8821-LA',
    registeredAt: '2026-08-10T19:42:00',
    checkedIn: false
  },
  {
    id: 'rsvp-102',
    fullName: 'Damilola Adebayo',
    partyNickname: 'DamiVibes',
    email: 'dami.a@example.com',
    phone: '+234 802-555-0144',
    birthDate: '2002-11-20',
    age: 23,
    isOver18: true,
    country: 'Nigeria',
    countryCode: 'NG',
    state: 'Lagos',
    city: 'Lekki',
    ticketTier: 'BACKSTAGE_ACCESS',
    musicVibes: ['Afrobeats / Amapiano', 'Hip-Hop & Trap'],
    drinkPreference: 'Prosecco & Tequila Shots',
    hasPlusOne: false,
    emergencyContactName: 'Femi Adebayo',
    emergencyContactPhone: '+1 (385) 260-0342',
    agreedToRules: true,
    agreedToIdCheck: true,
    passCode: 'NP-9042-NG',
    registeredAt: '2026-08-11T14:15:00',
    checkedIn: false
  },
  {
    id: 'rsvp-103',
    fullName: 'Oliver Hughes',
    partyNickname: 'OllieRave',
    email: 'oliver.h@example.com',
    phone: '+44 7700-900821',
    birthDate: '2005-06-08',
    age: 21,
    isOver18: true,
    country: 'United Kingdom',
    countryCode: 'GB',
    state: 'England',
    city: 'London',
    ticketTier: 'GA_18_PLUS',
    musicVibes: ['Tech House & Deep House', '2000s & 2010s Club Anthems'],
    drinkPreference: 'Craft Beer & Hard Seltzers',
    hasPlusOne: true,
    plusOneName: 'Freya Davies',
    plusOneAge: 20,
    emergencyContactName: 'Sarah Hughes',
    emergencyContactPhone: '+1 (385) 260-0342',
    agreedToRules: true,
    agreedToIdCheck: true,
    passCode: 'NP-4412-LDN',
    registeredAt: '2026-08-12T11:05:00',
    checkedIn: false
  },
  {
    id: 'rsvp-104',
    fullName: 'Maya Tremblay',
    partyNickname: 'NeonMaya',
    email: 'maya.t@example.com',
    phone: '+1 514-555-0188',
    birthDate: '2003-09-02',
    age: 22,
    isOver18: true,
    country: 'Canada',
    countryCode: 'CA',
    state: 'Quebec',
    city: 'Montreal',
    ticketTier: 'VIP_LOUNGE',
    musicVibes: ['Peak-Time Techno & Melodic', 'EDM & Festival Bangers'],
    drinkPreference: 'Sober / Zero-Proof & Energy',
    hasPlusOne: false,
    emergencyContactName: 'Jean Tremblay',
    emergencyContactPhone: '+1 (385) 260-0342',
    agreedToRules: true,
    agreedToIdCheck: true,
    passCode: 'NP-7734-MTL',
    registeredAt: '2026-08-13T09:20:00',
    checkedIn: false
  },
  {
    id: 'rsvp-105',
    fullName: 'Lukas Meyer',
    partyNickname: 'BassLukas',
    email: 'lukas.m@example.com',
    phone: '+49 151-5550291',
    birthDate: '2001-04-18',
    age: 25,
    isOver18: true,
    country: 'Germany',
    countryCode: 'DE',
    state: 'Berlin',
    city: 'Berlin Mitte',
    ticketTier: 'BACKSTAGE_ACCESS',
    musicVibes: ['Peak-Time Techno & Melodic', 'Tech House & Deep House'],
    drinkPreference: 'BYOB (Personal Stash)',
    hasPlusOne: false,
    emergencyContactName: 'Hannah Meyer',
    emergencyContactPhone: '+1 (385) 260-0342',
    agreedToRules: true,
    agreedToIdCheck: true,
    passCode: 'NP-1928-BER',
    registeredAt: '2026-08-13T16:50:00',
    checkedIn: false
  }
];

export const SAFETY_AND_HOUSE_RULES = [
  {
    icon: 'ShieldCheck',
    title: 'Strictly 18+ Physical Photo ID Required',
    detail: 'Every guest must present a physical Government Passport, Drivers License, or National ID Card matching the party pass name at the door. Minors strictly prohibited.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Strict Consent & Safe Space Mandate',
    detail: 'Consent is enthusiastic, continuous, and mandatory. Look with respect and keep hands to yourself. Inappropriate touching, harassment, or non-consensual behavior results in immediate ejection and permanent blacklist.'
  },
  {
    icon: 'CameraOff',
    title: 'Zero Photography & Sealed Phone Cameras',
    detail: 'Complete privacy protection. All device cameras are covered with tamper-evident security seals at the door. Absolutely no photos, videos, or recording permitted anywhere.'
  },
  {
    icon: 'Shirt',
    title: 'Towel Hygiene & Secure Monitored Lockers',
    detail: 'Guests must bring or rent a clean towel to sit on whenever seated on furniture. Clean, monitored changing facilities and electronic lockers are provided.'
  },
  {
    icon: 'Droplets',
    title: 'Free Hydration & Electrolyte Stations',
    detail: 'Unlimited fresh cold water dispensers and electrolyte refreshments are available throughout all zones.'
  },
  {
    icon: 'PhoneCall',
    title: 'Consent Ambassadors & Harm Reduction Team',
    detail: 'Dedicated wellness crew and trained first-aid ambassadors are present all night to ensure everyone feels safe, comfortable, and respected.'
  }
];
