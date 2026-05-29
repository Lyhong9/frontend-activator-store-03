export const getCategories = async (params?: { search?: string; page?: number; limit?: number }) => {
  if (!params) return;
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));

  const res = await fetch(`http://localhost:3000/api/v1/categories?${query.toString()}`);
  const data = await res.json();
  return data;
};

export const updateCategory = async (categoryId: string, request: any) => {
  const res = await fetch(`http://localhost:3000/api/v1/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const data = await res.json();
  return data;
};

export const deleteCategoryImage = async (imageId: string) => {
  const res = await fetch(`http://localhost:3000/api/v1/categories/images/${imageId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

export const deleteCategory = async (categoryId: string) => {
  const res = await fetch(`http://localhost:3000/api/v1/categories/${categoryId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};

export const createCategory = async (request: any) => {
  const res = await fetch('http://localhost:3000/api/v1/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const data = await res.json();
  return data; // ← returns { message: '...', data: { id, name, ... } }
};

export const uploadCategoryImage = async (categoryId: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`http://localhost:3000/api/v1/categories/${categoryId}/upload`, {
    method: 'POST',
    body: formData,
    // ⚠️ Do NOT set Content-Type header — browser sets it automatically with boundary
  });

  const data = await res.json();
  return data;
};
