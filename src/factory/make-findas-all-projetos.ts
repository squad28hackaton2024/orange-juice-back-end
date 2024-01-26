import { ProjetosRepository } from "@/repository/prisma/projetos-repository";
import { FindAllProjetosService } from "@/services/projetos/find-all-projects-service";


export function makeFindAllProjetos() {
    const projetosRepository = new ProjetosRepository()
    const findAllProjetosRepository = new FindAllProjetosService(projetosRepository)

    return findAllProjetosRepository
}