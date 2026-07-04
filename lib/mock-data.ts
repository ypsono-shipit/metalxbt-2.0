import type { Commodity, MiningCompany, NewsArticle, EducationLesson, PortfolioPosition, WatchlistItem } from '@/types'
import { genSparkline } from './utils'

export const COMMODITIES: Commodity[] = [
  { id: 'gold',     name: 'Gold',      symbol: 'XAU',  emoji: '🥇', price: 2387.45, change24h: 29.45,   changePct24h: 1.25,  high24h: 2402.10, low24h: 2356.20, volume24h: 15420, volume: '15.4K oz', weekHigh52: 2480.20, weekLow52: 1810.30, description: 'Gold is the world\'s premier safe-haven asset, driven by central bank demand, inflation hedging, and geopolitical risk.',      unit: '/oz',    color: '#F6C453', category: 'precious', sparkline: genSparkline(20, true) },
  { id: 'silver',   name: 'Silver',    symbol: 'XAG',  emoji: '🪙', price: 29.67,   change24h: 0.22,    changePct24h: 0.73,  high24h: 30.10,   low24h: 29.20,   volume24h: 8910,  volume: '8.9K oz',  weekHigh52: 32.50,   weekLow52: 20.10,   description: 'Silver has dual demand as a precious metal and industrial input for solar panels, EVs, and electronics.',                           unit: '/oz',    color: '#94A3B8', category: 'precious', sparkline: genSparkline(20, true) },
  { id: 'copper',   name: 'Copper',    symbol: 'HG',   emoji: '🟤', price: 4.39,    change24h: -0.018,  changePct24h: -0.41, high24h: 4.44,    low24h: 4.32,    volume24h: 22100, volume: '22.1K lbs', weekHigh52: 5.20,    weekLow52: 3.55,    description: 'Copper is the bellwether of global economic health, used in everything from electric grids to EV motors.',                          unit: '/lb',    color: '#D97706', category: 'base',    sparkline: genSparkline(20, false) },
  { id: 'uranium',  name: 'Uranium',   symbol: 'U3O8', emoji: '☢️', price: 79.21,   change24h: 1.69,    changePct24h: 2.18,  high24h: 80.00,   low24h: 77.50,   volume24h: 3200,  volume: '3.2K lbs',  weekHigh52: 107.00,  weekLow52: 48.40,   description: 'Uranium fuels nuclear power plants. AI data center demand and clean energy mandates are driving a nuclear renaissance.',           unit: '/lb',    color: '#16A34A', category: 'energy',  sparkline: genSparkline(20, true) },
  { id: 'iron-ore', name: 'Iron Ore',  symbol: 'FE',   emoji: '⚙️', price: 112.45,  change24h: 1.18,    changePct24h: 1.06,  high24h: 113.80,  low24h: 110.20,  volume24h: 41000, volume: '41.0K t',   weekHigh52: 145.00,  weekLow52: 88.50,   description: 'Iron ore is the key input for steel production. China accounts for over 70% of global seaborne demand.',                           unit: '/t',     color: '#EF4444', category: 'base',    sparkline: genSparkline(20, true) },
  { id: 'oil',      name: 'Oil (WTI)', symbol: 'WTI',  emoji: '🛢️', price: 78.30,   change24h: -0.094,  changePct24h: -0.12, high24h: 79.00,   low24h: 77.80,   volume24h: 95000, volume: '95.0K bbl', weekHigh52: 95.00,   weekLow52: 63.00,   description: 'WTI crude oil is the US benchmark. Prices are influenced by OPEC+ decisions, global demand, and energy transition dynamics.',     unit: '/bbl',   color: '#1E40AF', category: 'energy',  sparkline: genSparkline(20, false) },
  { id: 'lithium',  name: 'Lithium',   symbol: 'LI',   emoji: '🔋', price: 12.45,   change24h: -0.23,   changePct24h: -1.85, high24h: 12.90,   low24h: 12.30,   volume24h: 1800,  volume: '1.8K kg',   weekHigh52: 22.50,   weekLow52: 9.80,    description: 'Lithium is the critical battery metal powering the EV revolution. Current oversupply is pressuring spot prices.',                  unit: '/kg',    color: '#2563EB', category: 'battery', sparkline: genSparkline(20, false) },
  { id: 'nickel',   name: 'Nickel',    symbol: 'NI',   emoji: '⚫', price: 17420,   change24h: -124,    changePct24h: -0.71, high24h: 17600,   low24h: 17200,   volume24h: 12400, volume: '12.4K t',   weekHigh52: 21500,   weekLow52: 14200,   description: 'Nickel is essential for stainless steel and EV battery cathodes. Indonesian supply surplus has weighed on prices.',               unit: '/t',     color: '#4B5563', category: 'base',    sparkline: genSparkline(20, false) },
  { id: 'coal',     name: 'Coal',      symbol: 'COAL', emoji: '🪨', price: 138.50,  change24h: 0.55,    changePct24h: 0.40,  high24h: 139.20,  low24h: 137.80,  volume24h: 8700,  volume: '8.7K t',    weekHigh52: 158.00,  weekLow52: 112.00,  description: 'Thermal coal remains a major energy source globally, with seaborne pricing tied to Asian demand and energy security.',              unit: '/t',     color: '#374151', category: 'energy',  sparkline: genSparkline(20, true) },
  { id: 'aluminium',name: 'Aluminium', symbol: 'AL',   emoji: '🔩', price: 2485,    change24h: 22,      changePct24h: 0.89,  high24h: 2500,    low24h: 2455,    volume24h: 18900, volume: '18.9K t',   weekHigh52: 2700,    weekLow52: 2100,    description: 'Aluminium is the most widely used non-ferrous metal, with demand driven by aerospace, automotive, and packaging.',                 unit: '/t',     color: '#6B7280', category: 'base',    sparkline: genSparkline(20, true) },
  { id: 'tin',      name: 'Tin',       symbol: 'SN',   emoji: '🔧', price: 33200,   change24h: 320,     changePct24h: 0.97,  high24h: 33400,   low24h: 32800,   volume24h: 2100,  volume: '2.1K t',    weekHigh52: 38000,   weekLow52: 24500,   description: 'Tin is a critical metal for soldering electronics and is a key enabler of the semiconductor supply chain.',                       unit: '/t',     color: '#7C3AED', category: 'base',    sparkline: genSparkline(20, true) },
  { id: 'nat-gas',  name: 'Nat. Gas',  symbol: 'NG',   emoji: '🔥', price: 2.84,    change24h: 0.04,    changePct24h: 1.42,  high24h: 2.90,    low24h: 2.78,    volume24h: 64000, volume: '64.0K MMBtu',weekHigh52: 4.10,    weekLow52: 1.90,   description: 'Natural gas is both an energy commodity and a feedstock. LNG exports and weather patterns drive significant volatility.',        unit: '/MMBtu', color: '#F97316', category: 'energy',  sparkline: genSparkline(20, true) },
]

