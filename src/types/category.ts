export type ICategory = {
  id: number;
  categoryImages?: ICategoryImage[];
  name: string;
  isActive: boolean;
  createdAt: string;
};

export interface ICategoryImage {
  id: number;
  categoryId: number;
  imageUrl: string;
  fileName: string;
}