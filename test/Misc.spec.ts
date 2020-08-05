import { assert } from "chai";
import createServer from "../dist/server";
import createRpcClient from "./createRpcClient";

describe("MiscService", () => {
    let server: any;
    before("Start server", async () => {
        server = await (createServer as any)();
        await server.port(4001);
        await server.bind();
        await server.start();
    });
    it("Get Terms Of Service for Registeration", (done) => {
        createRpcClient("MiscService").then((misc) =>
            misc.TermsOfService(
                {
                    categories: [0]
                },
                (err, result) => {
                    assert.isNull(err);
                    assert.isArray(result.tos);
                    assert.isNotEmpty(result.tos);
                    done();
                }
            )
        );
    });
    it("Get Terms Of Service by id", (done) => {
        createRpcClient("MiscService").then((misc) => {
            misc.TermsOfService(
                {
                    tosIds: [12345]
                },
                (err, result) => {
                    assert.isNull(err);
                    assert.isArray(result.tos);
                    assert.equal(result.tos.length, 1);
                    assert.deepEqual(result.tos[0], {
                        id: 12345,
                        title: "test title",
                        content: "test content",
                        required: false
                    });
                }
            );
        });
    });
    after("Stop server", async () => {
        if (server) await server.stop();
    });
});
