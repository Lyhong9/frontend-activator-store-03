import { createCategory, deleteCategory, deleteCategoryImage, getCategories, updateCategory, uploadCategoryImage } from "@/services/category.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategories = (params?: { search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, request }: { categoryId: string; request: any }) =>
      updateCategory(categoryId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategoryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageId: string) => deleteCategoryImage(imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] }); // ✅ must have this
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUploadCategoryImage = () => {
  const queryClient = useQueryClient();  // ✅ add queryClient
  return useMutation({
    mutationFn: ({ categoryId, file }: { categoryId: string; file: File }) =>
      uploadCategoryImage(categoryId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] }); // ✅ must have this
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"]});
    },
  });
};