import { MurrelVideo } from '../types';

export const INITIAL_VIDEOS: MurrelVideo[] = [
  {
    id: 's3YFytpSuFQ',
    title: 'Our Murrel Fish Videos - Farming & Seed Tank Tour',
    description: 'An exclusive inside look at our Murrel (Snakehead / Korrameenu / Channa striata) fish farm, showing seed rearing tanks, active swimming fingerlings, aeration setup, and pond water conditioning.',
    category: 'farming',
    author: 'Murrel Fish Farm',
    duration: '4:15',
    publishedDate: 'Featured',
    views: '12.4K',
    tags: ['Our Farm', 'Murrel Seed', 'Water Conditioning', 'Tank Culture'],
    keyTakeaways: [
      'Maintain clean, oxygenated nursery water for high fingerling survival',
      'Air-breathing labyrinth organ allows Murrel to thrive in low DO conditions',
      'Grading every 10-15 days is critical to prevent cannibalism among unequal fingerling sizes',
      'Acclimatize fingerlings gradually to avoid thermal shock'
    ]
  },
  {
    id: 'g-D1uP7uKqM',
    title: 'High-Density Murrel Fish Culture in Cement Tanks & Biofloc',
    description: 'Complete breakdown of raising Murrel in intensive circular cement tanks and biofloc systems, managing organic waste and maximizing square meter stocking density.',
    category: 'farming',
    author: 'AquaFarming Masterclass',
    duration: '8:42',
    publishedDate: '2024',
    views: '45.1K',
    tags: ['Cement Tanks', 'Biofloc', 'High Density', 'Water Management'],
    keyTakeaways: [
      'Stocking density of 30-50 fish per cubic meter is achievable with proper solids removal',
      'Continuous aeration and weekly sludge evacuation keeps ammonia below 0.05 mg/L',
      'Tank covers or net barriers are mandatory as Murrel can jump out during night hours'
    ]
  },
  {
    id: 'o_X4QG8T_lE',
    title: 'Murrel Fingerlings Feed Training: Live Feed to Floating Pellets',
    description: 'Step-by-step method to transition predatory Murrel larvae from Artemia/tubifex worms to slow-sinking and commercial high-protein floating pellets (40-45% crude protein).',
    category: 'feeding',
    author: 'Fisheries Tech Channel',
    duration: '11:20',
    publishedDate: '2024',
    views: '32.8K',
    tags: ['Feed Training', 'Artemia', 'Floating Pellets', 'Cannibalism Control'],
    keyTakeaways: [
      'Murrel naturally hunt live prey; training onto formulated pellet feed requires consistent timing',
      'Mix minced trash fish paste with micro-pellets for 4 days before switching completely',
      'Feed 2-3 times daily at fixed spots to trigger surface schooling behavior'
    ]
  },
  {
    id: 'T5yC5g2E_L8',
    title: 'Induced Breeding & Seed Production of Channa striata (Murrel)',
    description: 'Hatchery protocol for Murrel breeding using pituitary extract and synthetic GnRH (Ovaprim / Ovatide), natural pairing, floating egg incubation, and hatching troughs.',
    category: 'breeding',
    author: 'ICAR Aquaculture Research',
    duration: '14:35',
    publishedDate: '2023',
    views: '88.3K',
    tags: ['Induced Breeding', 'Hatchery', 'Ovaprim', 'Egg Incubation'],
    keyTakeaways: [
      'Select mature healthy broodstock (1.0 - 1.5 kg) with prominent genital papilla',
      'Inject females with 0.4-0.6 ml/kg Ovaprim; males receive half dose',
      'Spawning occurs within 16-24 hours at 28-30°C in weed-covered breeding tanks',
      'Eggs are yellowish, floating, non-adhesive, hatching in 24-30 hours'
    ]
  },
  {
    id: 'M6Q7qL0yPms',
    title: 'Commercial Murrel Harvesting, Live Transportation & Market Economics',
    description: 'Best techniques for netting, live oxygenated hauling, and marketing Murrel at local markets where live fish command premium prices up to 2-3x carp species.',
    category: 'harvest',
    author: 'Agri Business India',
    duration: '7:50',
    publishedDate: '2024',
    views: '61.7K',
    tags: ['Harvesting', 'Live Transport', 'Market Price', 'Economics'],
    keyTakeaways: [
      'Murrel stay alive in moist conditions for hours, significantly reducing cold storage costs',
      'Average weight at 7-8 months reaches 700g to 1.1kg under commercial feeding',
      'Direct live sale to consumers or restaurants captures the highest profit margins'
    ]
  },
  {
    id: 'K5yU9w2D_qA',
    title: 'Traditional Spicy Murrel Fish Curry (Korrameenu Pulusu / Viral Meen)',
    description: 'Authentic village-style preparation of tender Murrel fish, rich in natural omega-3 and albumin, with clay pot simmering and aromatic spices.',
    category: 'cooking',
    author: 'Village Food Secrets',
    duration: '10:15',
    publishedDate: '2024',
    views: '110K',
    tags: ['Traditional Recipe', 'Clay Pot', 'Medicinal Food', 'High Protein'],
    keyTakeaways: [
      'Murrel meat is firm, single-boned, and sweet with low intramuscular pin bones',
      'Renowned in traditional medicine for speeding post-surgery healing and wound repair',
      'Clay pot slow cooking locks in natural juices and gelatinous skin nutrients'
    ]
  }
];

export const MURREL_FACTS = [
  {
    title: 'Air-Breathing Organ',
    detail: 'Murrels have a suprabranchial organ allowing them to breathe atmospheric air directly, surviving in shallow or low-oxygen water.',
    icon: 'Wind'
  },
  {
    title: 'Medicinal Wound Healing',
    detail: 'Rich in arachidonic acid and albumin, consuming Murrel is widely recommended by surgeons for accelerating tissue regeneration.',
    icon: 'HeartPulse'
  },
  {
    title: 'Premium Live Market Value',
    detail: 'Unlike carps, Murrel can be transported alive with minimal water, commanding premium retail rates ($6–$12 / kg).',
    icon: 'TrendingUp'
  },
  {
    title: 'High Protein Ratio',
    detail: 'Lean muscle meat delivers over 20-22% high-digestibility protein with minimal intramuscular fat.',
    icon: 'ShieldCheck'
  }
];
