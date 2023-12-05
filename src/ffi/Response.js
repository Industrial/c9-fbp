export const _create = (body) => (headers) => (statusCode) => (statusText) => new Response(body, {
    headers,
    status: statusCode,
    statusText,
});
export const getBody = (response) => () => response.body;
export const getBodyUsed = (response) => () => response.bodyUsed;
export const getHeaders = (response) => () => response.headers;
export const getOK = (response) => () => response.ok;
export const getRedirected = (response) => () => response.redirected;
export const getStatus = (response) => () => response.status;
export const getStatusText = (response) => () => response.statusText;
export const getType = (response) => () => response.type;
export const getURL = (response) => () => response.url;
// Methods
export const getArrayBuffer = (response) => async () => await response.arrayBuffer();
export const getBlob = (response) => async () => await response.blob();
export const getClone = (response) => () => response.clone();
export const getFormData = (response) => async () => await response.formData();
export const getJSON = (response) => async () => await response.json();
export const getText = (response) => async () => await response.text();
