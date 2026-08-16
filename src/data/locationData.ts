import { CountryInfo } from '../types';

export const COUNTRIES_DATA: CountryInfo[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
    states: [
      {
        name: 'California',
        code: 'CA',
        cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Oakland', 'Sacramento', 'Long Beach']
      },
      {
        name: 'New York',
        code: 'NY',
        cities: ['New York City', 'Brooklyn', 'Queens', 'Buffalo', 'Rochester', 'Albany', 'Syracuse']
      },
      {
        name: 'Texas',
        code: 'TX',
        cities: ['Austin', 'Houston', 'Dallas', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington']
      },
      {
        name: 'Florida',
        code: 'FL',
        cities: ['Miami', 'Orlando', 'Tampa', 'Fort Lauderdale', 'Jacksonville', 'St. Petersburg', 'Key West']
      },
      {
        name: 'Illinois',
        code: 'IL',
        cities: ['Chicago', 'Aurora', 'Naperville', 'Rockford', 'Joliet', 'Springfield']
      },
      {
        name: 'Georgia',
        code: 'GA',
        cities: ['Atlanta', 'Savannah', 'Augusta', 'Athens', 'Macon']
      },
      {
        name: 'Washington',
        code: 'WA',
        cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue']
      },
      {
        name: 'Nevada',
        code: 'NV',
        cities: ['Las Vegas', 'Reno', 'Henderson', 'Carson City']
      },
      {
        name: 'Colorado',
        code: 'CO',
        cities: ['Denver', 'Boulder', 'Colorado Springs', 'Fort Collins', 'Aspen']
      },
      {
        name: 'Pennsylvania',
        code: 'PA',
        cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Scranton']
      }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    dialCode: '+44',
    states: [
      {
        name: 'England',
        code: 'ENG',
        cities: ['London', 'Manchester', 'Birmingham', 'Bristol', 'Leeds', 'Liverpool', 'Newcastle', 'Brighton']
      },
      {
        name: 'Scotland',
        code: 'SCT',
        cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness']
      },
      {
        name: 'Wales',
        code: 'WLS',
        cities: ['Cardiff', 'Swansea', 'Newport', 'Bangor']
      },
      {
        name: 'Northern Ireland',
        code: 'NIR',
        cities: ['Belfast', 'Derry', 'Lisburn', 'Newry']
      }
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    dialCode: '+1',
    states: [
      {
        name: 'Ontario',
        code: 'ON',
        cities: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London', 'Kitchener']
      },
      {
        name: 'British Columbia',
        code: 'BC',
        cities: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Kelowna', 'Richmond']
      },
      {
        name: 'Quebec',
        code: 'QC',
        cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil']
      },
      {
        name: 'Alberta',
        code: 'AB',
        cities: ['Calgary', 'Edmonton', 'Red Deer', 'Banff', 'Lethbridge']
      }
    ]
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    dialCode: '+234',
    states: [
      {
        name: 'Lagos',
        code: 'LA',
        cities: ['Lagos Island', 'Ikeja', 'Lekki', 'Victoria Island', 'Surulere', 'Yaba']
      },
      {
        name: 'Federal Capital Territory',
        code: 'FCT',
        cities: ['Abuja', 'Garki', 'Maitama', 'Wuse', 'Gwarinpa']
      },
      {
        name: 'Rivers',
        code: 'RI',
        cities: ['Port Harcourt', 'Obio-Akpor', 'Bonny', 'Eleme']
      },
      {
        name: 'Oyo',
        code: 'OY',
        cities: ['Ibadan', 'Ogbomoso', 'Oyo Town']
      },
      {
        name: 'Enugu',
        code: 'EN',
        cities: ['Enugu City', 'Nsukka', 'Awgu']
      },
      {
        name: 'Edo',
        code: 'ED',
        cities: ['Benin City', 'Auchi', 'Ekpoma']
      }
    ]
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    dialCode: '+61',
    states: [
      {
        name: 'New South Wales',
        code: 'NSW',
        cities: ['Sydney', 'Newcastle', 'Wollongong', 'Byron Bay', 'Central Coast']
      },
      {
        name: 'Victoria',
        code: 'VIC',
        cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo']
      },
      {
        name: 'Queensland',
        code: 'QLD',
        cities: ['Brisbane', 'Gold Coast', 'Cairns', 'Sunshine Coast', 'Townsville']
      },
      {
        name: 'Western Australia',
        code: 'WA',
        cities: ['Perth', 'Fremantle', 'Mandurah', 'Bunbury']
      }
    ]
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    dialCode: '+49',
    states: [
      {
        name: 'Berlin',
        code: 'BE',
        cities: ['Berlin Mitte', 'Kreuzberg', 'Friedrichshain', 'Neukölln', 'Charlottenburg']
      },
      {
        name: 'Bavaria',
        code: 'BY',
        cities: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Würzburg']
      },
      {
        name: 'North Rhine-Westphalia',
        code: 'NW',
        cities: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Bonn']
      },
      {
        name: 'Hamburg',
        code: 'HH',
        cities: ['Hamburg City', 'Altona', 'St. Pauli', 'Wandsbek']
      },
      {
        name: 'Hesse',
        code: 'HE',
        cities: ['Frankfurt am Main', 'Wiesbaden', 'Kassel', 'Darmstadt']
      }
    ]
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    dialCode: '+33',
    states: [
      {
        name: 'Île-de-France',
        code: 'IDF',
        cities: ['Paris', 'Boulogne-Billancourt', 'Saint-Denis', 'Versailles', 'Montreuil']
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        code: 'PACA',
        cities: ['Marseille', 'Nice', 'Cannes', 'Aix-en-Provence', 'Toulon']
      },
      {
        name: 'Auvergne-Rhône-Alpes',
        code: 'ARA',
        cities: ['Lyon', 'Grenoble', 'Saint-Étienne', 'Annecy']
      },
      {
        name: 'Nouvelle-Aquitaine',
        code: 'NAQ',
        cities: ['Bordeaux', 'Limoges', 'Poitiers', 'Biarritz']
      }
    ]
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    dialCode: '+27',
    states: [
      {
        name: 'Gauteng',
        code: 'GP',
        cities: ['Johannesburg', 'Pretoria', 'Sandton', 'Soweto', 'Centurion']
      },
      {
        name: 'Western Cape',
        code: 'WC',
        cities: ['Cape Town', 'Stellenbosch', 'George', 'Paarl']
      },
      {
        name: 'KwaZulu-Natal',
        code: 'KZN',
        cities: ['Durban', 'Pietermaritzburg', 'Umhlanga', 'Ballito']
      }
    ]
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    dialCode: '+233',
    states: [
      {
        name: 'Greater Accra',
        code: 'GAR',
        cities: ['Accra', 'Tema', 'East Legon', 'Osu', 'Cantonments']
      },
      {
        name: 'Ashanti',
        code: 'ASH',
        cities: ['Kumasi', 'Obuasi', 'Ejisu']
      },
      {
        name: 'Western',
        code: 'WES',
        cities: ['Takoradi', 'Sekondi', 'Tarkwa']
      }
    ]
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    dialCode: '+34',
    states: [
      {
        name: 'Madrid',
        code: 'MD',
        cities: ['Madrid City', 'Alcalá de Henares', 'Getafe', 'Móstoles']
      },
      {
        name: 'Catalonia',
        code: 'CT',
        cities: ['Barcelona', 'L\'Hospitalet', 'Badalona', 'Girona', 'Sitges']
      },
      {
        name: 'Andalusia',
        code: 'AN',
        cities: ['Seville', 'Málaga', 'Granada', 'Marbella', 'Córdoba']
      },
      {
        name: 'Balearic Islands',
        code: 'IB',
        cities: ['Ibiza Town', 'Palma de Mallorca', 'San Antonio', 'Santa Eulalia']
      }
    ]
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    dialCode: '+55',
    states: [
      {
        name: 'São Paulo',
        code: 'SP',
        cities: ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto']
      },
      {
        name: 'Rio de Janeiro',
        code: 'RJ',
        cities: ['Rio de Janeiro', 'Niterói', 'Búzios', 'Petrópolis']
      },
      {
        name: 'Bahia',
        code: 'BA',
        cities: ['Salvador', 'Porto Seguro', 'Feira de Santana']
      }
    ]
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    dialCode: '+81',
    states: [
      {
        name: 'Tokyo',
        code: '13',
        cities: ['Shibuya', 'Shinjuku', 'Roppongi', 'Akihabara', 'Ginza']
      },
      {
        name: 'Osaka',
        code: '27',
        cities: ['Osaka City', 'Namba', 'Umeda', 'Sakai']
      },
      {
        name: 'Kyoto',
        code: '26',
        cities: ['Kyoto City', 'Uji', 'Kameoka']
      }
    ]
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    dialCode: '+91',
    states: [
      {
        name: 'Maharashtra',
        code: 'MH',
        cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik']
      },
      {
        name: 'Delhi NCR',
        code: 'DL',
        cities: ['New Delhi', 'Gurugram', 'Noida', 'Faridabad']
      },
      {
        name: 'Karnataka',
        code: 'KA',
        cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi']
      },
      {
        name: 'Goa',
        code: 'GA',
        cities: ['Panaji', 'Vagator', 'Anjuna', 'Margao', 'Calangute']
      }
    ]
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    dialCode: '+971',
    states: [
      {
        name: 'Dubai',
        code: 'DXB',
        cities: ['Downtown Dubai', 'Dubai Marina', 'Jumeirah', 'Palm Jumeirah', 'Business Bay']
      },
      {
        name: 'Abu Dhabi',
        code: 'AUH',
        cities: ['Abu Dhabi City', 'Yas Island', 'Saadiyat Island', 'Al Ain']
      }
    ]
  },
  {
    code: 'OTHER',
    name: 'Other / International',
    flag: '🌐',
    dialCode: '+',
    states: [
      {
        name: 'Worldwide Region',
        code: 'INT',
        cities: ['Capital City', 'Metropolitan Area', 'Local District', 'Other']
      }
    ]
  }
];

export const MUSIC_GENRES = [
  { id: 'afrobeats', label: 'Afrobeats / Amapiano', icon: '🥁' },
  { id: 'house', label: 'Tech House & Deep House', icon: '🎛️' },
  { id: 'hiphop', label: 'Hip-Hop & Trap', icon: '🎤' },
  { id: 'rnb', label: 'R&B & Neo-Soul', icon: '🎷' },
  { id: 'techno', label: 'Peak-Time Techno & Melodic', icon: '⚡' },
  { id: 'edm', label: 'EDM & Festival Bangers', icon: '🎆' },
  { id: 'latin', label: 'Reggaeton & Latin Pop', icon: '🔥' },
  { id: 'throwback', label: '2000s & 2010s Club Anthems', icon: '💿' }
];

export const DRINK_PREFERENCES = [
  { id: 'cocktails', label: 'Craft Cocktails & Spirits', desc: 'Mixology bar access with signature drinks', icon: '🍸' },
  { id: 'beer_cider', label: 'Craft Beer & Hard Seltzers', desc: 'Ice cold drafts, ciders and spiked seltzers', icon: '🍺' },
  { id: 'shots_bubbles', label: 'Prosecco & Tequila Shots', desc: 'Party starters & celebratory toasts', icon: '🍾' },
  { id: 'sober_mocktails', label: 'Sober / Zero-Proof & Energy', desc: 'Delicious alcohol-free mocktails & Red Bull', icon: '🍹' },
  { id: 'byob', label: 'BYOB (Personal Stash)', desc: 'Bringing your own cooler/bottles to check in', icon: '🧊' }
];

export const COMFORT_LEVELS = [
  { id: 'full_nude', label: 'Full Naturist / Nude', desc: 'Fully liberated, comfortable participating in clothing-optional spaces', icon: '✨' },
  { id: 'partial_swim', label: 'Swimwear / Underwear / Body Paint', desc: 'Light coverage, swimwear, body paint or rave harness', icon: '🎨' },
  { id: 'clothing_optional', label: 'Clothing-Optional / Undecided', desc: 'Starting clothed and deciding as the energy evolves', icon: '🌿' },
  { id: 'clothed_supportive', label: 'Clothed & Body-Positive Ally', desc: 'Remaining clothed while respecting and celebrating the safe space', icon: '🤝' }
];

export const TICKET_TIERS = [
  {
    id: 'GA_18_PLUS' as const,
    name: 'General Admission Naturist (18+)',
    price: 'FREE RSVP',
    badge: 'Standard Access',
    color: 'emerald',
    description: 'Full access to Main Stage, Open-Air Courtyard, Free Hydration Station & Standard Locker/Coat Check.',
    perks: ['Strictly 18+ valid ID access', 'Standard locker/bag check token', 'Camera privacy seal protection at entry', 'Live DJ Jukebox song votes']
  },
  {
    id: 'VIP_LOUNGE' as const,
    name: 'VIP Sanctuary Lounge & Towel Service',
    price: '$25 / Door Priority',
    badge: 'Popular Choice',
    color: 'purple',
    description: 'Express entry, complimentary plush venue towel, dedicated bar, elevated mezzanine & private lockers.',
    perks: ['Fast-track VIP entrance lane', 'Complimentary fresh venue towel & locker', '2 Free premium craft drink tokens', 'Access to elevated VIP Mezzanine & open-air terrace']
  },
  {
    id: 'BACKSTAGE_ACCESS' as const,
    name: 'Backstage Oasis & DJ Booth Pass',
    price: '$50 / Limited 50',
    badge: 'Ultra Exclusive',
    color: 'amber',
    description: 'Behind-the-decks DJ access, premium open champagne lounge, luxury changing suite & unlimited perks.',
    perks: ['All VIP perks + Luxury changing suite', 'Backstage DJ booth access & artist lounge', 'Unlimited premium drink bar tokens', 'Commemorative metallic NFC party pass']
  }
];
