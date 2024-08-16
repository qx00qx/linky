export const getUserfromLS = () => {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : [];
    
    return {
        user
    }
}