"use strict";

import { httpRequest } from "./httpRequest";
import {
    handleApiResponse
} from "./handle-api-response";

export const fetchApi = async ({
    method,
    url,
    body,
    params,
    headers,
    withInterceptor = true,
}) => {
    const executeRequest = async () => {
        try {
            const requestConfig = {
                method,
                url,
                body,
                params,
                headers,
            };
            const response = await httpRequest(requestConfig);

            // if (withInterceptor) {
            //     addRequestInterceptor();
            // }

            if (!response) {
                throw new Error("No response received");
            }

            if (!response.status) {
                throw new Error("No status code received");
            }

            const processedResponse = handleApiResponse(response);
            console.log('API Response:', processedResponse);

            return response;
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    return executeRequest();
};
