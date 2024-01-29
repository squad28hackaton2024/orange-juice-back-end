import { ProjetosRepository } from "@/repository/prisma/projetos-repository";
import { FindProjetosUsuariosByIdService } from "@/services/projetos/find-by-id-usuario";



export function makeFindByUsuariosIdProjeto() {
    const projetosRepository = new ProjetosRepository()
    const findProjetosByUsuariosIdService = new FindProjetosUsuariosByIdService(projetosRepository)

    return findProjetosByUsuariosIdService
}