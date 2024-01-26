
import { UsuarioNaoEncontradoError } from "@/error/usuario-nao-encontrado-error";
import { IProjetos } from "@/interface/i-projetos";
import { IUsuarios } from "@/interface/i-usuarios";
import { Projetos } from "@prisma/client";

interface DeleteProjetosByIdRequest {
    id: string
    usuariosId: string
}

interface  DeleteProjetosByIdResponse {
    projetos: Projetos
}


export class DeleteProjetosByIdService {

    constructor(
        private projetosRepository: IProjetos,
        private usuariosRepository: IUsuarios
        ) {}

    async handle(data: DeleteProjetosByIdRequest): Promise<DeleteProjetosByIdResponse> {
        const usuario = await this.usuariosRepository.findById(data.usuariosId)

        if(!usuario) throw new UsuarioNaoEncontradoError()

        const projetos = await this.projetosRepository.deleteById(data.id)

        return {
            projetos
        }
    }
}