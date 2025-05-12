export const saveUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("Test local user:", JSON.stringify(userData));
};

export const clearUser = () => {
    localStorage.removeItem('user');
};

export const getUser = () => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
};

export const getToken = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    return data ? data.token : null;
}
  

