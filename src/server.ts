import * as grpc from "@grpc/grpc-js";
import * as grpcProtoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import path from "path";
import { initialize as initializeDatabase } from "./initDatabase";
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
    // Load dotenv
    dotenv.config();

    // Initialize database
    initializeDatabase();

    // Load and validate port
    if (!process.env.BANKTELLER_GRPC_PORT)
        throw new Error("BANKTELLER_GRPC_PORT not defined");
    let port = Number(process.env.BANKTELLER_GRPC_PORT);
    if (isNaN(port)) throw new Error("Port must be a number");
    else if (!isFinite(port)) throw new Error("Port must be finite");

    // Create grpc server and load service
    const server = new grpc.Server();
    const loadService = await createServiceLoader(
        server,
        path.join(__dirname, "../protobuf/services.proto")
    );
    loadService("PingService", PingService);

    // Return server object
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
