export const _create =
  (body: string) => (headers?: Record<string, string>) => (statusCode?: number) => (statusText?: string): Response =>
    new Response(body, {
      headers,
      status: statusCode,
      statusText,
    })

export const getBody = (response: Response) => () => response.body

export const getBodyUsed = (response: Response) => () => response.bodyUsed

export const getHeaders = (response: Response) => () => response.headers

export const getOK = (response: Response) => () => response.ok

export const getRedirected = (response: Response) => () => response.redirected

export const getStatus = (response: Response) => () => response.status

export const getStatusText = (response: Response) => () => response.statusText

export const getType = (response: Response) => () => response.type

export const getURL = (response: Response) => () => response.url

// Methods
export const getArrayBuffer = (response: Response) => async () => await response.arrayBuffer()

export const getBlob = (response: Response) => async () => await response.blob()

export const getClone = (response: Response) => () => response.clone()

export const getFormData = (response: Response) => async () => await response.formData()

export const getJSON = (response: Response) => async () => await response.json()

export const getText = (response: Response) => async () => await response.text()
