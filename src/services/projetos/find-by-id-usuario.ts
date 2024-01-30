import { ProjetoNaoEncontradoError } from "@/error/projeto-nao-encontrado-error";
import { IProjetos } from "@/interface/i-projetos";
import { Projetos } from "@prisma/client";

interface FindProjetosUsuariosByIdRequest {
    usuariosId: string
    tag?: string[]
}

interface FindProjetosUsuariosByIdResponse {
    projeto: Projetos[]
}


export class FindProjetosUsuariosByIdService {

    constructor(private projetosRepository: IProjetos) {}

    async handle(data: FindProjetosUsuariosByIdRequest): Promise<FindProjetosUsuariosByIdResponse> {
        const projeto = await this.projetosRepository.findByUsuariosId(data.usuariosId, data.tag)

        if(!projeto) throw new ProjetoNaoEncontradoError()

        return {
            projeto
        }
    }
}