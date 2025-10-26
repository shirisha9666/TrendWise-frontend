import axios from "axios"

 const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL 
})

// role
export const registerRole = (data) => api.put(`/user/role`, data);
// users
export const googleAuth = (code) => api.get(`/user/google?code=${encodeURIComponent(code)}`);
export const getAllArticles = () => api.get(`/article/all`);
export const deleteArticle = (id) => api.delete(`/article/delete/${id}`);
export const createArticle = () => api.post(`/article/create`);
export const updateArticle = (id) => api.put(`/article/update/${id}`);
export const ViewArticles = (id) => api.get(`/article/get/${id}`);
export const addComment = (id, data) =>api.post(`/comment/create/${id}`, data);
export const likeArticle = (id, userId) =>api.post(`/comment/like/${id}`, {userId});


// user

export const getusercommenthistory= (id) => api.get(`/comment/all/${id}`);
export const delteComment = (id) => api.delete(`/comment/delete/${id}`);
export const updateComment = (id,data) => api.put(`/comment/update/${id}`,data);






const getLoggedInUserId = () => {
    const userInfo = localStorage.getItem("user-info")
    if (!userInfo) return null;
    try {
        const { userId } = JSON.parse(userInfo);
        return userId;
    } catch (error) {
        console.error("Invalid user-info in localStorage", error);
        return null;
    }
}
export const getCurrentUser = () => {
    const id = getLoggedInUserId();
    if (!id) throw new Error("User not logged in");
    return api.get(`/user/login/${id}`);
};



// comment
