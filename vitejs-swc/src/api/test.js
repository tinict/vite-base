import { fetchApi } from "@/utils/fetch-api";

export const testApi = async () => {
    const res = await fetchApi({
        method: "GET",
        url: import.meta.env.VITE_PUBLIC_API_TEST_URL
    });

    return res;
};
