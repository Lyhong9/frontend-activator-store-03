export const fetchProduct = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/products`);
        if (!response.ok) {
            throw new Error(`Error fetching product: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};