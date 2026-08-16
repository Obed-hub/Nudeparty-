export type VIPPackageId = 
  | 'silver_starter' 
  | 'weekend_all_access'
  | 'gold_bachelor' 
  | 'platinum_highroller' 
  | 'couples_fantasy' 
  | 'baller_penthouse' 
  | 'fastpass_express' 
  | 'champagne_suite'
  | 'cabana_private'
  | 'yacht_vip_dayclub'
  | 'rooftop_skyline_pass'
  | 'afterhours_underground';

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'MXN' | 'JPY' | 'AED' | 'BRL' | 'THB';

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  flag: string;
  rateToUSD: number; // e.g. 1 USD = rate units of target currency
}

export interface VIPPackage {
  id: VIPPackageId;
  name: string;
  subtitle: string;
  tag?: string;
  price: number; // in USD base
  depositAmount: number; // in USD base
  minGuests: number;
  maxGuests: number;
  pricePerPersonEst: number;
  badgeColor: 'gold' | 'magenta' | 'amber' | 'emerald' | 'purple' | 'cyan' | 'rose' | 'blue';
  recommendedFor: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  shortDesc: string;
  inclusions: string[];
  limoIncluded: boolean;
  limoType: string;
  bottlesIncluded: string;
  stageCashIncluded: number;
  vipRoomMinutes: number;
  hookahIncluded: boolean;
  coverWaived: boolean;
}

export interface DestinationVenue {
  id: string;
  name: string;
  venueType: '18+ Totally Nude Cabaret' | '21+ Ultra Strip Lounge' | 'Mega Dayclub & Pool' | 'VIP Rooftop Nightclub' | 'Luxury Yacht / Penthouse' | 'Underground Afterhours';
  neighborhood: string;
  rating: number;
  reviewsCount: number;
  imageGradient: string;
  dressCode: string;
  minAge: number;
  description: string;
  highlightPerk: string;
  address: string;
  hours: string;
  byobFriendly: boolean;
  bottleServiceAvail: boolean;
}

export interface HotelLocation {
  id: string;
  name: string;
  area: string;
  pickupSpot: string;
  estDriveMinutes: number;
  popular: boolean;
}

export interface DestinationCity {
  id: string;
  name: string;
  stateOrRegion: string;
  country: string;
  countryCode: string;
  continent: 'North America' | 'Europe' | 'Asia' | 'Latin America' | 'Middle East' | 'Oceania';
  flagEmoji: string;
  currency: SupportedCurrency;
  currencySymbol: string;
  minLegalAge: number;
  legalAgeNote: string;
  tagline: string;
  description: string;
  imageGradient: string;
  featuredVenues: DestinationVenue[];
  topHotels: HotelLocation[];
  byobAllowed: boolean;
  byobPolicyNote: string;
  limoFleetTypes: string[];
  emergencyHostPhone: string;
  hostName: string;
  popularOccasions: string[];
}

export interface AddOnOption {
  id: string;
  name: string;
  category: 'singles_cash' | 'hookah' | 'stage_experience' | 'vip_room' | 'merch' | 'yacht_transfer' | 'security_detail';
  price: number; // USD base
  description: string;
  icon: string;
}

