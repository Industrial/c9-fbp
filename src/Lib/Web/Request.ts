export const create = (uri: string) => (options: RequestInit) => () => new Request(uri, options)

// Properties
export const getBody = (request: Request) => () => request.body

export const getBodyUsed = (request: Request) => () => request.bodyUsed

export const getCache = (request: Request) => () => request.cache

export const getCredentials = (request: Request) => () => request.credentials

export const getDestination = (request: Request) => () => request.destination

export const getHeaders = (request: Request) => () => request.headers

export const getIntegrity = (request: Request) => () => request.integrity

export const getIsHistoryNavigation = (request: Request) => () => request.isHistoryNavigation

export const getIsReloadNavigation = (request: Request) => () => request.isReloadNavigation

export const getKeepalive = (request: Request) => () => request.keepalive

export const getMethod = (request: Request) => () => request.method

export const getMode = (request: Request) => () => request.mode

export const getRedirect = (request: Request) => () => request.redirect

export const getReferrer = (request: Request) => () => request.referrer

export const getReferrerPolicy = (request: Request) => () => request.referrerPolicy

export const getSignal = (request: Request) => () => request.signal

export const getURL = (request: Request) => () => request.url

// Functions
export const getBlob = (request: Request) => async () => await request.blob()

export const getClone = (request: Request) => () => request.clone()

export const getFormData = (request: Request) => async () => await request.formData()

export const getJSON = (request: Request) => async () => await request.json()

export const getText = (request: Request) => async () => await request.text()