export const COMPANIES: MiningCompany[] = [
  {
    id: 'nem', name: 'Newmont', ticker: 'NEM', exchange: 'NYSE',
    country: 'USA', lat: 39.5, lon: -106.1,
    commodity: ['Gold'], color: '#F6C453', initials: 'N',
    price: 46.21, change: 1.12, cap: '$42.1B', pe: '18.4x', ev: '12.3x', div: '2.1%',
    range52w: '$33.20 – $58.40', description: "World's largest gold mining company by production.",
    status: 'Operating', capacity: '6.0M oz/yr', production: '5.6M oz/yr', reserves: '96M oz', employees: '31,000', founded: '1921',
    operations: ['Boddington, Australia', 'Peñasquito, Mexico', 'Cripple Creek & Victor, USA', 'Lihir, PNG'],
    news: [{ headline: 'Newmont raises full-year guidance on strong Q2', time: '3h ago' }, { headline: 'Nevada Complex hits record quarterly output', time: '1d ago' }]
  },
  {
    id: 'gold', name: 'Barrick Gold', ticker: 'GOLD', exchange: 'NYSE',
    country: 'Canada', lat: 57.0, lon: -95.0,
    commodity: ['Gold', 'Copper'], color: '#EAB308', initials: 'GOLD',
    price: 20.14, change: 0.85, cap: '$35.8B', pe: '15.2x', ev: '10.1x', div: '0.9%',
    range52w: '$14.30 – $23.80', description: "Second largest gold company globally with flagship Nevada assets.",
    status: 'Operating', capacity: '5.0M oz/yr', production: '4.1M oz/yr', reserves: '76M oz', employees: '27,000', founded: '1983',
    operations: ['Nevada Complex, USA', 'Kibali, DRC', 'Loulo-Gounkoto, Mali', 'Lumwana, Zambia'],
    news: [{ headline: 'Barrick progresses Reko Diq copper-gold project', time: '5h ago' }, { headline: 'CEO highlights Africa growth pipeline at analyst day', time: '2d ago' }]
  },
  {
    id: 'fcx', name: 'Freeport-McMoRan', ticker: 'FCX', exchange: 'NYSE',
    country: 'USA', lat: 33.1, lon: -109.9,
    commodity: ['Copper', 'Gold'], color: '#D97706', initials: 'FCX',
    price: 44.20, change: 1.34, cap: '$63.8B', pe: '22.1x', ev: '14.5x', div: '1.5%',
    range52w: '$33.70 – $54.90', description: "World's largest publicly traded copper producer. Operates Grasberg, the largest gold-copper mine.",
    status: 'Operating', capacity: '4.2B lbs/yr', production: '4.2B lbs Cu/yr', reserves: '118B lbs Cu', employees: '29,200', founded: '1912',
    operations: ['Grasberg, Indonesia', 'Morenci, USA', 'Cerro Verde, Peru', 'El Abra, Chile'],
    news: [{ headline: 'Grasberg underground ramp-up ahead of schedule', time: '2h ago' }, { headline: 'FCX announces $2.4B new smelter project in Indonesia', time: '3d ago' }]
  },
  {
    id: 'bhp', name: 'BHP Group', ticker: 'BHP', exchange: 'NYSE',
    country: 'Australia', lat: -25.3, lon: 131.0,
    commodity: ['Copper', 'Iron Ore', 'Nickel'], color: '#EA580C', initials: 'BHP',
    price: 57.33, change: 0.89, cap: '$148.3B', pe: '12.8x', ev: '8.9x', div: '4.2%',
    range52w: '$44.20 – $68.10', description: "World's largest diversified mining company by market cap.",
    status: 'Operating', capacity: '290M t/yr Fe', production: '287M t/yr Fe', reserves: '11B t Fe', employees: '80,000', founded: '1885',
    operations: ['Olympic Dam, Australia', 'Escondida, Chile', 'Pilbara Iron Ore, Australia', 'Jansen Potash, Canada'],
    news: [{ headline: 'BHP beats iron ore shipment target in June quarter', time: '6h ago' }, { headline: 'Copper division eyes expansion at Escondida', time: '1d ago' }]
  },
  {
    id: 'rio', name: 'Rio Tinto', ticker: 'RIO', exchange: 'NYSE',
    country: 'Australia', lat: -22.5, lon: 117.8,
    commodity: ['Iron Ore', 'Copper', 'Aluminium'], color: '#EF4444', initials: 'RIO',
    price: 62.48, change: 0.30, cap: '$115.2B', pe: '11.4x', ev: '7.8x', div: '5.1%',
    range52w: '$53.40 – $74.20', description: "Global mining leader in iron ore, copper and aluminium.",
    status: 'Operating', capacity: '340M t/yr', production: '331M t/yr Fe', reserves: '13B t Fe', employees: '57,000', founded: '1873',
    operations: ['Pilbara, Australia', 'Oyu Tolgoi, Mongolia', 'Kennecott, USA', 'Simandou, Guinea'],
    news: [{ headline: 'Oyu Tolgoi reaches design throughput underground', time: '8h ago' }, { headline: 'Aluminium segment rebounds on China demand', time: '2d ago' }]
  },
  {
    id: 'vale', name: 'Vale', ticker: 'VALE', exchange: 'NYSE',
    country: 'Brazil', lat: -8.0, lon: -51.2,
    commodity: ['Iron Ore', 'Nickel'], color: '#16A34A', initials: 'V',
    price: 14.52, change: 1.42, cap: '$68.4B', pe: '9.3x', ev: '6.1x', div: '6.8%',
    range52w: '$10.20 – $17.90', description: "World's largest iron ore and second-largest nickel producer.",
    status: 'Operating', capacity: '310M t/yr', production: '290M t/yr Fe', reserves: '14B t Fe', employees: '75,000', founded: '1942',
    operations: ['Carajás, Brazil', 'Sudbury, Canada', 'Onça Puma, Brazil', "Voisey's Bay, Canada"],
    news: [{ headline: "Vale iron ore production climbs 6% in H1 2026", time: '4h ago' }, { headline: 'Nickel unit weighs Indonesia expansion plan', time: '1d ago' }]
  },
  {
    id: 'scco', name: 'Southern Copper', ticker: 'SCCO', exchange: 'NYSE',
    country: 'Peru', lat: -16.1, lon: -72.0,
    commodity: ['Copper'], color: '#B45309', initials: 'SCCO',
    price: 75.20, change: 0.92, cap: '$58.4B', pe: '19.7x', ev: '12.8x', div: '3.4%',
    range52w: '$62.10 – $88.30', description: "Largest copper reserve base in the mining industry.",
    status: 'Operating', capacity: '1.0M t/yr', production: '0.9M t/yr Cu', reserves: '43M t Cu', employees: '16,000', founded: '1952',
    operations: ['Cuajone, Peru', 'Toquepala, Peru', 'Cananea, Mexico', 'Buenavista del Cobre, Mexico'],
    news: [{ headline: 'Southern Copper expands Tia Maria to full capacity', time: '1h ago' }, { headline: 'Peru operations unaffected by Q3 regional unrest', time: '3d ago' }]
  },
  {
    id: 'ccj', name: 'Cameco', ticker: 'CCJ', exchange: 'NYSE',
    country: 'Canada', lat: 57.6, lon: -109.3,
    commodity: ['Uranium'], color: '#16A34A', initials: 'CCJ',
    price: 47.23, change: 2.85, cap: '$18.9B', pe: '28.4x', ev: '19.3x', div: '0.3%',
    range52w: '$30.10 – $52.80', description: "World's largest publicly traded uranium producer.",
    status: 'Operating', capacity: '18M lbs/yr', production: '8.3M lbs/yr U3O8', reserves: '456M lbs U3O8', employees: '2,700', founded: '1988',
    operations: ['McArthur River, Canada', 'Cigar Lake, Canada', 'Inkai, Kazakhstan', 'Key Lake, Canada'],
    news: [{ headline: 'Uranium spot hits $96/lb as AI power demand surges', time: '30m ago' }, { headline: 'Cameco raises full-year production guidance by 5%', time: '6h ago' }]
  },
  {
    id: 'mp', name: 'MP Materials', ticker: 'MP', exchange: 'NYSE',
    country: 'USA', lat: 35.4, lon: -115.5,
    commodity: ['Rare Earth'], color: '#7C3AED', initials: 'MP',
    price: 20.45, change: 1.92, cap: '$4.8B', pe: '35.2x', ev: '22.4x', div: '—',
    range52w: '$13.40 – $24.10', description: "Only operating rare earth mine in the Western Hemisphere. Supplies critical EV magnets.",
    status: 'Operating', capacity: '60K t/yr REO', production: '42K t/yr REO', reserves: '1.5B t ore', employees: '780', founded: '2017',
    operations: ['Mountain Pass Mine, USA', 'Fort Worth Magnetics, USA'],
    news: [{ headline: 'MP Materials signs $150M DoD rare earth supply contract', time: '2h ago' }, { headline: 'Mountain Pass phase 3 expansion breaks ground', time: '3d ago' }]
  },
  {
    id: 'alb', name: 'Albemarle', ticker: 'ALB', exchange: 'NYSE',
    country: 'Chile', lat: -24.2, lon: -68.8,
    commodity: ['Lithium'], color: '#2563EB', initials: 'ALB',
    price: 112.35, change: -1.45, cap: '$13.2B', pe: '24.8x', ev: '15.1x', div: '1.1%',
    range52w: '$82.10 – $138.50', description: "World's largest lithium producer by volume, essential for EV batteries.",
    status: 'Operating', capacity: '220K t/yr LCE', production: '188K t/yr LCE', reserves: '40M t LCE', employees: '7,900', founded: '1887',
    operations: ['Salar de Atacama, Chile', 'Silver Peak, USA', 'Greenbushes, Australia (partial)'],
    news: [{ headline: 'Albemarle cuts capex as lithium price remains soft', time: '5h ago' }, { headline: 'Long-term EV demand keeps expansion plans intact', time: '1d ago' }]
  },
  {
    id: 'gfi', name: 'Gold Fields', ticker: 'GFI', exchange: 'NYSE',
    country: 'South Africa', lat: -26.7, lon: 26.6,
    commodity: ['Gold'], color: '#F59E0B', initials: 'GFI',
    price: 14.82, change: 2.15, cap: '$12.4B', pe: '14.2x', ev: '9.8x', div: '3.2%',
    range52w: '$9.80 – $16.70', description: "South African gold miner with growing Americas and West Africa presence.",
    status: 'Operating', capacity: '2.5M oz/yr', production: '2.3M oz/yr Au', reserves: '48M oz Au', employees: '22,000', founded: '1998',
    operations: ['South Deep, South Africa', 'Salares Norte, Chile', 'Tarkwa, Ghana', 'Damang, Ghana'],
    news: [{ headline: 'Salares Norte reaches design capacity a quarter early', time: '4h ago' }, { headline: 'South Deep sets new quarterly production record', time: '2d ago' }]
  },
  {
    id: 'ivpaf', name: 'Ivanhoe Mines', ticker: 'IVPAF', exchange: 'OTC',
    country: 'DRC', lat: -10.8, lon: 26.4,
    commodity: ['Copper'], color: '#D97706', initials: 'IVN',
    price: 18.44, change: 1.25, cap: '$21.4B', pe: '19.3x', ev: '11.8x', div: '—',
    range52w: '$13.70 – $22.10', description: "Developing world-class copper mines in the DRC. Kamoa-Kakula is top-tier.",
    status: 'Operating', capacity: '600K t/yr Cu', production: '437K t/yr Cu', reserves: '15M t Cu', employees: '6,400', founded: '1994',
    operations: ['Kamoa-Kakula, DRC', 'Platreef, South Africa', 'Kipushi, DRC'],
    news: [{ headline: 'Kamoa-Kakula reaches 600K tpa annualised run rate', time: '3h ago' }, { headline: 'Platreef shaft sinks to target depth on schedule', time: '1d ago' }]
  },
  {
    id: 'nxe', name: 'NexGen Energy', ticker: 'NXE', exchange: 'NYSE',
    country: 'Canada', lat: 58.5, lon: -109.8,
    commodity: ['Uranium'], color: '#059669', initials: 'NXE',
    price: 7.85, change: 3.40, cap: '$4.1B', pe: '—', ev: '—', div: '—',
    range52w: '$4.20 – $9.10', description: "Developing the world's largest undeveloped uranium project in Canada's Athabasca Basin.",
    status: 'Development', capacity: '30M lbs/yr (target)', production: '0', reserves: '256M lbs U3O8', employees: '340', founded: '2011',
    operations: ['Rook I (Arrow), Saskatchewan, Canada'],
    news: [{ headline: 'Arrow deposit environmental assessment approved', time: '2h ago' }, { headline: 'NXE completes C$200M bought deal financing', time: '5h ago' }]
  },
  {
    id: 'oyu', name: 'Oyu Tolgoi (Rio)', ticker: 'RIO', exchange: 'NYSE',
    country: 'Mongolia', lat: 43.0, lon: 106.9,
    commodity: ['Copper', 'Gold'], color: '#B45309', initials: 'OT',
    price: 62.48, change: 0.30, cap: '$115.2B', pe: '11.4x', ev: '7.8x', div: '5.1%',
    range52w: '$53.40 – $74.20', description: "Oyu Tolgoi is one of the world's largest known copper-gold deposits, operated by Rio Tinto.",
    status: 'Operating', capacity: '500K t/yr Cu (peak)', production: '194K t/yr Cu', reserves: '6.6M t Cu', employees: '8,200', founded: '2001',
    operations: ['Oyu Tolgoi Underground, Mongolia', 'Oyu Tolgoi Open Pit, Mongolia'],
    news: [{ headline: 'OT underground achieves design throughput target', time: '8h ago' }, { headline: 'Mongolia copper exports hit multi-year record', time: '2d ago' }]
  },
  {
    id: 'nilsy', name: 'Norilsk Nickel', ticker: 'NILSY', exchange: 'OTC',
    country: 'Russia', lat: 69.0, lon: 88.2,
    commodity: ['Nickel', 'Palladium'], color: '#4B5563', initials: 'NN',
    price: 18.40, change: -0.82, cap: '$24.7B', pe: '7.1x', ev: '5.3x', div: '5.5%',
    range52w: '$14.20 – $24.80', description: "World's largest palladium and high-grade nickel producer.",
    status: 'Operating', capacity: '230K t/yr Ni', production: '221K t/yr Ni', reserves: '5.8M t Ni', employees: '75,000', founded: '1935',
    operations: ['Norilsk Polar Division, Russia', 'Kola MMC, Russia', 'Nkomati, South Africa'],
    news: [{ headline: 'Nickel output stable despite infrastructure pressure', time: '12h ago' }, { headline: 'Palladium pricing recovers on automotive sector', time: '3d ago' }]
  },
]

