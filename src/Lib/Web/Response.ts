export const _create =
  (body: string) => (headers?: Record<string, string>) => (statusCode?: number) => (statusText?: string): Response =>
    new Response(body, {
      headers,
      status: statusCode,
      statusText,
    })

// Properties
export const getBodyImpl = (response: Response): ReadableStream<Uint8Array> | null => response.body
export const getBodyUsed = (response: Response): boolean => response.bodyUsed
export const getHeaders = (response: Response): Headers => response.headers
export const getOK = (response: Response): boolean => response.ok
export const getRedirected = (response: Response): boolean => response.redirected
export const getStatus = (response: Response): number => response.status
export const getStatusText = (response: Response): string => response.statusText
export const getType = (response: Response): ResponseType => response.type
export const getURL = (response: Response): string => response.url

// Methods
export const getArrayBuffer = async (response: Response): Promise<ArrayBuffer> => await response.arrayBuffer()
export const getBlob = async (response: Response): Promise<Blob> => await response.blob()
export const getClone = (response: Response): Response => response.clone()
export const getFormData = async (response: Response): Promise<FormData> => await response.formData()
export const getJSON = async (response: Response): Promise<Record<string, unknown> | Array<unknown>> =>
  await response.json()
export const getText = async (response: Response): Promise<string> => await response.text()
