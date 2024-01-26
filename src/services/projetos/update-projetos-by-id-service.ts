import { IProjetos } from "@/interface/i-projetos";
import { Projetos } from "@prisma/client";

interface UpdateProjetosByIdRequest {
    titulo?: string
    link?: string
    descricao?: string
    usuariosId?: string
    tags?: string[]
}

interface UpdateProjetosByIdResponse {
    projetos: Projetos
}

export class UpdateProjetosByIdService {
    
    constructor(private projetoRepository: IProjetos) {}

    async handle(data: UpdateProjetosByIdRequest, id: string): Promise<UpdateProjetosByIdResponse> {
        const projetos = await this.projetoRepository.updateById(data, id)

        return {
            projetos
        }
    }
}