import * as grpc from "@grpc/grpc-js";
import * as grpcProtoLoader from "@grpc/proto-loader";
import path from "path";

export default async function (name: string): Promise<any> {
    const protoFilePath = path.join(__dirname, "../protobuf/services.proto");
    const protoDef = await grpcProtoLoader.load(protoFilePath);
    const protoPkgDef = grpc.loadPackageDefinition(protoDef);
    const Bankteller = protoPkgDef.Bankteller as any;
    return new Bankteller[name](
        "127.0.0.1:4001",
        grpc.credentials.createInsecure()
    );
}
