export const create = (uri) => (options) => () => new Request(uri, options);
// Properties
export const getBody = (request) => () => request.body;
export const getBodyUsed = (request) => () => request.bodyUsed;
export const getCache = (request) => () => request.cache;
export const getCredentials = (request) => () => request.credentials;
export const getDestination = (request) => () => request.destination;
export const getHeaders = (request) => () => request.headers;
export const getIntegrity = (request) => () => request.integrity;
export const getIsHistoryNavigation = (request) => () => request.isHistoryNavigation;
export const getIsReloadNavigation = (request) => () => request.isReloadNavigation;
export const getKeepalive = (request) => () => request.keepalive;
export const getMethod = (request) => () => request.method;
export const getMode = (request) => () => request.mode;
export const getRedirect = (request) => () => request.redirect;
export const getReferrer = (request) => () => request.referrer;
export const getReferrerPolicy = (request) => () => request.referrerPolicy;
export const getSignal = (request) => () => request.signal;
export const getURL = (request) => () => request.url;
// Functions
export const getBlob = (request) => async () => await request.blob();
export const getClone = (request) => () => request.clone();
export const getFormData = (request) => async () => await request.formData();
export const getJSON = (request) => async () => await request.json();
export const getText = (request) => async () => await request.text();
