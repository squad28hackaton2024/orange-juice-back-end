import { prisma } from "@/database/prisma";
import { IProjetos } from "@/interface/i-projetos";
import { Prisma } from "@prisma/client";

export class ProjetosRepository implements IProjetos {

    async create(data: Prisma.ProjetosUncheckedCreateInput) {
        const projeto = await prisma.projetos.create({
            data
        })

        return projeto
    }
}