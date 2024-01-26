import { IProjetos } from "@/interface/i-projetos";
import { Projetos } from "@prisma/client";

interface CreateProjetosRequest {
    titulo: string
    tags: string[]
    link: string
    descricao: string
    imagem: string
    usuariosId: string
}

interface CreateProjetosResponse {
    projetos: Projetos
}

export class CreateProjetosService {

    constructor(private projetosRepository: IProjetos) {}

    async handle(data: CreateProjetosRequest): Promise<CreateProjetosResponse> {
        const projetos = await this.projetosRepository.create(data)

        return {
            projetos
        }
    }
}