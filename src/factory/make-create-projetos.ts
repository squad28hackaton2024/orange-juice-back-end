import { ProjetosRepository } from "@/repository/prisma/projetos-repository";
import { CreateProjetosService } from "@/services/projetos/create-projetos-service";

export function makeCreateProjeto() {
    const projetoRepository = new ProjetosRepository()
    const createProjetoService = new CreateProjetosService(projetoRepository)

    return createProjetoService
}