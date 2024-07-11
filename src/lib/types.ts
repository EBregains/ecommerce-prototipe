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

export type productInCart = {
  id: any,
  products: {
    title: any,
    slug: any,
    images: any,
    base_price: any,
  },
  color: any,
  plastic: any,
  size: any,
  definition: any,
  quantity: any,
  price?: any,
}