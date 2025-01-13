import apiClient from "./apiClient";

export const postAttendance = async (data: { attendace_name: string; attendance_message: string; attend: boolean}, parameter: string ) => {
    try {
        const response = await apiClient.post(`/api/invitation/${parameter}/attendance`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};