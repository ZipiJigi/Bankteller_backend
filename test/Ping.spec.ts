import { assert } from "chai";
import createServer from "../dist/server";
import createRpcClient from "./createRpcClient";

describe("PingService", () => {
    let server: any;
    before("Start server", async () => {
        server = await (createServer as any)();
        await server.port(4001);
        await server.bind();
        await server.start();
    });
    it("Ping-Pong", (done) => {
        const state = "12345678";
        createRpcClient("PingService").then((ping) =>
            ping.Ping({ state }, (err?: any, result?: any) => {
                assert.isNull(err);
                assert.deepEqual(result, {
                    state,
                    version: 1
                });
                done();
            })
        );
    });
    after("Stop server", async () => {
        if (server) await server.stop();
    });
});
