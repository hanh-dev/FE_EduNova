export const saveUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("TEst save: ", getUser)
};

export const clearUser = () => {
    localStorage.removeItem('user');
};

export const getUser = () => {
    const data = localStorage.getItem('user');
    if (!data || data === "undefined") return null;

    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("Lỗi khi parse user JSON:", e);
        return null;
    }
};


export const getToken = () => {
    const raw = localStorage.getItem('user');

    if (!raw || raw === "undefined") return null;

    try {
        const data = JSON.parse(raw);
        return data?.token || null;
    } catch (e) {
        console.error("Lỗi khi parse user trong getToken:", e);
        return null;
    }
};

  