export type Product = {
  id: string;
  brand: string;
  name: string;
  category: 'Men' | 'Women' | 'Apparel' | 'Eat';
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  location: string;
  availability: 'In Stock' | 'Low Stock' | 'Pre-Order';
  badge?: string;
  images: string[];
  description: string;
  collection: 'New Arrivals' | 'Trending' | 'Best Sellers';
};

const px = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=900&w=600`;

export const brands = [
  'HULK BUSTER',
  'MONOCHROME',
  'NULL SECTOR',
  'OFFGRID',
  'BLACKLINE',
  'HEX',
  'ATELIER 02',
  'RAW CO.',
];

export const colorOptions = [
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'White', hex: '#f4f3ef' },
  { name: 'Graphite', hex: '#3a3a3a' },
  { name: 'Ash', hex: '#6b6b6b' },
  { name: 'Bone', hex: '#e9e8e3' },
  { name: 'Olive', hex: '#4a4a2a' },
  { name: 'Navy', hex: '#1a2238' },
  { name: 'Burgundy', hex: '#4a0d12' },
  { name: 'Red', hex: '#d61f14' },
];

export const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const categories = ['Men', 'Women', 'Apparel', 'Eat'];

export const locations = ['New York', 'Los Angeles', 'Tokyo', 'Berlin', 'London', 'Paris'];

export const products: Product[] = [
  {
    id: 'p1',
    brand: 'HULK BUSTER',
    name: 'Oversized Technical Hoodie',
    category: 'Men',
    subcategory: 'Hoodies',
    price: 189,
    originalPrice: 280,
    discount: 32,
    rating: 4.8,
    reviews: 214,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Graphite', hex: '#3a3a3a' },
      { name: 'Bone', hex: '#e9e8e3' },
    ],
    location: 'New York',
    availability: 'In Stock',
    badge: 'New',
    images: [px('28701960'), px('35342196'), px('14241847')],
    description:
      'A heavyweight 480gsm fleece hoodie cut oversized with dropped shoulders and a double-layer hood. Garment-dyed for a lived-in hand. Engineered to fall, not drape.',
    collection: 'New Arrivals',
  },
  {
    id: 'p2',
    brand: 'MONOCHROME',
    name: 'Leather Statement Bomber',
    category: 'Women',
    subcategory: 'Outerwear',
    price: 645,
    originalPrice: 890,
    discount: 28,
    rating: 4.9,
    reviews: 167,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Burgundy', hex: '#4a0d12' },
    ],
    location: 'Tokyo',
    availability: 'Low Stock',
    badge: 'Trending',
    images: [px('29817611'), px('7507052'), px('17045047')],
    description:
      'Full-grain leather bomber with an asymmetric zip and satin lining. Sculpted shoulders and a cropped silhouette designed to sit sharp over tailoring or a tonal tee.',
    collection: 'Trending',
  },
  {
    id: 'p3',
    brand: 'NULL SECTOR',
    name: 'Distressed Denim Cargo',
    category: 'Men',
    subcategory: 'Pants',
    price: 230,
    originalPrice: 340,
    discount: 32,
    rating: 4.7,
    reviews: 98,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy', hex: '#1a2238' },
      { name: 'Black', hex: '#0a0a0a' },
    ],
    location: 'Berlin',
    availability: 'In Stock',
    images: [px('14437345'), px('18403112'), px('17086263')],
    description:
      '14oz Japanese selvedge denim, hand-distressed and patched. Six-pocket cargo geometry with adjustable hem cinch. A statement bottom built to break in.',
    collection: 'Best Sellers',
  },
  {
    id: 'p4',
    brand: 'OFFGRID',
    name: 'Mesh Layer Tee — Bone',
    category: 'Apparel',
    subcategory: 'Tees',
    price: 95,
    originalPrice: 140,
    discount: 32,
    rating: 4.6,
    reviews: 142,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bone', hex: '#e9e8e3' },
      { name: 'Black', hex: '#0a0a0a' },
    ],
    location: 'London',
    availability: 'In Stock',
    images: [px('15051720'), px('20772232'), px('17389793')],
    description:
      'A sheer technical mesh tee engineered for layering. Flatlock seams, bonded hem, and a boxy cropped fit. Wear it alone or stacked under an open jacket.',
    collection: 'New Arrivals',
  },
  {
    id: 'p5',
    brand: 'BLACKLINE',
    name: 'High-Top Sneaker — Phantom',
    category: 'Apparel',
    subcategory: 'Footwear',
    price: 295,
    originalPrice: 420,
    discount: 30,
    rating: 4.9,
    reviews: 311,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'White', hex: '#f4f3ef' },
      { name: 'Red', hex: '#d61f14' },
    ],
    location: 'Paris',
    availability: 'Low Stock',
    badge: 'Best Seller',
    images: [px('19845610'), px('26775749'), px('26852497')],
    description:
      'Italian-leather high-top with a vulcanised wrap sole and tonal stitching. Memory-foam footbed, waxed laces, and a sculpted toe box. A monochrome essential.',
    collection: 'Best Sellers',
  },
  {
    id: 'p6',
    brand: 'HEX',
    name: 'Cropped Puffer — Carbon',
    category: 'Women',
    subcategory: 'Outerwear',
    price: 380,
    originalPrice: 520,
    discount: 27,
    rating: 4.7,
    reviews: 76,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Graphite', hex: '#3a3a3a' },
    ],
    location: 'New York',
    availability: 'In Stock',
    badge: 'New',
    images: [px('16323485'), px('10160748'), px('9478334')],
    description:
      'Responsibly-sourced down puffer in a cropped boxy cut. Matte ripstop shell, welded baffles, and a hidden storm hood. Warmth engineered for the urban commute.',
    collection: 'New Arrivals',
  },
  {
    id: 'p7',
    brand: 'ATELIER 02',
    name: 'Oversized Wool Trench',
    category: 'Women',
    subcategory: 'Outerwear',
    price: 720,
    originalPrice: 980,
    discount: 26,
    rating: 4.8,
    reviews: 54,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Ash', hex: '#6b6b6b' },
      { name: 'Black', hex: '#0a0a0a' },
    ],
    location: 'Tokyo',
    availability: 'Pre-Order',
    images: [px('35150074'), px('31502130'), px('31502129')],
    description:
      'A double-faced wool trench with exaggerated lapels and a self-tie belt. Floor-skimming length, dropped sleeves, and a raw-cut hem. Tailoring in a streetwear key.',
    collection: 'Trending',
  },
  {
    id: 'p8',
    brand: 'RAW CO.',
    name: 'Graphic Hoodie — Static',
    category: 'Apparel',
    subcategory: 'Hoodies',
    price: 165,
    originalPrice: 240,
    discount: 31,
    rating: 4.5,
    reviews: 188,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Bone', hex: '#e9e8e3' },
    ],
    location: 'Los Angeles',
    availability: 'In Stock',
    images: [px('19697348'), px('31700390'), px('29463935')],
    description:
      'Heavyweight fleece with an original static-print graphic. Boxy fit, kangaroo pocket, and a drawcord hood with metal tips. Made to layer, made to last.',
    collection: 'Trending',
  },
  {
    id: 'p9',
    brand: 'HULK BUSTER',
    name: 'Tailored Trouser — Relaxed',
    category: 'Men',
    subcategory: 'Pants',
    price: 210,
    originalPrice: 300,
    discount: 30,
    rating: 4.6,
    reviews: 67,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Graphite', hex: '#3a3a3a' },
      { name: 'Navy', hex: '#1a2238' },
    ],
    location: 'Berlin',
    availability: 'In Stock',
    images: [px('17459774'), px('1726458'), px('18758192')],
    description:
      'A relaxed pleated trouser in a pressed wool blend. Hook closure, tapered leg, and a clean break. Office-ready, street-proven.',
    collection: 'Best Sellers',
  },
  {
    id: 'p10',
    brand: 'MONOCHROME',
    name: 'Sheer Knit Dress',
    category: 'Women',
    subcategory: 'Dresses',
    price: 340,
    originalPrice: 480,
    discount: 29,
    rating: 4.7,
    reviews: 43,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Burgundy', hex: '#4a0d12' },
    ],
    location: 'Paris',
    availability: 'Low Stock',
    badge: 'Trending',
    images: [px('12151007'), px('10411176'), px('9225667')],
    description:
      'A second-skin sheer knit midi with a mock neck and thumbholes. Body-mapped compression zones and a raw-cut hem. Minimal, structural, unmistakable.',
    collection: 'Trending',
  },
  {
    id: 'p11',
    brand: 'OFFGRID',
    name: 'Tech Cargo Vest',
    category: 'Apparel',
    subcategory: 'Outerwear',
    price: 175,
    originalPrice: 250,
    discount: 30,
    rating: 4.5,
    reviews: 89,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Olive', hex: '#4a4a2a' },
    ],
    location: 'London',
    availability: 'In Stock',
    images: [px('8284856'), px('27348257'), px('11942948')],
    description:
      'A six-pocket utility vest in matte ripstop. Modular webbing, adjustable side straps, and a magnetic storm flap. Function-first, styled for the street.',
    collection: 'New Arrivals',
  },
  {
    id: 'p12',
    brand: 'BLACKLINE',
    name: 'Low Profile Cap — Noir',
    category: 'Apparel',
    subcategory: 'Accessories',
    price: 65,
    originalPrice: 90,
    discount: 28,
    rating: 4.4,
    reviews: 256,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Bone', hex: '#e9e8e3' },
      { name: 'Red', hex: '#d61f14' },
    ],
    location: 'Los Angeles',
    availability: 'In Stock',
    images: [px('35342196'), px('28701960'), px('14241847')],
    description:
      'Unstructured six-panel cap in brushed cotton with a curved brim and woven HULK BUSTER label. Adjustable strap, tonal eyelets. The everyday finish.',
    collection: 'Best Sellers',
  },
];

export const collections = [
  {
    id: 'c1',
    label: 'New Arrivals',
    tagline: 'Just landed. Fresh silhouettes, limited runs.',
    image: `https://images.pexels.com/photos/16323485/pexels-photo-16323485.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800`,
    count: 48,
  },
  {
    id: 'c2',
    label: 'Trending',
    tagline: 'What the city is wearing right now.',
    image: `https://images.pexels.com/photos/29817611/pexels-photo-29817611.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800`,
    count: 36,
  },
  {
    id: 'c3',
    label: 'Best Sellers',
    tagline: 'The icons. Restocked and ready.',
    image: `https://images.pexels.com/photos/14437345/pexels-photo-14437345.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800`,
    count: 52,
  },
];

export const heroImages = {
  main: `https://images.pexels.com/photos/35150074/pexels-photo-35150074.jpeg?auto=compress&cs=tinysrgb&h=1600&w=900`,
  mini: [
    `https://images.pexels.com/photos/17086263/pexels-photo-17086263.jpeg?auto=compress&cs=tinysrgb&h=500&w=400`,
    `https://images.pexels.com/photos/15051720/pexels-photo-15051720.jpeg?auto=compress&cs=tinysrgb&h=500&w=400`,
    `https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=500&w=400`,
    `https://images.pexels.com/photos/16323485/pexels-photo-16323485.jpeg?auto=compress&cs=tinysrgb&h=500&w=400`,
  ],
};
