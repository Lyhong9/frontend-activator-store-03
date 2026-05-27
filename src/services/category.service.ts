export const getCategories = async () => {
  const res = await fetch(`http://localhost:3000/api/v1/categories`);
  const data = await res.json();
  return data;
};