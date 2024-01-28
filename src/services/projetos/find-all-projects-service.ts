import { IProjetos } from "@/interface/i-projetos";
import { Projetos } from "@prisma/client";

interface FindAllProjetosRequest {
    tag?: string[]
}

interface FindAllProjetosResponse {
    projetos: Projetos[]
}

export class FindAllProjetosService {

    constructor(private projetosRepository: IProjetos) {}

    async handle(data: FindAllProjetosRequest): Promise<FindAllProjetosResponse> {
        const projetos = await this.projetosRepository.findAll(data.tag)

        return {
            projetos
        }
    }
}