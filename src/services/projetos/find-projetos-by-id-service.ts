import { ProjetoNaoEncontradoError } from "@/error/projeto-nao-encontrado-error";
import { IProjetos } from "@/interface/i-projetos";
import { Projetos } from "@prisma/client";

interface FindProjetosByIdRequest {
    id: string
}

interface FindProjetosByIdResponse {
    projeto: Projetos
}


export class FindProjetosByIdService {

    constructor(private projetosRepository: IProjetos) {}

    async handle(data: FindProjetosByIdRequest): Promise<FindProjetosByIdResponse> {
        const projeto = await this.projetosRepository.findById(data.id)

        if(!projeto) throw new ProjetoNaoEncontradoError()

        return {
            projeto
        }
    }
}