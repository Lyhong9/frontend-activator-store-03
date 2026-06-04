import { getProducts } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (params?: { search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => getProducts(params),
  });
};