export const NEWS_ARTICLES: NewsArticle[] = [
  { id: '1', title: 'Gold Surges Past $2,400 as Fed Signals Rate Path Shift', summary: 'Gold hit a fresh 2-month high following dovish Fed commentary, with traders pricing in 2 cuts before year-end. ETF inflows accelerated sharply.', category: 'metals', sentiment: 'bullish', source: 'Reuters', time: '2h ago', readTime: '3 min', thumbnail: '🥇', commodities: ['Gold'] },
  { id: '2', title: 'Copper Demand Outlook Upgraded on Energy Transition Acceleration', summary: 'Goldman Sachs raised its 2026 copper price forecast to $5.20/lb citing faster-than-expected grid investment and EV adoption in China.', category: 'metals', sentiment: 'bullish', source: 'Bloomberg', time: '4h ago', readTime: '4 min', thumbnail: '🟤', commodities: ['Copper'] },
  { id: '3', title: 'Uranium Spot Price Hits $96/lb Driven by AI Data Center Power Demand', summary: 'Nuclear power is seeing a renaissance as hyperscalers ink long-term offtake agreements with uranium producers. Cameco and NexGen lead gains.', category: 'energy', sentiment: 'bullish', source: 'FT', time: '1h ago', readTime: '5 min', thumbnail: '☢️', commodities: ['Uranium'] },
  { id: '4', title: 'Iron Ore Steady as China Signals Infrastructure Push', summary: "China's NPC approved a $500B infrastructure stimulus package, boosting iron ore sentiment. Vale and BHP lead mining stocks higher.", category: 'metals', sentiment: 'bullish', source: 'WSJ', time: '6h ago', readTime: '3 min', thumbnail: '⚙️', commodities: ['Iron Ore'] },
  { id: '5', title: 'Lithium Prices Remain Under Pressure Amid Supply Surplus', summary: 'Lithium carbonate prices in China fell another 3% this week as new Australian and South American projects add supply ahead of EV demand curve.', category: 'metals', sentiment: 'bearish', source: 'Mining.com', time: '8h ago', readTime: '4 min', thumbnail: '🔋', commodities: ['Lithium'] },
  { id: '6', title: 'Fed Holds Rates; Powell Says "Data Dependent" Path Ahead', summary: "The Federal Reserve held rates steady at 5.25-5.50% but signaled potential cuts in Q4. Precious metals rallied on the softer tone.", category: 'macro', sentiment: 'neutral', source: 'CNBC', time: '10h ago', readTime: '4 min', thumbnail: '🏦', commodities: ['Gold', 'Silver'] },
  { id: '7', title: 'Rare Earth Supply Chain Concerns Mount as China Tightens Export Controls', summary: 'Beijing announced new export permit requirements for rare earth processing chemicals, pushing MP Materials and Energy Fuels sharply higher.', category: 'mining', sentiment: 'bullish', source: 'WSJ', time: '12h ago', readTime: '6 min', thumbnail: '⚡', commodities: ['Rare Earth'] },
  { id: '8', title: 'Nickel Market Faces Structural Surplus Through 2027, Goldman Says', summary: 'Indonesian nickel supply growth continues to outpace EV battery demand, with Goldman projecting a 220K tonne surplus this year.', category: 'metals', sentiment: 'bearish', source: 'Goldman Sachs', time: '14h ago', readTime: '5 min', thumbnail: '⚫', commodities: ['Nickel'] },
]

