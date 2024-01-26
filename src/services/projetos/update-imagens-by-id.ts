import { IProjetos } from "@/interface/i-projetos";
import { Projetos } from "@prisma/client";

interface UpdateImageByIdRequest {
    imagens?: string
}

interface UpdateImageByIdResponse {
    projetos: Projetos
}

export class UpdateImageByIdService {

    constructor(private projetoRepository: IProjetos) {}

    async handle(data: UpdateImageByIdRequest, id: string): Promise<UpdateImageByIdResponse> {
        const projetos = await this.projetoRepository.updateImagemById(id, data.imagens)

        return {
            projetos
        }
    }
}