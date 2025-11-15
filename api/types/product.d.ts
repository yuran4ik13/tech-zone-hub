export interface IProductImage {
  id: string;
  path: string;
}

export interface IProductParam {
  id: string;
  key: string;
  value: string;
}

export interface IProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: IProductImage[];
  params: IProductParam[];
}

export interface IProductQuickView {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: IProductImage[];
}