export const LESSONS: EducationLesson[] = [
  { id: '1', title: 'What Moves Commodity Prices?', description: 'Learn the key drivers behind commodity price movements — from supply/demand to macro forces.', category: 'beginner', readTime: '5 min', xp: 50, progress: 100, completed: true, emoji: '📈', learners: '1.2K' },
  { id: '2', title: 'Supply & Demand in Metals Markets', description: 'Understand how inventory levels, production data and consumption trends drive metal prices.', category: 'intermediate', readTime: '7 min', xp: 100, progress: 60, completed: false, emoji: '⚖️', learners: '890' },
  { id: '3', title: 'Hedging Strategies for Commodities', description: "Protect your portfolio with futures, options and ETFs. Learn how producers and traders manage price risk.", category: 'advanced', readTime: '9 min', xp: 200, progress: 20, completed: false, emoji: '🛡️', learners: '430' },
  { id: '4', title: 'Understanding Spot vs. Futures Markets', description: 'Discover the difference between spot prices and futures contracts, and why contango and backwardation matter.', category: 'intermediate', readTime: '6 min', xp: 100, progress: 0, completed: false, emoji: '📊', learners: '670' },
  { id: '5', title: "Gold: The World's Safe Haven Asset", description: "Why gold holds its value during crises, how central banks use it, and how to invest in gold exposure.", category: 'beginner', readTime: '4 min', xp: 50, progress: 0, completed: false, emoji: '🥇', learners: '2.1K' },
  { id: '6', title: 'The Copper-Economy Correlation', description: 'Copper is called "Dr. Copper" for predicting economic cycles. Learn how to read it as a macro indicator.', category: 'intermediate', readTime: '6 min', xp: 100, progress: 0, completed: false, emoji: '🟤', learners: '540' },
  { id: '7', title: 'Mining Stocks vs. Physical Metals', description: 'Compare direct commodity exposure against mining equities — leverage, risk, and return dynamics.', category: 'intermediate', readTime: '8 min', xp: 150, progress: 0, completed: false, emoji: '⛏️', learners: '380' },
  { id: '8', title: 'The Nuclear Renaissance: Uranium 101', description: 'AI data centers and climate targets are driving nuclear power growth. Learn how to invest in uranium.', category: 'beginner', readTime: '5 min', xp: 75, progress: 0, completed: false, emoji: '☢️', learners: '920' },
]

