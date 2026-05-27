export const getUsers = async () => {
  const res = await fetch(`http://localhost:3000/api/v1/users`);
  const data = await res.json();
  return data;
};