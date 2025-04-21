import { fetchApi } from "@/utils/fetch-api";

/**
 * @function userLogin
 * @param {username: string, password: string} reqLogin 
 * @returns 
 */
export const userLogin = async (reqLogin) => {
    const res = await fetchApi({
        method: "POST",
        url: '/v1/auth/customer-login',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(reqLogin)
    });

    return res.data;
};
