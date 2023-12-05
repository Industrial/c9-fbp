/// <reference types="./deno.d.ts" />
export declare const _create: (body: string) => (headers?: Record<string, string>) => (statusCode?: number) => (statusText?: string) => Response;
export declare const getBody: (response: Response) => () => ReadableStream<Uint8Array> | null;
export declare const getBodyUsed: (response: Response) => () => boolean;
export declare const getHeaders: (response: Response) => () => Headers;
export declare const getOK: (response: Response) => () => boolean;
export declare const getRedirected: (response: Response) => () => boolean;
export declare const getStatus: (response: Response) => () => number;
export declare const getStatusText: (response: Response) => () => string;
export declare const getType: (response: Response) => () => ResponseType;
export declare const getURL: (response: Response) => () => string;
export declare const getArrayBuffer: (response: Response) => () => Promise<ArrayBuffer>;
export declare const getBlob: (response: Response) => () => Promise<Blob>;
export declare const getClone: (response: Response) => () => Response;
export declare const getFormData: (response: Response) => () => Promise<FormData>;
export declare const getJSON: (response: Response) => () => Promise<any>;
export declare const getText: (response: Response) => () => Promise<string>;
