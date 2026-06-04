import { createProduct, deleteProduct, getProducts, uploadProductImage } from "@/services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = (params?: { search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"]});
    },
  });
};

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();  // ✅ add queryClient
  return useMutation({
    mutationFn: ({ productId, file }: { productId: string; file: File }) =>
      uploadProductImage(productId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }); // ✅ must have this
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};