import axiosInstance from "./api-communicator";

const getBlogs = async (id = "") => {
    try {
        return await axiosInstance.get(`/blog${id ? `/${id}` : ''}`);
    } catch (error) {
        return { error };
    }
};

const createBlog = async (payload = {}) => {
    try {
        return await axiosInstance.post('/blog', payload);
    } catch (error) {
        return { error };
    }
};

const deleteBlog = async (id = "") => {
    try {
        return await axiosInstance.delete(`/blog/${id}`);
    } catch (error) {
        return { error };
    }
};

const updateBlog = async (payload: any = {}) => {
    try {
        return await axiosInstance.put(`/blog/${payload?.id}`, payload);
    } catch (error) {
        return { error };
    }
};

const AppService = {
    getBlogs,
    createBlog,
    deleteBlog,
    updateBlog
};


export default AppService;