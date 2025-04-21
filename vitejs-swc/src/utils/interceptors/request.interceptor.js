import { handleApiError } from "../handle-api-error";
import { axiosInstance } from "@/libs/axios-instance";

export const addRequestInterceptor = () => {
    return axiosInstance.interceptors.request.use(
        async (config) => {
            try {
                // const token = localStorage.getItem('accessToken');
                // if (token) {
                //     config.headers['Authorization'] = `Bearer ${token}`;
                // }

                config.headers['Content-Type'] = 'application/json';
                config.headers['Accept'] = 'application/json';

                config.headers['X-Request-Timestamp'] = new Date().toISOString();

                // if (process.env.NODE_ENV !== 'production') {
                //     console.log('Request Config:', {
                //         method: config.method,
                //         url: config.url,
                //         headers: config.headers,
                //         data: config.data
                //     });
                // }

                return config;
            } catch (error) {
                console.error('Request Interceptor Setup Error:', error);
                return Promise.reject(error);
            }
        },
        (error) => {
            const processedError = handleApiError(error);
            console.error('Request Interceptor Error:', processedError);
            return Promise.reject(processedError);
        }
    );
};
