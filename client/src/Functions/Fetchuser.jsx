const fetchUser = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/user`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
            return data
        }
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '/Login';
    }
}
export default fetchUser