export const PORTFOLIO: PortfolioPosition[] = [
  { id: 'gold',     commodity: 'Gold',    symbol: 'XAU',  emoji: '🥇', color: '#F6C453', size: 5.24,  quantity: 5.24,  unit: 'oz',  entryPrice: 2300.15, avgEntry: 2300.15, markPrice: 2387.45, value: 12510.24, pnl: 457.89,  pnlPct: 3.80,  allocation: 42, sparkline: genSparkline(12, true),  type: 'long' },
  { id: 'copper',   commodity: 'Copper',  symbol: 'HG',   emoji: '🟤', color: '#D97706', size: 8.50,  quantity: 8.50,  unit: 'lbs', entryPrice: 4.12,    avgEntry: 4.12,    markPrice: 4.39,    value: 37.32,   pnl: 229.50,  pnlPct: 6.55,  allocation: 28, sparkline: genSparkline(12, true),  type: 'long' },
  { id: 'uranium',  commodity: 'Uranium', symbol: 'U3O8', emoji: '☢️', color: '#16A34A', size: 120,   quantity: 120,   unit: 'lbs', entryPrice: 71.40,   avgEntry: 71.40,   markPrice: 79.21,   value: 9505.20, pnl: 937.20,  pnlPct: 10.94, allocation: 18, sparkline: genSparkline(12, true),  type: 'long' },
  { id: 'silver',   commodity: 'Silver',  symbol: 'XAG',  emoji: '🪙', color: '#94A3B8', size: 50,    quantity: 50,    unit: 'oz',  entryPrice: 28.90,   avgEntry: 28.90,   markPrice: 29.67,   value: 1483.50, pnl: 38.50,   pnlPct: 2.66,  allocation: 8,  sparkline: genSparkline(12, true),  type: 'long' },
  { id: 'nickel',   commodity: 'Nickel',  symbol: 'NI',   emoji: '⚫', color: '#4B5563', size: 0.80,  quantity: 0.80,  unit: 't',   entryPrice: 18200,   avgEntry: 18200,   markPrice: 17420,   value: 13936,   pnl: -624.00, pnlPct: -4.29, allocation: 4,  sparkline: genSparkline(12, false), type: 'long' },
]

