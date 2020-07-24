import * as grpc from "@grpc/grpc-js";
import * as grpcProtoLoader from "@grpc/proto-loader";
import path from "path";

const start = async () => {
    const protoDef = await grpcProtoLoader.load(
        path.join(__dirname, "../protobuf/service.proto")
    );
    const protoPkgDef = grpc.loadPackageDefinition(protoDef);
    const server = new grpc.Server();
    server.addService(
        ((protoPkgDef.Bankteller as any).BanktellerService
            .service as unknown) as grpc.ServiceDefinition,
        {}
    );

    server.bindAsync(
        "0.0.0.0:4001",
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) throw err;
            console.log(`Bound on ${port}`);
            server.start();
            console.log("Started");
        }
    );
};
start();
