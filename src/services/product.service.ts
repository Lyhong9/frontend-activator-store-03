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