export const WATCHLIST_ITEMS: WatchlistItem[] = [
  { id: '1', commodity: 'Gold',      symbol: 'XAU',  emoji: '🥇', price: 2387.45, change: 29.45,  changePct: 1.25,  color: '#F6C453', alerts: 2, alertPrice: 2400, sparkline: genSparkline(12, true) },
  { id: '2', commodity: 'Silver',    symbol: 'XAG',  emoji: '🪙', price: 29.67,   change: 0.22,   changePct: 0.73,  color: '#94A3B8', alerts: 0,                  sparkline: genSparkline(12, true) },
  { id: '3', commodity: 'Copper',    symbol: 'HG',   emoji: '🟤', price: 4.39,    change: -0.018, changePct: -0.41, color: '#D97706', alerts: 1, alertPrice: 4.50,  sparkline: genSparkline(12, false) },
  { id: '4', commodity: 'Uranium',   symbol: 'U3O8', emoji: '☢️', price: 79.21,   change: 1.69,   changePct: 2.18,  color: '#16A34A', alerts: 3, alertPrice: 85,    sparkline: genSparkline(12, true) },
  { id: '5', commodity: 'Iron Ore',  symbol: 'FE',   emoji: '⚙️', price: 112.45,  change: 1.18,   changePct: 1.06,  color: '#EF4444', alerts: 0,                  sparkline: genSparkline(12, true) },
  { id: '6', commodity: 'Lithium',   symbol: 'LI',   emoji: '🔋', price: 12.45,   change: -0.23,  changePct: -1.85, color: '#2563EB', alerts: 1, alertPrice: 11,    sparkline: genSparkline(12, false) },
]
