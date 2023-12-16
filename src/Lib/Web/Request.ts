import { Nullable } from '#/Lib/Nullable.ts'

export const create = (uri: string) => (options: RequestInit) => new Request(uri, options)

// Properties
export const getBodyImpl = (request: Request): Nullable<ReadableStream<Uint8Array>> => request.body

export const getBodyUsed = (request: Request): boolean => request.bodyUsed

export const getCache = (request: Request): RequestCache => request.cache

export const getCredentials = (request: Request): RequestCredentials => request.credentials

export const getDestination = (request: Request): RequestDestination => request.destination

export const getHeaders = (request: Request): Headers => request.headers

export const getIntegrity = (request: Request): string => request.integrity

export const getIsHistoryNavigation = (request: Request): boolean => request.isHistoryNavigation

export const getIsReloadNavigation = (request: Request): boolean => request.isReloadNavigation

export const getKeepalive = (request: Request): boolean => request.keepalive

export const getMethod = (request: Request): string => request.method

export const getMode = (request: Request): RequestMode => request.mode

export const getRedirect = (request: Request): RequestRedirect => request.redirect

export const getReferrer = (request: Request): string => request.referrer

export const getReferrerPolicy = (request: Request): ReferrerPolicy => request.referrerPolicy

export const getSignal = (request: Request): AbortSignal => request.signal

export const getURL = (request: Request): string => request.url

// Functions
export const getBlob = async (request: Request): Promise<Blob> => await request.blob()

export const getClone = (request: Request): Request => request.clone()

export const getFormData = async (request: Request): Promise<FormData> => await request.formData()

export const getJSON = async (request: Request): Promise<Record<string, unknown> | Array<unknown>> =>
  await request.json()

export const getText = async (request: Request): Promise<string> => await request.text()
