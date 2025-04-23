export const ListingCategory = {
  ELECTRONICS: {
    en: 'Electronics',
    fr: 'Électronique',
  },
  FURNITURE: {
    en: 'Furniture',
    fr: 'Mobilier',
  },
  CLOTHING: {
    en: 'Clothing',
    fr: 'Vêtements',
  },
  BOOKS: {
    en: 'Books',
    fr: 'Livres',
  },
  TOYS: {
    en: 'Toys',
    fr: 'Jouets',
  },
  SPORTS: {
    en: 'Sports',
    fr: 'Sport',
  },
  OTHER: {
    en: 'Other',
    fr: 'Autre',
  },
} as const;

export type ListingCategoryKey = keyof typeof ListingCategory;
