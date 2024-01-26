import { ProjetosRepository } from "@/repository/prisma/projetos-repository";
import { UpdateImageByIdService } from "@/services/projetos/update-imagens-by-id";


export function makeUpdateImagem() {
    const projetosRepository = new ProjetosRepository()
    const updateImagemByIdService = new UpdateImageByIdService(projetosRepository)

    return updateImagemByIdService
}