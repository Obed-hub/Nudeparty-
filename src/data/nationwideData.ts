import { DestinationCity, DestinationVenue, HotelLocation } from '../types';

export const ANYWHERE_USA_DESTINATION: DestinationCity = {
  id: 'usa_nationwide',
  name: 'Anywhere in USA',
  stateOrRegion: 'All 50 States',
  country: 'United States',
  countryCode: 'US',
  continent: 'North America',
  flagEmoji: '🇺🇸',
  currency: 'USD',
  currencySymbol: '$',
  minLegalAge: 18,
  legalAgeNote: '18+ for Totally Nude Cabarets • 21+ with Valid Photo ID',
  tagline: 'VIP Chauffeur Transit & Totally Nude Cabaret Reservations Nationwide',
  description: 'Book instant VIP passes, stage-front booths, and 100% complimentary luxury vehicle pickup in any city across all 50 US States.',
  imageGradient: 'from-amber-600 via-rose-950 to-black',
  byobAllowed: true,
  byobPolicyNote: 'Bring your own liquor bottles & beers with complimentary ice buckets, glassware, and mixers included.',
  limoFleetTypes: ['Executive Luxury Sedan', 'Cadillac Escalade ESV', 'Mercedes Executive Sprinter', 'VIP Party Bus'],
  emergencyHostPhone: '+1 (385) 260-0342',
  hostName: 'National VIP Concierge Dispatch',
  popularOccasions: ['Bachelor Party', 'Birthday Bash', 'Guys Weekend', 'Divorce Party', 'Couples Night'],
  featuredVenues: [
    {
      id: 'usa_little_darlings_nationwide',
      name: 'Little Darlings Nude Party • USA Nationwide',
      venueType: '18+ Totally Nude Cabaret',
      neighborhood: 'Downtown / Metro Entertainment District',
      rating: 4.9,
      reviewsCount: 5420,
      imageGradient: 'from-amber-600 via-rose-700 to-zinc-950',
      dressCode: 'Nightlife Casual / Fitted Collared Shirts Encouraged',
      minAge: 18,
      description: 'America’s premier 18+ totally nude cabaret network with 50+ entertainers nightly, VIP bottle booths, and complimentary luxury vehicle hotel dispatch.',
      highlightPerk: '100% Free Roundtrip VIP Pickup + Front of Line VIP Entry',
      address: 'Available in Every Major US City & Metro Area',
      hours: '8:00 PM – 6:00 AM (7 Nights a Week)',
      byobFriendly: true,
      bottleServiceAvail: true
    },
    {
      id: 'usa_velvet_penthouse_nationwide',
      name: 'Velvet VIP Ultra Lounge • USA',
      venueType: '21+ Ultra Strip Lounge',
      neighborhood: 'Uptown VIP Corridor',
      rating: 4.8,
      reviewsCount: 3180,
      imageGradient: 'from-purple-700 via-pink-800 to-zinc-950',
      dressCode: 'Upscale Evening Attire',
      minAge: 21,
      description: 'Exclusive multi-level VIP suites, premium hookah, bottle sparkler service, and private curtained rooms across top US metro hubs.',
      highlightPerk: 'Reserved Leather Runway Booth + Dedicated VIP Server',
      address: 'Premier Nightlife Corridor, Nationwide USA',
      hours: '9:00 PM – 5:00 AM',
      byobFriendly: false,
      bottleServiceAvail: true
    }
  ],
  topHotels: [
    {
      id: 'usa_hotel_0',
      name: 'Your Hotel / Resort Front Valet',
      area: 'City Center / Downtown',
      pickupSpot: 'Main Front Valet / Chauffeur Dropoff Area',
      estDriveMinutes: 10,
      popular: true
    },
    {
      id: 'usa_hotel_1',
      name: 'Custom Airbnb / Private Residence',
      area: 'Metro Residential Area',
      pickupSpot: 'Front Entrance / Curbside Pickup',
      estDriveMinutes: 12,
      popular: true
    },
    {
      id: 'usa_hotel_2',
      name: 'Airport Arrival Terminal',
      area: 'International / Regional Airport',
      pickupSpot: 'Passenger Pickup / VIP Staging Area',
      estDriveMinutes: 15,
      popular: false
    }
  ]
};
