const BASE_URL = "https://assignment-todolist-api.vercel.app/api/";
// 서버 api 정의
export const ENDPOINT = {
    GETITEM: (tenantId: string, page?: number, pageSize?: number) => {
        return page && pageSize
            ? `${BASE_URL}${tenantId}/items?page=${page}&pageSize=${pageSize}`
            : `${BASE_URL}${tenantId}/items`;
    },
    GETDETAILITEM: (tenantId: string, itemId: number) => {
        return `${BASE_URL}${tenantId}/items/${itemId}`;
    },
    POSTITEM: (tenantId: string) => {
        return `${BASE_URL}${tenantId}/items`;
    },
    PATCHITEM: (tenantId: string, itemId: number) => {
        return `${BASE_URL}${tenantId}/items/${itemId}`;
    },
    DELETEITEM: (tenantId: string, itemId: number) => {
        return `${BASE_URL}${tenantId}/items/${itemId}`;
    },
    POSTIMAGEUPLOAD: (tenantId: string) => {
        return `${BASE_URL}${tenantId}/images/upload`;
    },
};
