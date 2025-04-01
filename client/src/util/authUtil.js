export const getAccessToken = () => {
    const user = localStorage.getItem('auth');

    if(!user) {
        return '';
    }
    const userData = JSON.parse(user);
    return userData;
}