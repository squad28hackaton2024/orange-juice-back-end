import { ProjetosRepository } from "@/repository/prisma/projetos-repository";
import { FindProjetosByIdService } from "@/services/projetos/find-projetos-by-id-service";

export function makeFindByIdProjeto() {
    const projetosRepository = new ProjetosRepository()
    const findProjetosByIdService = new FindProjetosByIdService(projetosRepository)

    return findProjetosByIdService
}