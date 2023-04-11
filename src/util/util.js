
export const getUser = () => {
    return localStorage.getItem('user');
}

export const setUser = (user) => {
    if(!user) {
        localStorage.removeItem('user');
        return;
    }
    localStorage.setItem('user', JSON.stringify(user));
}



