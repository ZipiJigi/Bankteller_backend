import {
    sendUnaryData,
    ServerUnaryCall
} from "@grpc/grpc-js/build/src/server-call";
import { TermsOfService as TosModel } from "~/model/termsOfService";

export async function TermsOfSerivce(
    call: ServerUnaryCall<TermsOfServiceRequest, TermsOfServiceResponse>,
    handle: sendUnaryData<TermsOfServiceResponse>
): Promise<void> {
    if (call.request) {
        let result: TosModel[] = [];
        for (const i of call.request.categories)
            result = result.concat(
                await TosModel.findAll({ where: { category: i } })
            );
        for (const i of call.request.tosIds)
            if (!result.some((j) => j.id == i)) {
                const tos = await TosModel.findByPk(i);
                if (tos) result.push(tos);
            }
        handle(null, {
            tos: result.map((i) => {
                return {
                    id: i.id,
                    title: i.title,
                    content: i.content,
                    required: i.required
                };
            })
        });
    } else {
        handle(new Error("Null request"), null);
    }
}
