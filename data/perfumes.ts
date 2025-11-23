export interface Perfume {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  notes: string[];
  intensity: "soft" | "moderate" | "strong";
  longevity: number; // 1-5
  sillage: number; // 1-5
  description: string;
  badge?: string;
}

export const PERFUMES: Perfume[] = [
  {
    id: "1",
    slug: "midnight-saffron",
    name: "Midnight Saffron",
    brand: "L'Obscur",
    price: 185,
    image: "https://images.unsplash.com/photo-1737920459846-2d0318700658?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bHV4dXJ5JTIwcGVyZnVtZSUyMGRhcmt8ZW58MHx8MHx8fDA%3D",
    notes: ["Saffron", "Black Rose", "Oud", "Amber"],
    intensity: "strong",
    longevity: 5,
    sillage: 4,
    description: "A mysterious blend of rare saffron and deep oud, evoking the secrets of a moonlit bazaar.",
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "velvet-smoke",
    name: "Velvet Smoke",
    brand: "L'Obscur",
    price: 160,
    image: "https://images.unsplash.com/photo-1759793499938-904b23d7ddae?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww",
    notes: ["Tobacco", "Vanilla", "Cedarwood", "Leather"],
    intensity: "moderate",
    longevity: 4,
    sillage: 3,
    description: "Warm tobacco leaves wrapped in creamy vanilla and worn leather. A scent for the contemplative soul.",
  },
  {
    id: "3",
    slug: "desert-rose",
    name: "Desert Rose",
    brand: "L'Obscur",
    price: 195,
    image: "https://images.unsplash.com/photo-1760860992203-85ca32536788?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww",
    notes: ["Damask Rose", "Incense", "Patchouli", "Myrrh"],
    intensity: "strong",
    longevity: 5,
    sillage: 5,
    description: "An intense, spicy rose blooming amidst the swirling sands of an ancient desert.",
    badge: "New Arrival",
  },
  {
    id: "4",
    slug: "golden-amber",
    name: "Golden Amber",
    brand: "L'Obscur",
    price: 150,
    image: "https://images.unsplash.com/photo-1630512873379-e8c6cce16158?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww",
    notes: ["Amber", "Benzoin", "Labdanum", "Tonka Bean"],
    intensity: "moderate",
    longevity: 4,
    sillage: 4,
    description: "Liquid gold. A resinous, sweet, and enveloping embrace that lingers like a sunset.",
  },
  {
    id: "5",
    slug: "noir-citrus",
    name: "Noir Citrus",
    brand: "L'Obscur",
    price: 140,
    image: "https://images.unsplash.com/photo-1659167530799-982cfce69360?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww",
    notes: ["Bergamot", "Black Pepper", "Vetiver", "Neroli"],
    intensity: "soft",
    longevity: 3,
    sillage: 2,
    description: "A shadow of brightness. Crisp citrus notes cut through the darkness of night.",
  },
  {
    id: "6",
    slug: "spiced-sandalwood",
    name: "Spiced Sandalwood",
    brand: "L'Obscur",
    price: 175,
    image: "https://images.unsplash.com/photo-1761329842950-f3551938e4da?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww",
    notes: ["Sandalwood", "Cardamom", "Cinnamon", "Musk"],
    intensity: "moderate",
    longevity: 4,
    sillage: 3,
    description: "Creamy sandalwood spiced with exotic cardamom and cinnamon. Comforting yet intriguing.",
    badge: "Limited Edition",
  },
  {
    id: "7",
    slug: "royal-oud",
    name: "Royal Oud",
    brand: "L'Obscur",
    price: 220,
    image: "https://images.unsplash.com/photo-1630512873749-85ccf5bb1678?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww",
    notes: ["Agarwood", "Rosewood", "Sandalwood", "Amber"],
    intensity: "strong",
    longevity: 5,
    sillage: 5,
    description: "The scent of kings. A pure, unadulterated oud experience for the connoisseur.",
  },
  {
    id: "8",
    slug: "jasmine-night",
    name: "Jasmine Night",
    brand: "L'Obscur",
    price: 165,
    image: "https://images.unsplash.com/photo-1761845047498-56827f416735?fm=jpg&q=60&w=800&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGx1eHVyeSUyMHBlcmZ1bWUlMjBkYXJrfGVufDB8fDB8fHww",
    notes: ["Jasmine Sambac", "Tuberose", "Ylang Ylang", "Vanilla"],
    intensity: "strong",
    longevity: 4,
    sillage: 4,
    description: "Intoxicating white florals that bloom only under the cover of darkness.",
  },
];
