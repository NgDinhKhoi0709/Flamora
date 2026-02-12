export type ProductTag = 'Bán chạy' | 'Mới' | 'Quà tặng' | 'Ưu đãi';

export interface Scent {
  id: string;
  name: string;
  price: number;
  notes: {
    top: string;
    mid: string;
    base: string;
  };
  descriptionShort: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // category slug
  shortDescription: string;
  description: string;
  usageInstructions: string;
  shippingReturns: string;
  images: string[];
  tags: ProductTag[];
  createdAt: string;
  popularityScore: number;
  scents: Scent[];
  colors: ProductColor[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface CartItem {
  id: string; // combination of productId, scentId, colorName
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  scent: Scent;
  color: ProductColor;
  quantity: number;
  unitPrice: number;
}

export interface Order {
    id: string;
    customer: {
        name: string;
        phone: string;
        address: string;
    };
    items: CartItem[];
    total: number;
    createdAt: number;
    status: 'pending' | 'completed' | 'cancelled';
}

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popularity';

