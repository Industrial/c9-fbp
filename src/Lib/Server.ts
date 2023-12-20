export const _startServer =
  (handleListening: () => () => Promise<void>) =>
  (handleError: (error: unknown) => () => Promise<Response>) =>
  (handleRequest: (request: Request) => () => Promise<Response>) =>
  (hostname: string) =>
  (port: number) =>
  () => {
    Deno.serve({
      hostname,
      port,
      onError: async (error: unknown) => handleError(error as Error)(),
      onListen: async () => handleListening()(),
      reusePort: true,
    }, (request) => handleRequest(request)())
  }
