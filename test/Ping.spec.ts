import * as grpc from "@grpc/grpc-js";
import * as grpcProtoLoader from "@grpc/proto-loader";
import { assert } from "chai";
import path from "path";
import createServer from "../dist/server";

const createClient = async (name: string) => {
    const protoFilePath = path.join(__dirname, "../protobuf/services.proto");
    const protoDef = await grpcProtoLoader.load(protoFilePath);
    const protoPkgDef = grpc.loadPackageDefinition(protoDef);
    const Bankteller = protoPkgDef.Bankteller as any;
    return new Bankteller[name](
        "127.0.0.1:4001",
        grpc.credentials.createInsecure()
    );
};
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
        createClient("PingService").then((ping) =>
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
