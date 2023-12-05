export const _startServer = (handleListening) => (handleError) => (handleRequest) => (hostname) => (port) => () => {
    Deno.serve({
        hostname,
        port,
        onError: async (error) => handleError(error)(),
        onListen: async () => handleListening()(),
        reusePort: true,
    }, (request) => handleRequest(request)());
};
