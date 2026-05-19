export type IProduct = {
  id: number;
  name: string;
  price: number;
  qty: number;
  isActive: boolean;
  category: {
    id: number;
    name: string;
  };
  productImages?: ICategoryImage[];
};

export interface ICategoryImage {
  id: number;
  productId: number;
  imageUrl: string;
  fileName: string;
}