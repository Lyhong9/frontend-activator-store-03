export const getProducts = async (params?: { search?: string; page?: number; limit?: number }) => {
  if (!params) return;
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));

  const res = await fetch(`http://localhost:3000/api/v1/products?${query.toString()}`);
  const data = await res.json();
  return data;
};


export const createProduct = async (request: any) => {
  const res = await fetch('http://localhost:3000/api/v1/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const data = await res.json();
  return data; // ← returns { message: '...', data: { id, name, ... } }
};

export const uploadProductImage = async (productId: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`http://localhost:3000/api/v1/products/${productId}/upload`, {
    method: 'POST',
    body: formData,
    // ⚠️ Do NOT set Content-Type header — browser sets it automatically with boundary
  });

  const data = await res.json();
  return data;
};

export const deleteProduct = async (productId: string) => {
  const res = await fetch(`http://localhost:3000/api/v1/products/${productId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};