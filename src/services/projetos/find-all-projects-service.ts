import { IProjetos } from "@/interface/i-projetos";
import { Projetos } from "@prisma/client";

interface FindAllProjetosResponse {
    projetos: Projetos[]
}

export class FindAllProjetosService {

    constructor(private projetosRepository: IProjetos) {}

    async handle(): Promise<FindAllProjetosResponse> {
        const projetos = await this.projetosRepository.findAll()

        return {
            projetos
        }
    }
}