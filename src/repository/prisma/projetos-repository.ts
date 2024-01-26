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

    async deleteById(id: string) {
        const projeto = await prisma.projetos.delete({
            where: {
                id
            }
        })

        return projeto
    }

    async findById(id: string) {
        const usuario = await prisma.usuarios.findFirst({
            where: {
                id
            }
        })

        if(!usuario) return null

        return usuario
    }
}