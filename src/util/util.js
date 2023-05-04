
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

export const validateEmailAddress = (email) => {
    if (!email) return false;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

