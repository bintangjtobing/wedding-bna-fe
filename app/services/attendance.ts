import apiClient from "./apiClient";

export const postAttendance = async (data: { username: string; name: string; message: string; attendance: string} ) => {
    try {
        const response = await apiClient.post(`/api/invitation/messages`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};