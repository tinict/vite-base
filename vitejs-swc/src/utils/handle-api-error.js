export const handleApiError = (error) => {
    if (error.response) {
        return error.response.data?.message ||
            error.response.statusText ||
            "Unknown API error";
    } else if (error.request) {
        return "No response received from server";
    } else {
        return error.message || "Network error";
    }
};
