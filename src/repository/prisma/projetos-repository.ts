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

    async findAll(tag?: string[]) {
        if(tag != null) {
            const projeto = await prisma.projetos.findMany({
                include: {
                    usuarios: true
                },
                where: {
                    tags: {
                        hasSome: tag
                    }
                }
            })
            return projeto
        }

        return await prisma.projetos.findMany({
            include: {
                usuarios: true
            }
        })
        
    }

    async  updateImagemById( id: string, imagens?: string)  {
        const projeto = await prisma.projetos.update({
           data: {
            imagens,
            updatedAt: new Date()
           },
            where: {
                id
            }
        })

        return projeto
    }

    async  updateById(data: Prisma.ProjetosUncheckedUpdateInput, id: string)  {
        
        const projeto = await prisma.projetos.update({
           data: {
            ...data,
            updatedAt: new Date()
           },
            where: {
                id
            }
        })

        return projeto
    }

    async findById(id: string) {
        const projeto = await prisma.projetos.findFirst({
            where: {
                id
            },
            include: {
                usuarios: true
            }
        })

        if(!projeto) return null

        return projeto
    }

    async findByUsuariosId(usuariosId: string) {
        const projeto = await prisma.projetos.findMany({
            where: {
                usuariosId
            },
            include: {
                usuarios: true
            }
        })

        if(!projeto) return null

        return projeto
    }
}