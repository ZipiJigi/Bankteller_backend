import createServer from "./server";
(async () => {
    const server = await createServer();
    await server.port(4001);
    await server.bind();
    await server.start();
})();
