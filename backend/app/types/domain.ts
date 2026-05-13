// src/types/index.ts

export interface CreateProductInput {
  name: string;
  price: string | number;
  shopId: string;
  description?: string;
  imageUrl?: string;
}

export interface ShopRouteParams {
  city: string;
  slug: string;
}
// Inside src/types/index.ts
export interface ProductRouteParams {
  id: string;
}
// Add to src/types/index.ts

export interface OnboardVendorInput {
  phone: string;
  name: string;
  shopName: string;
  category: string;
  address: string;
  whatsapp: string;
  city: string; // will default to "gaya"
}