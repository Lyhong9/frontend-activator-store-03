export const fetchCategory = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/categories`);
        if (!response.ok) {
            throw new Error(`Error fetching category: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};