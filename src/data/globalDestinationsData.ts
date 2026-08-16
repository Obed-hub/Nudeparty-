import { DestinationCity, CurrencyConfig, VIPPackage, AddOnOption, PerformerProfile, DrinkMixerItem, FaqItem, BookingReservation } from '../types';
import { GLOBAL_VIP_PACKAGES } from './vipPackagesData';

export { GLOBAL_VIP_PACKAGES };

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rateToUSD: 1.0 },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rateToUSD: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rateToUSD: 0.79 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', flag: '🇨🇦', rateToUSD: 1.36 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rateToUSD: 1.52 },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso', flag: '🇲🇽', rateToUSD: 18.2 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', rateToUSD: 155.0 },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', flag: '🇦🇪', rateToUSD: 3.67 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷', rateToUSD: 5.45 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: '🇹🇭', rateToUSD: 36.5 }
];

export const GLOBAL_DESTINATIONS: DestinationCity[] = [
  // --- UNITED STATES NATIONWIDE ---
  {
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
    legalAgeNote: '18+ for Totally Nude Cabarets • 21+ with physical photo ID',
    tagline: 'VIP Chauffeur Transit & Totally Nude Cabaret Reservations Nationwide',
    description: 'Book instant VIP passes, stage-front booths, and 100% complimentary luxury vehicle pickup in any city across all 50 US States.',
    imageGradient: 'from-amber-600 via-rose-950 to-black',
    byobAllowed: true,
    byobPolicyNote: 'Bring your own liquor bottles & beers with zero corkage fees + complimentary craft ice and mixer buckets.',
    limoFleetTypes: ['Luxury Executive Sedan', 'Cadillac Escalade ESV', 'Hummer H2 Party Bus', 'Mercedes Sprinter Lounge'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'National VIP Concierge Dispatch',
    popularOccasions: ['Bachelor Party', 'Birthday Bash', 'Guys Weekend', 'Couples Fantasy'],
    featuredVenues: [
      {
        id: 'usa_little_darlings_nationwide',
        name: 'Little Darlings Nude Party • USA Nationwide',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Downtown / Metro Entertainment District',
        rating: 4.9,
        reviewsCount: 5420,
        imageGradient: 'from-amber-600 to-rose-700',
        dressCode: 'Nightlife Casual / Fitted Collared Shirts',
        minAge: 18,
        description: 'America’s premier 18+ totally nude mega cabaret network with 3 live performance stages, 100+ entertainers nightly, and private VIP suites in every US city.',
        highlightPerk: 'Free Roundtrip Hotel Pickup + Retail Liquor Store Stop',
        address: 'Every Major US City & Metro Area, USA',
        hours: '8:00 PM – 6:00 AM (7 Days a Week)',
        byobFriendly: true,
        bottleServiceAvail: true
      },
      {
        id: 'usa_sapphire_skybox',
        name: 'Sapphire Ultra Lounge USA',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Metropolitan Strip Corridor',
        rating: 4.8,
        reviewsCount: 3100,
        imageGradient: 'from-purple-700 to-zinc-900',
        dressCode: 'Upscale Evening Attire',
        minAge: 21,
        description: 'Multi-level luxury VIP skyboxes with dedicated table bottle hostesses, plush leather booths, and premium craft hookahs.',
        highlightPerk: 'Private Elevators, Glass Skybox Seating & Sparkler Shows',
        address: 'Downtown Entertainment Center, USA',
        hours: '9:00 PM – 5:00 AM',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      {
        id: 'usa_hotel_0',
        name: 'Your Hotel / Resort Front Valet',
        area: 'Downtown / Metro Area',
        pickupSpot: 'Main Front Valet / Chauffeur Dropoff Area',
        estDriveMinutes: 10,
        popular: true
      },
      {
        id: 'usa_hotel_1',
        name: 'Custom Airbnb / Private Residence',
        area: 'Residential / City Metro',
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
  },
  {
    id: 'las_vegas',
    name: 'Las Vegas',
    stateOrRegion: 'Nevada',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    flagEmoji: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    minLegalAge: 18,
    legalAgeNote: '18+ for Totally Nude Cabarets • 21+ with physical photo ID',
    tagline: 'World Capital of Totally Nude Cabarets & VIP Nightlife',
    description: 'Home to world-renowned 18+ totally nude cabarets, BYOB freedom, complimentary luxury vehicle hotel pickups, and iconic bachelor party stages.',
    imageGradient: 'from-amber-600 via-rose-950 to-black',
    byobAllowed: true,
    byobPolicyNote: 'Bring your own liquor bottles & beers with zero corkage fees + complimentary craft ice and mixer buckets.',
    limoFleetTypes: ['Luxury Executive Sedan', 'Cadillac Escalade ESV', 'Hummer H2 Party Bus', 'Mercedes Sprinter Lounge'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Marcus Vance (Head VIP Host)',
    popularOccasions: ['Bachelor Party', 'Birthday Bash', 'Guys Weekend', 'Couples Fantasy'],
    featuredVenues: [
      {
        id: 'lv_little_darlings',
        name: 'Little Darlings Nude Party',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'North Strip / Western Corridor',
        rating: 4.9,
        reviewsCount: 3840,
        imageGradient: 'from-amber-600 to-rose-700',
        dressCode: 'Upscale Casual / Collared or Fitted Shirts',
        minAge: 18,
        description: 'World-famous 18+ totally nude mega cabaret with 3 live performance stages, 100+ entertainers nightly, and private VIP suites.',
        highlightPerk: 'Free Roundtrip Hotel Pickup + Retail Liquor Store Stop',
        address: '1514 Western Ave, NV 89102',
        hours: '8:00 PM – 6:00 AM (7 Days a Week)',
        byobFriendly: true,
        bottleServiceAvail: true
      },
      {
        id: 'lv_sapphire_skybox',
        name: 'Sapphire World Ultra Club',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Industrial Rd Corridor',
        rating: 4.8,
        reviewsCount: 2950,
        imageGradient: 'from-blue-600 to-indigo-950',
        dressCode: 'Smart Casual / No Athletic Wear',
        minAge: 21,
        description: 'Over 70,000 sq ft of multi-level entertainment, luxury skyboxes, private pool cabanas, and world-class entertainers.',
        highlightPerk: 'Complimentary Tesla Model X & Escalade Valet Shuttle',
        address: '3025 Sammy Davis Jr Dr, Las Vegas, NV',
        hours: '24 Hours (Thurs - Sun)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'lv_bellagio', name: 'Bellagio Resort & Casino', area: 'Mid Strip', pickupSpot: 'Main Valet Lower Level Porte-Cochère', estDriveMinutes: 8, popular: true },
      { id: 'lv_cosmo', name: 'The Cosmopolitan of Las Vegas', area: 'Mid Strip', pickupSpot: 'Underground Valet & Tour Lobby', estDriveMinutes: 9, popular: true },
      { id: 'lv_caesars', name: 'Caesars Palace', area: 'Mid Strip', pickupSpot: 'Main Colosseum Valet Circle', estDriveMinutes: 7, popular: true },
      { id: 'lv_aria', name: 'Aria Resort & Casino', area: 'South Strip', pickupSpot: 'North Valet Pick-Up Area', estDriveMinutes: 10, popular: true },
      { id: 'lv_wynn', name: 'Wynn & Encore Las Vegas', area: 'North Strip', pickupSpot: 'South Gate Tower Valet', estDriveMinutes: 5, popular: true },
      { id: 'lv_resorts_world', name: 'Resorts World Las Vegas', area: 'North Strip', pickupSpot: 'Hilton / Crockfords Grand Entrance', estDriveMinutes: 4, popular: true },
      { id: 'lv_circa', name: 'Circa Resort & Casino', area: 'Downtown Fremont', pickupSpot: 'Garage Mahalah 1st Floor Rideshare', estDriveMinutes: 8, popular: true },
      { id: 'lv_mgm_grand', name: 'MGM Grand Hotel & Casino', area: 'South Strip', pickupSpot: 'Main Entrance & Strip Valet', estDriveMinutes: 11, popular: true }
    ]
  },

  {
    id: 'miami',
    name: 'Miami',
    stateOrRegion: 'Florida',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    flagEmoji: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    minLegalAge: 21,
    legalAgeNote: '21+ Strictly Enforced • International Passports or US Driver’s License Required',
    tagline: 'South Beach Ultra Lounges, 24-Hour Mega Clubs & Superyacht VIPs',
    description: 'Legendary 24/7 nightlife capital featuring neon-soaked ultra cabarets, waterfront superyacht pre-parties, and multi-tier VIP bottle service.',
    imageGradient: 'from-pink-600 via-purple-900 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Top-Shelf Bottle Service with premium mixers, champagne sparkler parades, and dedicated VIP hostesses.',
    limoFleetTypes: ['Cadillac Escalade Platinum', 'Rolls Royce Cullinan SUV', 'Mercedes-Benz G-Wagon VIP', '32-Pax Luxury Party Bus'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Carlos Santoro (Miami VIP Director)',
    popularOccasions: ['Bachelor Party', 'Yacht & Club Weekend', 'Bachelorette Bash', 'Celebrity VIP Table'],
    featuredVenues: [
      {
        id: 'mia_e11even',
        name: 'E11EVEN Miami Ultraclub',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Downtown Miami / Park West',
        rating: 4.9,
        reviewsCount: 5200,
        imageGradient: 'from-fuchsia-600 to-purple-900',
        dressCode: 'Upscale Chic / Nightlife Glamour',
        minAge: 21,
        description: '24-hour dayclub/nightclub powerhouse featuring world-famous trapeze artists, EDM DJs, and five-star VIP hospitality.',
        highlightPerk: 'Rooftop Lounge Fast-Pass & 24/7 Chauffeur Service',
        address: '29 NE 11th St, Miami, FL 33132',
        hours: 'Open 24 Hours / 7 Days a Week',
        byobFriendly: false,
        bottleServiceAvail: true
      },
      {
        id: 'mia_tootsies',
        name: 'Tootsie’s Cabaret World',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Miami Gardens / North Miami',
        rating: 4.8,
        reviewsCount: 3100,
        imageGradient: 'from-rose-600 to-amber-800',
        dressCode: 'Smart Casual / Fitted Attire',
        minAge: 21,
        description: 'The world’s largest adult entertainment complex with over 74,000 sq ft, full sports skybox suites, and private dining.',
        highlightPerk: 'Complimentary Mercedes Sprinter Hotel Shuttle',
        address: '150 NW 183rd St, Miami, FL 33169',
        hours: '12:00 PM – 6:00 AM Daily',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'mia_fontainebleau', name: 'Fontainebleau Miami Beach', area: 'Mid Beach', pickupSpot: 'Château Main Porte-Cochère', estDriveMinutes: 14, popular: true },
      { id: 'mia_1hotel', name: '1 Hotel South Beach', area: 'South Beach', pickupSpot: 'Collins Ave Valet Loop', estDriveMinutes: 16, popular: true },
      { id: 'mia_faena', name: 'Faena Hotel Miami Beach', area: 'Mid Beach', pickupSpot: 'Gold Gilded Main Entrance', estDriveMinutes: 15, popular: true },
      { id: 'mia_w_south_beach', name: 'W South Beach', area: 'South Beach', pickupSpot: '2201 Collins Ave Valet Circle', estDriveMinutes: 17, popular: true },
      { id: 'mia_brickell_four_seasons', name: 'Four Seasons Hotel Miami', area: 'Brickell Financial', pickupSpot: 'Brickell Ave Valet Motor Court', estDriveMinutes: 10, popular: true }
    ]
  },

  {
    id: 'new_york',
    name: 'New York City',
    stateOrRegion: 'New York',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    flagEmoji: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    minLegalAge: 21,
    legalAgeNote: '21+ with Valid State ID or International Passport',
    tagline: 'Manhattan Skybox Suites, Wall Street Lounges & Midtown Cabarets',
    description: 'High-energy Manhattan nightlife with prime steakhouse dining, multi-level Midtown gentlemen’s clubs, and executive black car service.',
    imageGradient: 'from-blue-900 via-indigo-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Bar & Premium Wine Cellar with bespoke champagne magnum packages and cigar lounge access.',
    limoFleetTypes: ['Cadillac Escalade ESV', 'Lincoln Continental Executive Car', 'Mercedes Maybach S-Class', 'Manhattan Luxury Sprinter'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Dominic Russo (Manhattan VIP Host)',
    popularOccasions: ['Bachelor Party', 'Corporate Executive Night', 'Birthday Celebration', 'Late-Night Afterparty'],
    featuredVenues: [
      {
        id: 'nyc_sapphire_39',
        name: 'Sapphire 39 Midtown Cabaret',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Midtown Manhattan',
        rating: 4.8,
        reviewsCount: 2200,
        imageGradient: 'from-blue-700 to-indigo-900',
        dressCode: 'Jacket Preferred / Upscale Fashion',
        minAge: 21,
        description: 'Premier 3-story Midtown club with world-class dining, SWS steakhouse, private skyboxes, and VIP hostesses.',
        highlightPerk: 'Priority Midtown Luxury Sedan / Escalade Pickup',
        address: '20 W 39th St, New York, NY 10018',
        hours: '4:00 PM – 4:00 AM (Mon - Sun)',
        byobFriendly: false,
        bottleServiceAvail: true
      },
      {
        id: 'nyc_ricks_cabaret',
        name: 'Rick’s Cabaret NYC',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Times Square / Herald Square',
        rating: 4.7,
        reviewsCount: 1950,
        imageGradient: 'from-amber-600 to-red-950',
        dressCode: 'Upscale Business / Collared Attire',
        minAge: 21,
        description: 'Iconic 4-level adult entertainment club with a Michelin-level steakhouse, cigar terrace, and VIP suites.',
        highlightPerk: 'Skip The Line VIP Host Greeter at Door',
        address: '50 W 33rd St, New York, NY 10001',
        hours: '12:00 PM – 4:00 AM Daily',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'nyc_plaza', name: 'The Plaza Hotel Fifth Avenue', area: 'Central Park South', pickupSpot: 'Grand Army Plaza Main Entrance', estDriveMinutes: 12, popular: true },
      { id: 'nyc_edition', name: 'The New York EDITION', area: 'Flatiron / Madison Sq', pickupSpot: 'Madison Ave Valet Loop', estDriveMinutes: 8, popular: true },
      { id: 'nyc_standard', name: 'The Standard High Line', area: 'Meatpacking District', pickupSpot: 'Washington St Valet Area', estDriveMinutes: 14, popular: true },
      { id: 'nyc_baccarat', name: 'Baccarat Hotel New York', area: 'Midtown West', pickupSpot: '53rd St Private Motor Court', estDriveMinutes: 10, popular: true }
    ]
  },

  {
    id: 'los_angeles',
    name: 'Los Angeles / Hollywood',
    stateOrRegion: 'California',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    flagEmoji: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    minLegalAge: 21,
    legalAgeNote: '21+ with Valid Photo ID • Top Hollywood & Sunset Strip Venues',
    tagline: 'Hollywood Glamour, Beverly Hills Chauffeurs & Sunset Strip Venues',
    description: 'Experience celebrity-favorite Hollywood entertainment venues with red carpet champagne service and luxury Sprinter transport across Beverly Hills and West Hollywood.',
    imageGradient: 'from-orange-600 via-rose-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Top-Shelf Bottle Service & Craft Cocktails with dedicated VIP host service.',
    limoFleetTypes: ['Cadillac Escalade ESV', 'Rolls Royce Ghost', 'Mercedes Sprinter Lounge Bus'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Tyler Blake (LA Host Director)',
    popularOccasions: ['Bachelor Party', 'Birthday VIP', 'Celebrity Night', 'Guys Night'],
    featuredVenues: [
      {
        id: 'la_crazy_girls',
        name: 'Crazy Girls Hollywood',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Hollywood / Sunset Blvd',
        rating: 4.8,
        reviewsCount: 1840,
        imageGradient: 'from-red-600 to-rose-950',
        dressCode: 'Hollywood Trendy / Stylish Casual',
        minAge: 21,
        description: 'Legendary Hollywood staple famous for high-energy stage performances, celebrity appearances, and luxury booths.',
        highlightPerk: 'Complimentary Beverly Hills & Hollywood Chauffeur Pickup',
        address: '1433 N La Brea Ave, Los Angeles, CA 90028',
        hours: '8:00 PM – 4:00 AM (Wed - Sun)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'la_chateau', name: 'Chateau Marmont', area: 'West Hollywood', pickupSpot: 'Sunset Blvd Valet Gate', estDriveMinutes: 10, popular: true },
      { id: 'la_beverly_hills_hotel', name: 'The Beverly Hills Hotel', area: 'Beverly Hills', pickupSpot: 'Red Carpet Main Porte-Cochère', estDriveMinutes: 15, popular: true },
      { id: 'la_edition_weho', name: 'The West Hollywood EDITION', area: 'West Hollywood', pickupSpot: 'Sunset Blvd Valet Loop', estDriveMinutes: 11, popular: true },
      { id: 'la_roosevelt', name: 'The Hollywood Roosevelt', area: 'Hollywood Blvd', pickupSpot: 'Orange Dr Valet Entrance', estDriveMinutes: 6, popular: true }
    ]
  },

  {
    id: 'atlanta',
    name: 'Atlanta',
    stateOrRegion: 'Georgia',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    flagEmoji: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    minLegalAge: 21,
    legalAgeNote: '21+ Valid ID Required • Culture Capital of Trap & VIP Stages',
    tagline: 'Home of Legendary Stage Culture, Money Guns & World-Famous Hospitality',
    description: 'Atlanta’s nightlife is unmatched worldwide for high-energy music, world-famous lemon pepper wings, LED cash guns, and superstar VIP lounges.',
    imageGradient: 'from-amber-600 via-red-900 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full VIP Bottle Service + Award-Winning Kitchen with famous wings and gourmet dining.',
    limoFleetTypes: ['Cadillac Escalade ESV', 'Mercedes Benz Sprinter Van', 'Hummer H2 Party Transit'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Trevor King (Atlanta VIP Host)',
    popularOccasions: ['Bachelor Party', 'Birthday Bash', 'Sports Weekend', 'Music VIP Night'],
    featuredVenues: [
      {
        id: 'atl_magic_city',
        name: 'Magic City Atlanta',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Downtown Atlanta',
        rating: 4.9,
        reviewsCount: 4600,
        imageGradient: 'from-amber-500 to-purple-950',
        dressCode: 'Casual Trendy / No Plain White Tees',
        minAge: 21,
        description: 'World-famous hip-hop cultural landmark known for legendary stage talent, celebrity DJ sets, and world-renowned food.',
        highlightPerk: 'Complimentary VIP Escort & Front Table Access',
        address: '241 Forsyth St SW, Atlanta, GA 30303',
        hours: '3:00 PM – 4:00 AM (Mon - Sun)',
        byobFriendly: false,
        bottleServiceAvail: true
      },
      {
        id: 'atl_cheetah',
        name: 'The Cheetah Lounge',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Midtown Atlanta',
        rating: 4.8,
        reviewsCount: 2300,
        imageGradient: 'from-orange-500 to-red-900',
        dressCode: 'Upscale Casual / Collared Shirts',
        minAge: 21,
        description: 'High-end multi-million dollar club offering fine dining, aerial dancers, and premier VIP bottle suites.',
        highlightPerk: 'Roundtrip Midtown / Buckhead Chauffeur Service',
        address: '887 Spring St NW, Atlanta, GA 30308',
        hours: '11:30 AM – 3:00 AM Daily',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'atl_st_regis', name: 'The St. Regis Atlanta', area: 'Buckhead', pickupSpot: 'Main Plaza Porte-Cochère', estDriveMinutes: 16, popular: true },
      { id: 'atl_w_midtown', name: 'W Atlanta - Midtown', area: 'Midtown', pickupSpot: '14th St Valet Entrance', estDriveMinutes: 8, popular: true },
      { id: 'atl_omni_cnn', name: 'Omni Atlanta Hotel at CNN Center', area: 'Downtown', pickupSpot: 'Andrew Young Blvd Valet', estDriveMinutes: 5, popular: true }
    ]
  },

  {
    id: 'new_orleans',
    name: 'New Orleans',
    stateOrRegion: 'Louisiana',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    flagEmoji: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    minLegalAge: 18,
    legalAgeNote: '18+ for 100% Nude Cabarets • 21+ for Full Bar Service',
    tagline: 'Bourbon Street VIP Penthouse, French Quarter VIP Transit & Live Brass Stages',
    description: 'The historic playground for bachelor parties with legendary 18+ totally nude French Quarter cabarets and open-container parade energy.',
    imageGradient: 'from-purple-700 via-amber-900 to-black',
    byobAllowed: true,
    byobPolicyNote: 'Select venues support BYOB packages or unlimited VIP hurricane & craft mixer setups.',
    limoFleetTypes: ['Cadillac Escalade ESV', 'French Quarter Party Bus', 'Executive Luxury Sedan'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Antoine Broussard (NOLA VIP Director)',
    popularOccasions: ['Bachelor Party', 'Mardi Gras VIP', 'Birthday Bash', 'French Quarter Crawl'],
    featuredVenues: [
      {
        id: 'nola_bourbon_vip',
        name: 'Bourbon Street Royal Cabaret',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'French Quarter / Bourbon St',
        rating: 4.8,
        reviewsCount: 2100,
        imageGradient: 'from-purple-600 to-amber-700',
        dressCode: 'Casual & Comfortable / Festive',
        minAge: 18,
        description: 'Multi-level Bourbon Street venue featuring private balconies overlooking the parade, center stage roasts, and top entertainers.',
        highlightPerk: 'Private Balcony Bourbon St Viewing Access',
        address: '320 Bourbon St, New Orleans, LA 70130',
        hours: '4:00 PM – 5:00 AM (Daily)',
        byobFriendly: true,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'nola_roosevelt', name: 'The Roosevelt New Orleans (Waldorf Astoria)', area: 'Central Business District', pickupSpot: 'Baronne St Valet Porte-Cochère', estDriveMinutes: 6, popular: true },
      { id: 'nola_ritz', name: 'The Ritz-Carlton New Orleans', area: 'French Quarter Border', pickupSpot: 'Canal St Valet Motor Court', estDriveMinutes: 5, popular: true },
      { id: 'nola_monteleone', name: 'Hotel Monteleone', area: 'French Quarter', pickupSpot: 'Royal St Valet Area', estDriveMinutes: 4, popular: true }
    ]
  },

  // --- TOP INTERNATIONAL DESTINATIONS ---
  {
    id: 'london',
    name: 'London',
    stateOrRegion: 'England',
    country: 'United Kingdom',
    countryCode: 'GB',
    continent: 'Europe',
    flagEmoji: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    minLegalAge: 18,
    legalAgeNote: '18+ Strictly with Valid Passport or UK Driver’s Licence',
    tagline: 'Mayfair VIP Lounges, Soho Gentlemen’s Clubs & Chauffeur Rolls Royce',
    description: 'Experience Europe’s premier gentlemen’s clubs in Mayfair, Piccadilly, and Soho with discreet Mayfair black car chauffeurs and fine champagne cellars.',
    imageGradient: 'from-slate-700 via-indigo-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Champagne Bar with Dom Pérignon, Armand de Brignac (Ace of Spades), and crystal glassware service.',
    limoFleetTypes: ['Mercedes-Benz S-Class Chauffeur', 'Range Rover Autobiography', 'Mercedes V-Class VIP Exec', 'Rolls Royce Phantom'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Alistair Sterling (London VIP Concierge)',
    popularOccasions: ['Stag Party (Bachelor)', 'Birthday Weekend', 'Corporate VIP Hospitality', 'Gentlemen’s Night Out'],
    featuredVenues: [
      {
        id: 'lon_spearmint_rhino',
        name: 'Spearmint Rhino London',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Tottenham Court Rd / West End',
        rating: 4.8,
        reviewsCount: 2400,
        imageGradient: 'from-blue-800 to-indigo-950',
        dressCode: 'Smart Casual / No Sportswear',
        minAge: 18,
        description: 'London’s premier adult entertainment venue offering world-class dancers, luxury VIP suites, and exceptional Mayfair dining.',
        highlightPerk: 'Complimentary West End & Mayfair Mercedes Pickup',
        address: '161 Tottenham Court Rd, London W1T 7NN',
        hours: '8:00 PM – 4:00 AM (Mon - Sat)',
        byobFriendly: false,
        bottleServiceAvail: true
      },
      {
        id: 'lon_windmill_soho',
        name: 'The Windmill Soho VIP',
        venueType: '21+ Ultra Strip Lounge',
        neighborhood: 'Soho / West End',
        rating: 4.9,
        reviewsCount: 1850,
        imageGradient: 'from-rose-800 to-zinc-950',
        dressCode: 'Glamour & Sophistication',
        minAge: 18,
        description: 'Immersive cabaret dining theatre and ultra-exclusive late-night subterranean cocktail lounge.',
        highlightPerk: 'Private VIP Box & Headliner Stage Table',
        address: '17-19 Great Windmill St, London W1D 7JZ',
        hours: '7:00 PM – 3:30 AM',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'lon_ritz', name: 'The Ritz London', area: 'Piccadilly / Mayfair', pickupSpot: 'Main Piccadilly Porte-Cochère', estDriveMinutes: 9, popular: true },
      { id: 'lon_savoy', name: 'The Savoy London', area: 'Strand / Covent Garden', pickupSpot: 'Savoy Court Private Forecourt', estDriveMinutes: 8, popular: true },
      { id: 'lon_dorchester', name: 'The Dorchester', area: 'Mayfair / Park Lane', pickupSpot: 'Park Lane Main Entrance', estDriveMinutes: 11, popular: true },
      { id: 'lon_shangri_la', name: 'Shangri-La The Shard', area: 'London Bridge / Southwark', pickupSpot: 'St Thomas St Valet Loop', estDriveMinutes: 15, popular: true }
    ]
  },

  {
    id: 'montreal',
    name: 'Montreal',
    stateOrRegion: 'Quebec',
    country: 'Canada',
    countryCode: 'CA',
    continent: 'North America',
    flagEmoji: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'CA$',
    minLegalAge: 18,
    legalAgeNote: '18+ Legal Age • Renowned Worldwide for Contact Dancers & Bachelor Culture',
    tagline: 'World’s #1 Bachelor Party Hub with Full Contact Dancers & Downtown VIP Transit',
    description: 'Montreal is globally famed for having the most progressive cabaret laws in the Western world, featuring full contact dancing, vibrant nightlife, and epic stag weekends.',
    imageGradient: 'from-red-700 via-rose-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Bar with Canadian craft brews, premium champagne bottle service, and shooter trays.',
    limoFleetTypes: ['Lincoln Navigator VIP', 'Cadillac Escalade ESV', 'Montreal Stag Party Bus'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Jean-Luc Tremblay (Montreal Stag Master)',
    popularOccasions: ['Bachelor Party (Stag)', 'Birthday Weekend', 'Grand Prix VIP', 'Hockey Weekend'],
    featuredVenues: [
      {
        id: 'mtl_chez_paree',
        name: 'Chez Parée Club',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Downtown Montreal / Rue Stanley',
        rating: 4.9,
        reviewsCount: 3900,
        imageGradient: 'from-red-600 to-amber-900',
        dressCode: 'Smart Casual / Fitted Shirts',
        minAge: 18,
        description: 'Montreal’s undisputed crown jewel club operating since 1953 with gorgeous entertainers, luxury VIP booths, and legendary stag atmosphere.',
        highlightPerk: 'Complimentary Downtown Hotel VIP Pickup',
        address: '1258 Rue Stanley, Montréal, QC H3B 2S7',
        hours: '4:00 PM – 3:00 AM (7 Days a Week)',
        byobFriendly: false,
        bottleServiceAvail: true
      },
      {
        id: 'mtl_solid_gold',
        name: 'Solid Gold Montreal',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Saint-Laurent Blvd Corridor',
        rating: 4.7,
        reviewsCount: 1600,
        imageGradient: 'from-amber-500 to-red-950',
        dressCode: 'Casual Clean',
        minAge: 18,
        description: 'High-energy multi-stage cabaret with private champagne rooms and bachelor stag specials.',
        highlightPerk: 'Stag Spotlight Stage Hot Seat + Free Round of Shots',
        address: '7755 Boul Saint-Laurent, Montréal, QC',
        hours: '7:00 PM – 3:00 AM',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'mtl_ritz_carlton', name: 'Ritz-Carlton Montreal', area: 'Golden Square Mile', pickupSpot: 'Sherbrooke St West Main Entrance', estDriveMinutes: 5, popular: true },
      { id: 'mtl_w_montreal', name: 'W Montreal', area: 'Old Montreal / Downtown', pickupSpot: 'Square Victoria Valet Circle', estDriveMinutes: 7, popular: true },
      { id: 'mtl_fairmont_queen_elizabeth', name: 'Fairmont The Queen Elizabeth', area: 'Downtown', pickupSpot: 'René-Lévesque Blvd Porte-Cochère', estDriveMinutes: 6, popular: true }
    ]
  },

  {
    id: 'cancun',
    name: 'Cancun & Riviera Maya',
    stateOrRegion: 'Quintana Roo',
    country: 'Mexico',
    countryCode: 'MX',
    continent: 'Latin America',
    flagEmoji: '🇲🇽',
    currency: 'USD',
    currencySymbol: '$',
    minLegalAge: 18,
    legalAgeNote: '18+ Strictly with Valid Passport • Resort Area Pickups',
    tagline: 'Hotel Zone Beachside Mega Clubs, Private Catamarans & VIP Nightlife',
    description: 'Caribbean tropical nightlife featuring world-famous Hotel Zone mega-clubs, all-inclusive tequila bottle presentations, and private catamaran stag cruises.',
    imageGradient: 'from-teal-600 via-emerald-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Open-bar all-inclusive options or VIP premium bottle service with sparkler shows.',
    limoFleetTypes: ['Suburban Executive Transport', 'Executive Luxury Sedan', 'Private Party Catamaran Transfer'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Mateo Morales (Cancun Party Concierge)',
    popularOccasions: ['Bachelor Party', 'Spring Break VIP', 'Bachelorette Trip', 'Birthday Yacht Party'],
    featuredVenues: [
      {
        id: 'cun_hong_kong_vip',
        name: 'Hong Kong Club VIP Lounge',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Cancun Downtown / Hotel Zone Shuttle',
        rating: 4.8,
        reviewsCount: 3100,
        imageGradient: 'from-red-600 to-amber-700',
        dressCode: 'Resort Smart Casual',
        minAge: 18,
        description: 'Internationally recognized adult entertainment resort club featuring 100+ dancers, private swimming pool suites, and luxury transportation.',
        highlightPerk: 'Free Roundtrip Hotel Zone Suburban / VIP Shuttle',
        address: 'Av. Tulum, Cancún, Q.R., Mexico',
        hours: 'Open 24 Hours / 7 Days a Week',
        byobFriendly: false,
        bottleServiceAvail: true
      },
      {
        id: 'cun_mandala_beach',
        name: 'Mandala Nightclub & Dayclub VIP',
        venueType: 'Mega Dayclub & Pool',
        neighborhood: 'Hotel Zone Party Center',
        rating: 4.9,
        reviewsCount: 4200,
        imageGradient: 'from-cyan-500 to-blue-900',
        dressCode: 'Nightlife Chic',
        minAge: 18,
        description: 'High-octane beachfront nightclub with open-air cabanas, sparkler bottle service, and world-class DJs.',
        highlightPerk: 'Front Row Bed / Booth + VIP Fast Track',
        address: 'Km 9.5 Blvd Kukulcan, Hotel Zone, Cancun',
        hours: '9:00 PM – 5:00 AM',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'cun_hyatt_ziva', name: 'Hyatt Ziva Cancun', area: 'Hotel Zone Point', pickupSpot: 'Main Lobby Motor Court', estDriveMinutes: 12, popular: true },
      { id: 'cun_secrets_the_vine', name: 'Secrets The Vine Cancun', area: 'Hotel Zone South', pickupSpot: 'Valet Porte-Cochère', estDriveMinutes: 14, popular: true },
      { id: 'cun_hard_rock', name: 'Hard Rock Hotel Cancun', area: 'Hotel Zone Mid', pickupSpot: 'Main Lobby Entrance', estDriveMinutes: 15, popular: true },
      { id: 'cun_ritz_cancun', name: 'Kempinski Hotel Cancun', area: 'Hotel Zone', pickupSpot: 'Front Courtyard Valet', estDriveMinutes: 13, popular: true }
    ]
  },

  {
    id: 'amsterdam',
    name: 'Amsterdam',
    stateOrRegion: 'North Holland',
    country: 'Netherlands',
    countryCode: 'NL',
    continent: 'Europe',
    flagEmoji: '🇳🇱',
    currency: 'EUR',
    currencySymbol: '€',
    minLegalAge: 18,
    legalAgeNote: '18+ Physical Passport or EU National ID Required',
    tagline: 'Red Light District VIP Theatres, Canal VIP Transit & Private Strip Lounges',
    description: 'The historic capital of European adult freedom featuring world-famous De Wallen cabaret theatres, luxury canal boat stag cruises with open bars, and private strip lounges.',
    imageGradient: 'from-amber-600 via-rose-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Heineken & European craft beer setups, Dutch spirits, and French champagne service.',
    limoFleetTypes: ['Mercedes Maybach & S-Class', 'Private Luxury Canal Stag Boat', 'Mercedes VIP Sprinter'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Bram Van Dijk (Amsterdam VIP Host)',
    popularOccasions: ['Stag Party (Bachelor)', 'Birthday Trip', 'Canal Cruise Party', 'Euro Tour VIP'],
    featuredVenues: [
      {
        id: 'ams_bon_ton',
        name: 'Club BonTon Amsterdam',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Oud-Zuid / Museum Quarter',
        rating: 4.9,
        reviewsCount: 2300,
        imageGradient: 'from-rose-600 to-purple-950',
        dressCode: 'Smart Casual / No Tracksuits',
        minAge: 18,
        description: 'Amsterdam’s most exclusive high-class strip club situated in a historic townhouse with luxurious private suites and top European dancers.',
        highlightPerk: 'Complimentary Mercedes S-Class Pick-up from City Hotels',
        address: 'Weteringschans 84, 1017 XP Amsterdam',
        hours: '9:00 PM – 4:00 AM (7 Days a Week)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'ams_amstel_hotel', name: 'InterContinental Amstel Amsterdam', area: 'Amstel Riverfront', pickupSpot: 'Professor Tulpplein Main Entrance', estDriveMinutes: 7, popular: true },
      { id: 'ams_w_amsterdam', name: 'W Amsterdam', area: 'Centrum Dam Square', pickupSpot: 'Spuistraat Valet Loop', estDriveMinutes: 8, popular: true },
      { id: 'ams_waldorf', name: 'Waldorf Astoria Amsterdam', area: 'Herengracht Canal', pickupSpot: 'Herengracht Main Gate', estDriveMinutes: 6, popular: true }
    ]
  },

  {
    id: 'tokyo',
    name: 'Tokyo',
    stateOrRegion: 'Kanto',
    country: 'Japan',
    countryCode: 'JP',
    continent: 'Asia',
    flagEmoji: '🇯🇵',
    currency: 'JPY',
    currencySymbol: '¥',
    minLegalAge: 18,
    legalAgeNote: '18+ Physical Passport Required for International Visitors (20+ for Alcohol)',
    tagline: 'Roppongi Showclubs, Shibuya Laser Stages & VIP Chauffeur Alphards',
    description: 'Cutting-edge cyberpunk entertainment featuring world-class aerial pole acrobats, high-tech LED laser stages, and ultra-luxurious Toyota Alphard Royal Lounge transfers.',
    imageGradient: 'from-fuchsia-600 via-purple-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Nomihoudai (All-You-Can-Drink) VIP Plans with Japanese Whiskey (Yamazaki, Hibiki) and Dom Pérignon.',
    limoFleetTypes: ['Toyota Alphard Executive Lounge', 'Lexus LM500h Royal VIP', 'Executive Luxury Sedan'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Kenji Takahashi (Tokyo VIP Host)',
    popularOccasions: ['Bachelor Party', 'Birthday VIP', 'Tokyo Nightlife Tour', 'Executive Showclub'],
    featuredVenues: [
      {
        id: 'tokyo_tantra',
        name: 'Tantra Tokyo Showclub & Cabaret',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Roppongi / Minato City',
        rating: 4.9,
        reviewsCount: 3100,
        imageGradient: 'from-pink-600 to-indigo-950',
        dressCode: 'Stylish Casual / Clean Footwear',
        minAge: 18,
        description: 'Tokyo’s #1 international adult cabaret and acrobatic showclub with mesmerizing pole artistry, theatrical geisha fusion shows, and private suites.',
        highlightPerk: 'Complimentary Roppongi / Ginza Executive Alphard Transfer',
        address: '3-11-14 Roppongi, Minato City, Tokyo',
        hours: '8:00 PM – 4:30 AM (Mon - Sat)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'tyo_aman', name: 'Aman Tokyo', area: 'Otemachi / Chiyoda', pickupSpot: '1st Floor Private Motor Lobby', estDriveMinutes: 12, popular: true },
      { id: 'tyo_grand_hyatt', name: 'Grand Hyatt Tokyo', area: 'Roppongi Hills', pickupSpot: 'Roppongi Hills Main Porte-Cochère', estDriveMinutes: 4, popular: true },
      { id: 'tyo_ritz', name: 'The Ritz-Carlton Tokyo', area: 'Tokyo Midtown / Akasaka', pickupSpot: 'Midtown Tower Ground Entrance', estDriveMinutes: 5, popular: true },
      { id: 'tyo_park_hyatt', name: 'Park Hyatt Tokyo', area: 'Shinjuku', pickupSpot: 'Shinjuku Park Tower Valet', estDriveMinutes: 14, popular: true }
    ]
  },

  {
    id: 'dubai',
    name: 'Dubai',
    stateOrRegion: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    continent: 'Middle East',
    flagEmoji: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'AED ',
    minLegalAge: 21,
    legalAgeNote: '21+ with Valid Passport • Ultra-Luxury Nightclubs & Marina Yacht VIPs',
    tagline: 'Downtown Skyline Penthouse Lounges, Marina Superyachts & Rolls-Royce Fleets',
    description: 'Experience ultra-luxury Middle Eastern nightlife with five-star hotel club sanctuaries, exotic multi-flavor shisha oases, and private Marina superyacht afterparties.',
    imageGradient: 'from-amber-500 via-yellow-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Licensed 5-Star Hotel VIP Bottle Service with Beluga Vodka, Ace of Spades, and Gold Flake Shisha.',
    limoFleetTypes: ['Rolls Royce Cullinan', 'Mercedes-Maybach S680', 'G63 AMG VIP Executive', 'Private Marina Superyacht'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Tariq Al-Mansoor (Dubai Luxury Concierge)',
    popularOccasions: ['Bachelor Party', 'High Roller Penthouse', 'Birthday Superyacht', 'VIP Table Service'],
    featuredVenues: [
      {
        id: 'dxb_armani_prive',
        name: 'Armani/Privé VIP Lounge',
        venueType: 'VIP Rooftop Nightclub',
        neighborhood: 'Downtown Dubai / Burj Khalifa',
        rating: 4.9,
        reviewsCount: 2900,
        imageGradient: 'from-amber-600 to-zinc-950',
        dressCode: 'Ultra Smart & Elegant',
        minAge: 21,
        description: 'Located inside the iconic Burj Khalifa, offering world-class DJs, exclusive VIP table enclosures, and breathtaking fountain views.',
        highlightPerk: 'Complimentary Rolls Royce Ghost Hotel Pickup',
        address: 'Burj Khalifa, Downtown Dubai',
        hours: '11:00 PM – 4:00 AM (Tue - Sat)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'dxb_burj_al_arab', name: 'Burj Al Arab Jumeirah', area: 'Jumeirah Beach', pickupSpot: 'Island Bridge Security Gate / Main Lobby', estDriveMinutes: 18, popular: true },
      { id: 'dxb_atlantis_royal', name: 'Atlantis The Royal', area: 'Palm Jumeirah', pickupSpot: 'Grand Water Court Valet', estDriveMinutes: 22, popular: true },
      { id: 'dxb_armani_hotel', name: 'Armani Hotel Dubai', area: 'Downtown / Burj Khalifa', pickupSpot: 'Burj Khalifa Dedicated Valet', estDriveMinutes: 1, popular: true }
    ]
  },

  {
    id: 'paris',
    name: 'Paris',
    stateOrRegion: 'Île-de-France',
    country: 'France',
    countryCode: 'FR',
    continent: 'Europe',
    flagEmoji: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    minLegalAge: 18,
    legalAgeNote: '18+ Strictly with Valid Passport / EU ID',
    tagline: 'Champs-Élysées Luxury Cabarets, Golden Triangle VIP Lounges & French Champagne',
    description: 'The birthplace of avant-garde cabaret theatre and burlesque glamour, featuring haute-couture stage performances, private golden suites, and luxury Parisian VIP chauffeurs.',
    imageGradient: 'from-amber-600 via-rose-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Champagne Bar with Dom Pérignon, Ruinart, Moët & Chandon, and gourmet French pairings.',
    limoFleetTypes: ['Mercedes-Maybach S-Class Chauffeur', 'Range Rover SV Golden Edition', 'Parisian Luxury VIP Sprinter'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Jean-Pierre Dubois (Paris VIP Concierge)',
    popularOccasions: ['Bachelor Party', 'Weekend Escape', 'Birthday Gala', 'Haute Nightlife VIP'],
    featuredVenues: [
      {
        id: 'par_crazy_horse_vip',
        name: 'Le Cabaret Royal Paris',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Champs-Élysées / 8th Arrondissement',
        rating: 4.9,
        reviewsCount: 3800,
        imageGradient: 'from-rose-600 to-red-950',
        dressCode: 'Elegant / Jacket Required',
        minAge: 18,
        description: 'World-famous sensual cabaret theatre featuring stunning choreography, private red velvet booths, and over 100 elite dancers.',
        highlightPerk: 'Complimentary Golden Triangle Chauffeur Transfer',
        address: '12 Ave George V, 75008 Paris, France',
        hours: '8:00 PM – 4:00 AM (7 Days a Week)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'par_ritz', name: 'Ritz Paris', area: 'Place Vendôme', pickupSpot: 'Main Place Vendôme Porte-Cochère', estDriveMinutes: 8, popular: true },
      { id: 'par_george_v', name: 'Four Seasons Hotel George V', area: 'Champs-Élysées', pickupSpot: 'Avenue George V Valet Circle', estDriveMinutes: 5, popular: true },
      { id: 'par_plaza_athenee', name: 'Hôtel Plaza Athénée', area: 'Avenue Montaigne', pickupSpot: 'Main Red Canopy Entrance', estDriveMinutes: 6, popular: true }
    ]
  },

  {
    id: 'ibiza',
    name: 'Ibiza',
    stateOrRegion: 'Balearic Islands',
    country: 'Spain',
    countryCode: 'ES',
    continent: 'Europe',
    flagEmoji: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
    minLegalAge: 18,
    legalAgeNote: '18+ Physical Passport Required • Beach Clubs & Ultra Nightclubs',
    tagline: 'Balearic Sunset Beach Clubs, Superyacht Lounges & Mega VIP Stage Cabarets',
    description: 'The world capital of electronic music and luxury Mediterranean nightlife, featuring open-air bikini beach dayclubs, private cliffside villas, and superclub VIP tables.',
    imageGradient: 'from-cyan-600 via-blue-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Top-Shelf VIP Magnum Bottle Service with sparkler parades and dedicated hostess team.',
    limoFleetTypes: ['Mercedes-Benz V-Class VIP', 'Range Rover Sport Chauffeur', 'Private Mediterranean Speedboat Shuttle'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Carlos De La Rosa (Ibiza VIP Host)',
    popularOccasions: ['Bachelor Party', 'Summer Yacht Weekend', 'VIP Superclub Table', 'Bachelorette Fiesta'],
    featuredVenues: [
      {
        id: 'ibz_lio_club',
        name: 'Lío Ibiza Club & Cabaret',
        venueType: 'Mega Dayclub & Pool',
        neighborhood: 'Marina Ibiza / Talamanca',
        rating: 4.9,
        reviewsCount: 4100,
        imageGradient: 'from-teal-600 to-indigo-950',
        dressCode: 'Ibiza Glamour & Chic',
        minAge: 18,
        description: 'Sensational waterfront cabaret dining overlooking Dalt Vila with acrobats, world-renowned DJs, and over 100 international performers.',
        highlightPerk: 'Complimentary Marina / Playa d’en Bossa Luxury Shuttle',
        address: 'Puerto Deportivo Marina Ibiza, 07800 Ibiza',
        hours: '9:00 PM – 6:00 AM (7 Days a Week)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'ibz_ushuaia_hotel', name: 'Ushuaïa Ibiza Beach Hotel', area: 'Playa d’en Bossa', pickupSpot: 'Main VIP Entrance Porte-Cochère', estDriveMinutes: 10, popular: true },
      { id: 'ibz_nobu', name: 'Nobu Hotel Ibiza Bay', area: 'Talamanca Bay', pickupSpot: 'Talamanca Valet Loop', estDriveMinutes: 5, popular: true },
      { id: 'ibz_destino', name: 'Destino Pacha Resort', area: 'Cap Martinet', pickupSpot: 'Private Cliffside Valet Gate', estDriveMinutes: 8, popular: true }
    ]
  },

  {
    id: 'rio_de_janeiro',
    name: 'Rio de Janeiro',
    stateOrRegion: 'Rio de Janeiro',
    country: 'Brazil',
    countryCode: 'BR',
    continent: 'Latin America',
    flagEmoji: '🇧🇷',
    currency: 'BRL',
    currencySymbol: 'R$',
    minLegalAge: 18,
    legalAgeNote: '18+ Strictly Enforced • Copacabana & Ipanema Luxury Transport',
    tagline: 'Copacabana Samba Cabarets, Ipanema Penthouse Lounges & Luxury Armored Shuttles',
    description: 'Sensational tropical nightlife with high-energy Samba dancers, bikini beachfront dayclubs, and private penthouse VIP suites overlooking Sugarloaf Mountain.',
    imageGradient: 'from-emerald-600 via-yellow-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Caipirinha & Premium Champagne Bottle Service with private security escort.',
    limoFleetTypes: ['Executive Armored SUV Chauffeur', 'Mercedes Sprinter VIP Lounge', 'Helicopter City Transfer'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Rodrigo Silva (Rio VIP Concierge)',
    popularOccasions: ['Carnival VIP', 'Bachelor Party', 'Birthday Bash', 'Beach & Nightlife Tour'],
    featuredVenues: [
      {
        id: 'rio_four_by_four',
        name: 'Club 4x4 Copacabana Cabaret',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Copacabana / Zona Sul',
        rating: 4.8,
        reviewsCount: 2600,
        imageGradient: 'from-amber-600 to-green-950',
        dressCode: 'Tropical Smart Casual',
        minAge: 18,
        description: 'Rio’s most iconic multi-floor luxury cabaret featuring sensational dancers, private VIP suites, and live music.',
        highlightPerk: 'Complimentary Copacabana & Ipanema Armored Shuttle',
        address: 'Rua Barata Ribeiro, Copacabana, Rio de Janeiro',
        hours: '7:00 PM – 5:00 AM (Daily)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'rio_copacabana_palace', name: 'Belmond Copacabana Palace', area: 'Copacabana Beach', pickupSpot: 'Avenida Atlântica Main Porte-Cochère', estDriveMinutes: 6, popular: true },
      { id: 'rio_fasano', name: 'Hotel Fasano Rio de Janeiro', area: 'Ipanema Beach', pickupSpot: 'Avenida Vieira Souto Valet Gate', estDriveMinutes: 10, popular: true },
      { id: 'rio_fairmont', name: 'Fairmont Rio de Janeiro Copacabana', area: 'Posto 6 Copacabana', pickupSpot: 'Main Entrance Valet Circle', estDriveMinutes: 8, popular: true }
    ]
  },

  {
    id: 'bangkok',
    name: 'Bangkok & Pattaya',
    stateOrRegion: 'Bangkok / Chonburi',
    country: 'Thailand',
    countryCode: 'TH',
    continent: 'Asia',
    flagEmoji: '🇹🇭',
    currency: 'THB',
    currencySymbol: '฿',
    minLegalAge: 20,
    legalAgeNote: '20+ Legal Age in Thailand • Passport Required for International Guests',
    tagline: 'Sukhumvit Skyline Lounges, High-Energy Acrobatic Shows & Alphard Royal Lounges',
    description: 'High-octane entertainment hub featuring dazzling stage shows, rooftop cocktail sanctuaries, 100+ performers nightly, and ultra-comfortable Toyota Alphard transfers.',
    imageGradient: 'from-purple-600 via-amber-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'All-Inclusive VIP Spirit & Champagne Packages with dedicated hostess service.',
    limoFleetTypes: ['Toyota Alphard Royal Lounge VIP', 'Mercedes-Benz E-Class Chauffeur', 'Custom VIP Party Van'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Somchai Thavorn (Bangkok VIP Lead)',
    popularOccasions: ['Bachelor Party', 'Stag Weekend', 'Rooftop VIP Night', 'Thailand Explorer'],
    featuredVenues: [
      {
        id: 'bkk_pimp_club',
        name: 'The Pimp Exclusive Club Bangkok',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Mengjai / Sukhumvit Corridor',
        rating: 4.9,
        reviewsCount: 3400,
        imageGradient: 'from-pink-600 to-purple-950',
        dressCode: 'Smart Casual / No Flip-Flops',
        minAge: 20,
        description: 'Thailand’s largest and most famous luxury entertainment club with over 200+ models, private karaoke villas, and live band stages.',
        highlightPerk: 'Complimentary Hotel Alphard Transfer + Front Row Stage Booth',
        address: 'Pracha Uthit Rd, Wang Thonglang, Bangkok',
        hours: '9:00 PM – 3:30 AM (Daily)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'bkk_mandarin_oriental', name: 'Mandarin Oriental Bangkok', area: 'Chao Phraya Riverside', pickupSpot: 'Main River Wing Valet', estDriveMinutes: 18, popular: true },
      { id: 'bkk_siam_kempinski', name: 'Siam Kempinski Hotel Bangkok', area: 'Siam / Downtown', pickupSpot: 'Garden Valet Porte-Cochère', estDriveMinutes: 12, popular: true },
      { id: 'bkk_so_bangkok', name: 'SO/ Bangkok', area: 'Sathorn / Lumphini', pickupSpot: 'North Sathorn Rd Valet Loop', estDriveMinutes: 10, popular: true }
    ]
  },

  {
    id: 'berlin',
    name: 'Berlin',
    stateOrRegion: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    continent: 'Europe',
    flagEmoji: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    minLegalAge: 18,
    legalAgeNote: '18+ Physical ID / Passport Required • Underground & High-Class Strip Clubs',
    tagline: 'Underground Electronic Cabarets, Private Loft Lounges & Luxury Audi Chauffeurs',
    description: 'Europe’s capital of artistic freedom and hedonistic nightlife, featuring high-end gentlemen’s clubs, electro cabarets, and discreet executive transfers across Mitte and Charlottenburg.',
    imageGradient: 'from-zinc-700 via-rose-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full German craft beer menus, premium schnapps, and Moët & Chandon champagne service.',
    limoFleetTypes: ['Audi A8L Executive Chauffeur', 'Mercedes-Benz S-Class', 'Berlin VIP Sprinter'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Felix Richter (Berlin VIP Host)',
    popularOccasions: ['Stag Party', 'Electro VIP Weekend', 'Birthday Celebration', 'Nightlife Tour'],
    featuredVenues: [
      {
        id: 'ber_hafifa_club',
        name: 'Hafifa Gentleman’s Club Berlin',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Charlottenburg / Ku’damm',
        rating: 4.8,
        reviewsCount: 1950,
        imageGradient: 'from-amber-600 to-zinc-950',
        dressCode: 'Smart Casual / No Sportswear',
        minAge: 18,
        description: 'High-class traditional strip lounge near Kurfürstendamm with gorgeous international performers and private champagne suites.',
        highlightPerk: 'Complimentary Ku’damm / Mitte Luxury Chauffeur',
        address: 'Kantstraße 140, 10623 Berlin, Germany',
        hours: '9:00 PM – 5:00 AM (Mon - Sun)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'ber_adlon', name: 'Hotel Adlon Kempinski Berlin', area: 'Mitte / Brandenburg Gate', pickupSpot: 'Unter den Linden Main Entrance', estDriveMinutes: 8, popular: true },
      { id: 'ber_ritz', name: 'The Ritz-Carlton Berlin', area: 'Potsdamer Platz', pickupSpot: 'Potsdamer Platz Valet Circle', estDriveMinutes: 7, popular: true },
      { id: 'ber_soho_house', name: 'Soho House Berlin', area: 'Mitte / Torstraße', pickupSpot: 'Torstraße Main Gate', estDriveMinutes: 10, popular: true }
    ]
  },

  {
    id: 'sydney',
    name: 'Sydney & Gold Coast',
    stateOrRegion: 'New South Wales / Queensland',
    country: 'Australia',
    countryCode: 'AU',
    continent: 'Oceania',
    flagEmoji: '🇦🇺',
    currency: 'AUD',
    currencySymbol: 'A$',
    minLegalAge: 18,
    legalAgeNote: '18+ Physical Photo ID or Passport Strictly Required by NSW Law',
    tagline: 'Harbour Superyacht Lounges, Kings Cross Cabarets & Luxury Chauffeur Sprinters',
    description: 'Iconic Australian entertainment featuring waterfront superyacht stag cruises, premium King Street cabarets, and over 100+ entertainers at your service all night.',
    imageGradient: 'from-blue-600 via-indigo-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'Full Top-Shelf Aussie & International Wine Cellar, Penfolds, and Dom Pérignon bottle service.',
    limoFleetTypes: ['Chrysler 300C Executive', 'Mercedes-Maybach S-Class', 'Private Harbour Stag Catamaran'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Lachlan Miller (Sydney VIP Concierge)',
    popularOccasions: ['Bucks Party (Bachelor)', 'Birthday Weekend', 'Harbour Yacht VIP', 'Stag Night'],
    featuredVenues: [
      {
        id: 'syd_men_gallery',
        name: 'The Men’s Gallery Sydney',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Sydney CBD / King Street',
        rating: 4.8,
        reviewsCount: 2200,
        imageGradient: 'from-blue-700 to-amber-900',
        dressCode: 'Smart Casual / Collared Shirts',
        minAge: 18,
        description: 'Sydney CBD’s premier adult entertainment venue offering two expansive stages, private VIP booths, and world-class entertainers.',
        highlightPerk: 'Complimentary CBD Hotel VIP Pickup / Black Car Service',
        address: '333 Pitt St, Sydney NSW 2000, Australia',
        hours: '6:00 PM – 4:00 AM (Mon - Sat)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'syd_crown_towers', name: 'Crown Towers Sydney', area: 'Barangaroo / Darling Harbour', pickupSpot: 'Barangaroo Ave Grand Porte-Cochère', estDriveMinutes: 6, popular: true },
      { id: 'syd_park_hyatt', name: 'Park Hyatt Sydney', area: 'The Rocks / Harbour View', pickupSpot: 'Hickson Rd Private Valet Loop', estDriveMinutes: 7, popular: true },
      { id: 'syd_four_seasons', name: 'Four Seasons Hotel Sydney', area: 'Circular Quay / The Rocks', pickupSpot: 'George St Main Entrance', estDriveMinutes: 5, popular: true }
    ]
  },

  {
    id: 'cartagena',
    name: 'Cartagena & Medellín',
    stateOrRegion: 'Bolívar / Antioquia',
    country: 'Colombia',
    countryCode: 'CO',
    continent: 'Latin America',
    flagEmoji: '🇨🇴',
    currency: 'USD',
    currencySymbol: '$',
    minLegalAge: 18,
    legalAgeNote: '18+ Physical Passport Required • Private Villa & Yacht Concierge',
    tagline: 'Walled City Colonial Penthouses, Rosario Islands Yachts & VIP Chiva Buses',
    description: 'Caribbean colonial charm meets legendary bachelor party nightlife with private catamaran island cruises, salsa cabarets, and luxury escorted party transport.',
    imageGradient: 'from-amber-600 via-rose-950 to-black',
    byobAllowed: true,
    byobPolicyNote: 'Custom BYOB bottle provisions available on private party buses and catamaran yachts.',
    limoFleetTypes: ['Armored Toyota Fortuner VIP', 'Private Island Party Catamaran', 'Luxury Chiva Party Bus'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Alejandro Gomez (Colombia Party Host)',
    popularOccasions: ['Bachelor Party', 'Rosario Islands Yacht Trip', 'Birthday Bash', 'VIP Villa Weekend'],
    featuredVenues: [
      {
        id: 'ctg_space_vip',
        name: 'Club Space VIP Cartagena',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Bocagrande / Downtown Waterfront',
        rating: 4.8,
        reviewsCount: 1900,
        imageGradient: 'from-rose-600 to-amber-900',
        dressCode: 'Resort Smart Casual',
        minAge: 18,
        description: 'Premier adult nightclub offering private champagne lounges, multi-tier stages, and over 100+ top Colombian entertainers.',
        highlightPerk: 'Complimentary Walled City & Bocagrande Chauffeur Shuttle',
        address: 'Bocagrande, Carrera 2, Cartagena, Colombia',
        hours: '8:00 PM – 5:00 AM (Daily)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'ctg_santa_clara', name: 'Sofitel Legend Santa Clara Cartagena', area: 'Old Walled City', pickupSpot: 'Calle del Torno Main Gate', estDriveMinutes: 7, popular: true },
      { id: 'ctg_hyatt_regency', name: 'Hyatt Regency Cartagena', area: 'Bocagrande', pickupSpot: 'Carrera 1 Valet Circle', estDriveMinutes: 5, popular: true },
      { id: 'ctg_hilton', name: 'Hilton Cartagena', area: 'El Laguito', pickupSpot: 'Avenida Almirante Brion Valet', estDriveMinutes: 9, popular: true }
    ]
  },

  {
    id: 'prague',
    name: 'Prague',
    stateOrRegion: 'Bohemia',
    country: 'Czech Republic',
    countryCode: 'CZ',
    continent: 'Europe',
    flagEmoji: '🇨🇿',
    currency: 'EUR',
    currencySymbol: '€',
    minLegalAge: 18,
    legalAgeNote: '18+ Physical Passport or EU Identity Card Required',
    tagline: 'Old Town Wenceslas Square Mega Cabarets & Hummer VIP Stag Tours',
    description: 'Europe’s legendary stag capital offering massive multi-floor adult entertainment complexes, private jacuzzis, world-class Czech beers, and stretch Hummer hotel pickups.',
    imageGradient: 'from-amber-600 via-zinc-950 to-black',
    byobAllowed: false,
    byobPolicyNote: 'World-famous Pilsner Urquell, Czech craft spirits, and French champagne bottle packages.',
    limoFleetTypes: ['Hummer H2 VIP Party Shuttle', 'Lincoln Town Car Chauffeur', 'Mercedes VIP Sprinter'],
    emergencyHostPhone: '+1 (385) 260-0342',
    hostName: 'Jan Dvořák (Prague Stag Director)',
    popularOccasions: ['Stag Party (Bachelor)', 'Weekend City Break', 'Birthday Celebration', 'Beer & Cabaret Tour'],
    featuredVenues: [
      {
        id: 'prg_goldfingers',
        name: 'Goldfingers Prague Cabaret',
        venueType: '18+ Totally Nude Cabaret',
        neighborhood: 'Wenceslas Square / Old Town',
        rating: 4.9,
        reviewsCount: 3600,
        imageGradient: 'from-amber-500 to-red-950',
        dressCode: 'Smart Casual / No Sportswear',
        minAge: 18,
        description: 'Located in the historic Ambassador Palace, featuring spectacular theatrical shows, private jacuzzi suites, and over 100 stunning European dancers.',
        highlightPerk: 'Complimentary VIP Party Shuttle Hotel Pickup',
        address: 'Václavské nám. 840/5, 110 00 Praha 1',
        hours: '8:00 PM – 5:00 AM (7 Days a Week)',
        byobFriendly: false,
        bottleServiceAvail: true
      }
    ],
    topHotels: [
      { id: 'prg_four_seasons', name: 'Four Seasons Hotel Prague', area: 'Old Town / Charles Bridge', pickupSpot: 'Veleslavínova Main Forecourt', estDriveMinutes: 6, popular: true },
      { id: 'prg_augustine', name: 'Augustine, a Luxury Collection Hotel', area: 'Malá Strana', pickupSpot: 'Letenská Gate Valet', estDriveMinutes: 8, popular: true },
      { id: 'prg_mandarin', name: 'Mandarin Oriental Prague', area: 'Lesser Town', pickupSpot: 'Nebovidská Private Courtyard', estDriveMinutes: 7, popular: true }
    ]
  }
];

// --- GLOBAL VIP PACKAGES (Exported from vipPackagesData.ts) ---

// --- GLOBAL ADD-ON UPGRADES ---
export const GLOBAL_ADD_ONS: AddOnOption[] = [
  {
    id: 'money_gun_100',
    name: 'LED Money Gun + $100 Stage Singles',
    category: 'singles_cash',
    price: 110,
    description: 'Supreme-style LED motorized money gun preloaded with 100 crisp $1 dollar bills for stage showers.',
    icon: 'Flame'
  },
  {
    id: 'money_gun_200',
    name: 'Dual LED Money Guns + $200 Singles',
    category: 'singles_cash',
    price: 215,
    description: 'Two motorized LED money blast guns loaded with 200 crisp dollar bills for the whole squad.',
    icon: 'Sparkles'
  },
  {
    id: 'exotic_hookah',
    name: 'Exotic Multi-Hose Hookah (Choice of 10 Flavors)',
    category: 'hookah',
    price: 45,
    description: 'Premium glass hookah with fresh fruit bowl, ice tip hose, and unlimited coal service.',
    icon: 'Flame'
  },
  {
    id: 'stage_hotseat_roast',
    name: 'On-Stage Bachelor / Birthday Hot Seat Roast',
    category: 'stage_experience',
    price: 50,
    description: 'Bring the guest of honor onto center stage for a hilarious 3-dancer comedy spotlight roast & crown ceremony.',
    icon: 'Crown'
  },
  {
    id: 'vip_suite_30min',
    name: 'Extra 30-Min Private VIP Champagne Suite',
    category: 'vip_room',
    price: 120,
    description: 'Private curtained luxury suite with plush leather couches, mood lighting, and 2 dedicated dancers.',
    icon: 'Heart'
  },
  {
    id: 'vip_suite_60min',
    name: 'Full 60-Min Presidential VIP Suite',
    category: 'vip_room',
    price: 220,
    description: 'One full hour in the master executive suite with private bathroom, 3 dedicated entertainers & champagne.',
    icon: 'Sparkles'
  },
  {
    id: 'vip_merch_box',
    name: 'VIP Souvenir Gift Box (Flask, Shirt & Glasses)',
    category: 'merch',
    price: 35,
    description: 'Custom engraved stainless steel flask, official club t-shirt, and neon VIP party sunglasses.',
    icon: 'Gift'
  }
];

// --- GLOBAL PERFORMER HEADLINERS ---
export const GLOBAL_PERFORMERS: PerformerProfile[] = [
  {
    id: 'lv_amber_rose',
    stageName: 'Amber "Phoenix" Fox',
    cityId: 'las_vegas',
    cityName: 'Las Vegas, NV',
    tagline: 'Vegas Main Stage Aerialist & National Cabaret Champion',
    specialty: 'High-Flying Aerial Silks & Center Stage Fire Performances',
    stageTime: '10:30 PM & 1:00 AM',
    shift: 'Late Night (12AM-4AM)',
    rating: 5.0,
    reviewsCount: 420,
    avatarGradient: 'from-rose-500 via-amber-500 to-purple-800',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    bio: 'Former Cirque du Soleil aerial acrobat with 6 years headlining in Las Vegas. Master of breathtaking pole flips, aerial silks, and private VIP champagne rooms.',
    favoriteMusic: 'EDM, Dark Techno, Heavy Bass',
    badges: ['Vegas Headliner', 'Aerial Champion', 'VIP Favorite']
  },
  {
    id: 'mia_valentina_cruz',
    stageName: 'Valentina "Fuego" Cruz',
    cityId: 'miami',
    cityName: 'Miami, FL',
    tagline: 'Miami Ultraclub Headliner & Latin Sensation',
    specialty: 'Latin Rhythm Pole Fusion & Trapeze Artistry',
    stageTime: '11:00 PM & 2:00 AM',
    shift: 'Late Night (12AM-4AM)',
    rating: 4.9,
    reviewsCount: 380,
    avatarGradient: 'from-pink-500 via-purple-600 to-rose-900',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'Born in Medellin and trained in South Beach, Valentina blends fiery Latin choreography with world-class athletic pole feats and luxury champagne suite hospitality.',
    favoriteMusic: 'Reggaeton, Latin House, Tech House',
    badges: ['Miami Star', 'Latin Queen', 'Champagne Hostess']
  },
  {
    id: 'lon_scarlett_monroe',
    stageName: 'Scarlett Monroe',
    cityId: 'london',
    cityName: 'London, UK',
    tagline: 'West End Theatrical Burlesque & Pole Headliner',
    specialty: 'Vintage Burlesque & Classic Soho Cabaret',
    stageTime: '9:30 PM & Midnight',
    shift: 'Evening (8PM-12AM)',
    rating: 4.9,
    reviewsCount: 290,
    avatarGradient: 'from-red-600 via-rose-700 to-zinc-900',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    bio: 'Royal Academy of Dance graduate bringing high theatre, glamorous costuming, and exquisite erotic choreography to London’s elite gentlemen.',
    favoriteMusic: 'Deep House, Jazz Fusion, Electro Swing',
    badges: ['London Elite', 'Burlesque Star', 'Mayfair VIP']
  },
  {
    id: 'mtl_chloe_dupuis',
    stageName: 'Chloé Dupuis',
    cityId: 'montreal',
    cityName: 'Montreal, Canada',
    tagline: 'Montreal Stag Legend & Acrobatic Sensation',
    specialty: 'Full Contact Lap Dancing & Stage Acrobatics',
    stageTime: '10:00 PM & 1:30 AM',
    shift: 'Late Night (12AM-4AM)',
    rating: 5.0,
    reviewsCount: 340,
    avatarGradient: 'from-amber-400 via-rose-600 to-red-900',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    bio: 'The undisputed favorite among American and Canadian bachelor parties in Montreal, famed for warm energy, playful roasts, and uninhibited stage artistry.',
    favoriteMusic: 'Hip Hop, Trap, R&B, Pop',
    badges: ['Stag #1 Pick', 'Montreal Queen', 'Crowd Favorite']
  },
  {
    id: 'tokyo_yuki_sakura',
    stageName: 'Yuki "Sakura" K.',
    cityId: 'tokyo',
    cityName: 'Tokyo, Japan',
    tagline: 'Roppongi Laser Stage Pole Champion',
    specialty: 'High-Tech LED Pole & Cyberpunk Fusion',
    stageTime: '10:15 PM & 12:45 AM',
    shift: 'Late Night (12AM-4AM)',
    rating: 4.9,
    reviewsCount: 260,
    avatarGradient: 'from-fuchsia-500 via-cyan-600 to-indigo-900',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    bio: 'International pole champion blending traditional Japanese dance elements with high-energy modern EDM pole acrobatics in the heart of Roppongi.',
    favoriteMusic: 'Cyberpunk Synth, Future Bass, J-Core',
    badges: ['Tokyo Headliner', 'Pole Champion', 'Cyber VIP']
  }
];

// --- GLOBAL TABLE DRINKS & MIXER MENU ---
export const GLOBAL_DRINKS_MENU: DrinkMixerItem[] = [
  {
    id: 'dr_redbull_bucket',
    name: 'Chilled Red Bull Energy Bucket (6 Cans)',
    category: 'Red Bull & Energy',
    priceUSD: 45,
    volume: '6 x 250ml Cans',
    description: 'Chilled on crushed ice with fresh lime wedges. Choice of Regular, Sugar-Free, Tropical & Watermelon editions.',
    popular: true
  },
  {
    id: 'dr_ocean_cranberry',
    name: 'Craft Ocean Cranberry Pitcher',
    category: 'Mixers & Carafes',
    priceUSD: 25,
    volume: '64 oz Pitcher',
    description: '100% pure cranberry juice with fresh lime wheels and ice. Perfect pairing for vodka, tequila, and gin BYOB bottles.'
  },
  {
    id: 'dr_oj_pineapple',
    name: 'Fresh Orange & Pineapple Carafe Duo',
    category: 'Mixers & Carafes',
    priceUSD: 30,
    volume: '2 x 32 oz Carafes',
    description: 'Freshly squeezed Florida Valencia orange juice paired with chilled tropical golden pineapple juice.'
  },
  {
    id: 'dr_craft_soda_bucket',
    name: 'Soda & Artisan Tonic Ice Bucket',
    category: 'Mixers & Carafes',
    priceUSD: 35,
    volume: '6 Assorted Bottles',
    description: 'Fever-Tree craft tonic, Mexican glass bottle Coca-Cola, ginger ale, club soda, and Sprite on fresh ice.'
  },
  {
    id: 'dr_fruit_cheese_platter',
    name: 'VIP Fruit & Artisan Snack Board',
    category: 'Ice & Fruit Platters',
    priceUSD: 40,
    volume: 'Serves 6-8 Guests',
    description: 'Sliced chilled watermelon, pineapple spears, fresh strawberries, seedless grapes, and gourmet chocolate truffles.'
  }
];

// --- GLOBAL VENUE FAQS ---
export const GLOBAL_FAQS: FaqItem[] = [
  {
    category: 'Free Pickup & Transit',
    q: 'How does the free hotel pickup / luxury chauffeur service work in my city?',
    a: 'All our VIP packages include complimentary hotel pickup from any resort, boutique hotel, or casino valet in your selected destination city (Las Vegas, Miami, New York, Montreal, London, Tokyo, Cancun, etc.). Your driver will text you 15 minutes before arrival and greet your group right at the hotel valet with zero stress.'
  },
  {
    category: '18+ vs 21+ Age Rules',
    q: 'What are the legal age requirements across different cities & countries?',
    a: 'Legal ages vary by municipal jurisdiction: Las Vegas 18+ cabarets, Montreal, London, Amsterdam, Tokyo, and Cancun are 18+ with valid physical government ID or passport. Miami, New York City, Los Angeles, and Atlanta are strictly 21+. Digital phone photos of IDs are not accepted by door security.'
  },
  {
    category: 'BYOB & Bottle Service',
    q: 'Can we bring our own alcohol bottles (BYOB), or is bottle service provided?',
    a: 'In Las Vegas, New Orleans, and select cabaret jurisdictions, you are 100% allowed to bring your own liquor bottles and cases of beer with zero corkage fees; we provide free ice buckets, glassware, and mixer carafes. In cities like Miami, NYC, London, and Tokyo, premier in-house bottle service and table hospitality are provided with full bottle sparkler presentations.'
  },
  {
    category: 'Bachelor Trips',
    q: 'Why are these packages the #1 choice for Bachelor & Stag trips worldwide?',
    a: 'Because we take the stress off the Best Man! From coordinating VIP Escalades and party buses, to waiving general admission lines, reserving prime front-row leather booths, stocking mixers/champagne, and putting the Bachelor on center stage for our famous 3-dancer roast, everything is planned seamlessly.'
  },
  {
    category: 'International Etiquette',
    q: 'How does multi-currency pricing and payment work at the venue?',
    a: 'You can reserve online in your local currency (USD, EUR, GBP, CAD, AUD, JPY, MXN, AED, etc.) with zero upfront payment required. You can pay your remaining balance at the venue door via all major credit cards, Apple Pay, or local cash.'
  }
];

// Demo booking reservation for initial state
export const INITIAL_DEMO_RESERVATION: BookingReservation = {
  id: 'res_global_demo_789',
  confirmationCode: 'VIP-USA-9482',
  destinationCityId: 'usa_nationwide',
  destinationCityName: 'Anywhere in USA',
  destinationCountry: 'United States',
  venueName: 'Little Darlings Nude Party • USA',
  guestName: 'Alex Henderson',
  email: 'alex.henderson@vipmail.com',
  phone: '+1 (385) 260-0342',
  partySize: 8,
  eventDate: '2026-08-22',
  timeSlot: '10:30 PM (Peak Stage Hours)',
  packageId: 'gold_bachelor',
  packageName: 'The Gold Bachelor & Birthday Bash',
  basePackagePriceUSD: 250,
  selectedCurrency: 'USD',
  currencySymbol: '$',
  exchangeRate: 1.0,
  basePackagePriceConverted: 250,
  selectedAddOns: [
    { addOnId: 'money_gun_100', name: 'LED Money Gun + $100 Stage Singles', priceUSD: 110, priceConverted: 110, qty: 1 },
    { addOnId: 'exotic_hookah', name: 'Exotic Multi-Hose Hookah (Choice of 10 Flavors)', priceUSD: 45, priceConverted: 45, qty: 1 }
  ],
  hotelPickup: {
    required: true,
    hotelName: 'Your Hotel / Resort Front Valet',
    roomOrEntrance: 'Main Valet & Tour Lobby',
    pickupTime: '10:00 PM',
    liquorStoreStop: true,
    vehicleType: 'Cadillac Escalade ESV Executive'
  },
  totalAmountUSD: 200,
  totalAmountConverted: 200,
  depositPaidUSD: 200,
  depositPaidConverted: 200,
  balanceDueAtDoorConverted: 0,
  costPerPersonConverted: 50,
  customNotes: 'Friday Nude Party! Free VIP party bus pickup and Bitcoin verified passes.',
  occasion: 'Bachelor Party',
  paymentChoice: 'bitcoin_anonymous',
  bitcoinPayment: {
    btcAmount: 0.0031,
    btcAddress: 'bc1q9darl7nude8party9usa4vip90210bitcoinpass7x',
    txHash: '9f83e811c7849e7fa17b44783307521327110ad71a067ff258102a7b6cf9021c',
    isPaid: true
  },
  status: 'CONFIRMED',
  limoStatus: {
    assigned: true,
    chauffeurName: 'Chauffeur VIP Dispatch',
    chauffeurPhone: '+1 (385) 260-0342',
    vehicleType: 'Black Escalade ESV Luxury',
    licensePlate: 'USA • VIP-888',
    etaMinutes: 12
  },
  createdAt: '2026-08-14T17:00:00Z'
};

// Helper utility to convert amounts between currencies
export function convertCurrency(
  amountInUSD: number,
  targetCurrencyCode: string
): { amount: number; formatted: string; symbol: string } {
  const curr = SUPPORTED_CURRENCIES.find(c => c.code === targetCurrencyCode) || SUPPORTED_CURRENCIES[0];
  const converted = Math.round(amountInUSD * curr.rateToUSD);
  const formatted = `${curr.symbol}${converted.toLocaleString()}`;
  return {
    amount: converted,
    formatted,
    symbol: curr.symbol
  };
}
