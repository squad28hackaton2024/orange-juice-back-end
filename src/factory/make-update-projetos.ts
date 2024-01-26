import { ProjetosRepository } from "@/repository/prisma/projetos-repository";
import { UpdateProjetosByIdService } from "@/services/projetos/update-projetos-by-id-service";

export function makeUpdateProjetos() {
    const projetosRepository = new ProjetosRepository()
    const updateProjetosByIdService = new UpdateProjetosByIdService(projetosRepository)

    return updateProjetosByIdService
}