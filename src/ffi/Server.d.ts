/// <reference types="./deno.d.ts" />
export declare const _startServer: (handleListening: () => () => Promise<void>) => (handleError: (error: unknown) => () => Promise<Response>) => (handleRequest: (request: Request) => () => Promise<Response>) => (hostname: string) => (port: number) => () => void;
