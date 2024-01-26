import { ProjetosRepository } from "@/repository/prisma/projetos-repository";
import { UsuarioRepository } from "@/repository/prisma/usuario-repository";
import { DeleteProjetosByIdService } from "@/services/projetos/delete-projetos-by-id";

export function makeDeleteByIdProjeto() {
    const projetosRepository = new ProjetosRepository()
    const usuariosRepository = new UsuarioRepository()
    const deleteProjetosByIdService = new DeleteProjetosByIdService(projetosRepository, usuariosRepository)

    return deleteProjetosByIdService
}