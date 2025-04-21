"use strict";

import { axiosInstance } from "@/libs/axios-instance";

export const httpRequest = async ({
    method,
    url,
    body,
    params,
    headers
}) => {
    try {
        const response = await axiosInstance.request({
            method,
            url,
            data: body,
            params,
            headers,
        });

        return response;
    } catch (error) {
        console.error("API Error:", error);
        return { error: "An error occurred while making the request." };
    }
};
