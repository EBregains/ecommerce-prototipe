export interface Image {
  url: string;
  alt: string;
}

export type Product = {
  id?: number,
  title: string,
  slug: string,
  description?: string,
  base_price: number,
  discountPercentage?: number,
  rating?: number,
  stock?: number,
  brand?: string,
  category?: string,
  thumbnail?: string,
  images: Array<string>,
}