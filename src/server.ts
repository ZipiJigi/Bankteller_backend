import * as grpc from "@grpc/grpc-js";
import * as grpcProtoLoader from "@grpc/proto-loader";
import path from "path";
import * as PingService from "./services/Ping";

const createServiceLoader = async (
    server: grpc.Server,
    protoFilePath: string
) => {
    const protoDef = await grpcProtoLoader.load(protoFilePath);
    const protoPkgDef = grpc.loadPackageDefinition(protoDef);
    const Bankteller = protoPkgDef.Bankteller as any;
    return (
        name: string,
        implementation: grpc.UntypedServiceImplementation
    ) => {
        server.addService(
            Bankteller[name].service as grpc.ServiceDefinition,
            implementation
        );
    };
};
export default async function (): Promise<BanktellerServer> {
    let port = 4001;
    const server = new grpc.Server();
    const loadService = await createServiceLoader(
        server,
        path.join(__dirname, "../protobuf/services.proto")
    );
    loadService("PingService", PingService);
    return {
        bind: () =>
            new Promise((resolve, reject) => {
                server.bindAsync(
                    "0.0.0.0:" + port,
                    grpc.ServerCredentials.createInsecure(),
                    (err) => {
                        if (err) return reject(err);
                        else resolve();
                    }
                );
            }),

        start: async () => server.start(),
        port: (newPort: number) => (port = newPort),
        stop: () =>
            new Promise((resolve, reject) => {
                server.tryShutdown((err) => {
                    if (err) reject(err);
                    else resolve(err);
                });
            })
    };
}
