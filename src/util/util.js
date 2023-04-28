
export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const setUser = (user) => {
    if(!user) {
        localStorage.removeItem('user');
        return;
    }
    localStorage.setItem('user', JSON.stringify(user));
}

export const getAuthToken = () => {
    const user = getUser();
    if (!user?.accessToken) return;
    return user.accessToken;
}

