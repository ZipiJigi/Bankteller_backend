import {
    sendUnaryData,
    ServerUnaryCall
} from "@grpc/grpc-js/build/src/server-call";

export function Ping(
    call: ServerUnaryCall<PingRequest, PingResponse>,
    handle: sendUnaryData<PingResponse>
): void {
    if (call.request) {
        handle(null, { state: call.request.state, version: 1 });
    } else {
        handle(new Error("Null request"), null);
    }
}
