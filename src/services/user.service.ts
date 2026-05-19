export const fetchUser = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/users`);
        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};