export interface BookingReservation {
  id: string;
  confirmationCode: string;
  destinationCityId: string;
  destinationCityName: string;
  destinationCountry: string;
  venueName: string;
  guestName: string;
  email: string;
  phone: string;
  partySize: number;
  eventDate: string; // YYYY-MM-DD
  timeSlot: string;
  packageId: VIPPackageId;
  packageName: string;
  basePackagePriceUSD: number;
  selectedCurrency: SupportedCurrency;
  currencySymbol: string;
  exchangeRate: number;
  basePackagePriceConverted: number;
  selectedAddOns: {
    addOnId: string;
    name: string;
    priceUSD: number;
    priceConverted: number;
    qty: number;
  }[];
  hotelPickup: {
    required: boolean;
    hotelName: string;
    roomOrEntrance: string;
    pickupTime: string;
    liquorStoreStop: boolean;
    vehicleType: string;
  };
  totalAmountUSD: number;
  totalAmountConverted: number;
  depositPaidUSD: number;
  depositPaidConverted: number;
  balanceDueAtDoorConverted: number;
  costPerPersonConverted: number;
  customNotes?: string;
  occasion: 'Bachelor Party' | 'Bachelorette Party' | 'Birthday Bash' | 'Guys Night Out' | 'Couples Night' | 'Divorce Party' | 'Solo VIP' | 'Corporate VIP' | 'Other';
  paymentChoice: 'bitcoin_anonymous';
  bitcoinPayment?: {
    btcAmount: number;
    btcAddress: string;
    txHash?: string;
    isPaid: boolean;
  };
  status: 'CONFIRMED' | 'LIMO_DISPATCHED' | 'CHECKED_IN';
  limoStatus: {
    assigned: boolean;
    chauffeurName: string;
    chauffeurPhone: string;
    vehicleType: string;
    licensePlate: string;
    etaMinutes: number;
  };
  createdAt: string;
}

export interface PerformerProfile {
  id: string;
  stageName: string;
  cityId: string;
  cityName: string;
  tagline: string;
  specialty: string;
  stageTime: string;
  shift: 'Evening (8PM-12AM)' | 'Late Night (12AM-4AM)' | 'Afterhours (4AM-6AM)';
  rating: number;
  reviewsCount: number;
  avatarGradient: string;
  imageUrl?: string;
  bio: string;
  favoriteMusic: string;
  badges: string[];
}

export interface DrinkMixerItem {
  id: string;
  name: string;
  category: 'Mixers & Carafes' | 'Red Bull & Energy' | 'Water & Hydration' | 'Exotic Hookah' | 'Ice & Fruit Platters' | 'Champagne & Spirits';
  priceUSD: number;
  description: string;
  volume: string;
  popular?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
  category: 'Free Pickup & Transit' | 'Global Limo Service' | '18+ vs 21+ Age Rules' | 'BYOB & Bottle Service' | 'VIP Packages' | 'Bachelor Trips' | 'International Etiquette';
}

// Backward Compatibility Types for clean builds
export type TicketTier = 'GA_18_PLUS' | 'VIP_LOUNGE' | 'BACKSTAGE_ACCESS' | 'EARLY_BIRD';

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  states: {
    name: string;
    code: string;
    cities: string[];
  }[];
}

export interface UserLocation {
  country: string;
  countryCode: string;
  state: string;
  stateCode?: string;
  flag?: string;
  updatedAt?: string;
}

export interface RSVPData {
  id: string;
  fullName: string;
  partyNickname: string;
  email: string;
  phone: string;
  birthDate: string;
  age: number;
  isOver18: boolean;
  country: string;
  countryCode: string;
  state: string;
  city: string;
  postalCode?: string;
  ticketTier: TicketTier;
  musicVibes: string[];
  drinkPreference: string;
  hasPlusOne: boolean;
  plusOneName?: string;
  plusOneAge?: number;
  dietaryNotes?: string;
  comfortLevel?: string;
  songRequestTitle?: string;
  songRequestArtist?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  agreedToRules: boolean;
  agreedToIdCheck: boolean;
  agreedToConsentPolicy?: boolean;
  agreedToNoCameraPolicy?: boolean;
  passCode: string;
  registeredAt: string;
  checkedIn: boolean;
}

export interface DJPerformer {
  id: string;
  name: string;
  handle: string;
  stage: string;
  timeSlot: string;
  genre: string;
  bio: string;
  accentColor: string;
}

export interface SongRequest {
  id: string;
  title: string;
  artist: string;
  requestedBy: string;
  genre: string;
  votes: number;
  status: 'QUEUED' | 'PLAYING_NEXT' | 'PLAYED';
  timestamp: string;
}

export interface PartyEvent {
  title: string;
  tagline: string;
  date: string;
  isoDate: string;
  time: string;
  venueName: string;
  address: string;
  cityState: string;
  minAge: number;
  dressCode: string;
  capacityLimit: number;
  currentRsvpCount: number;
  theme: string;
}
