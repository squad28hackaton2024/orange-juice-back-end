import { Prisma, Projetos } from "@prisma/client";

export interface IProjetos {

    create(data: Prisma.ProjetosUncheckedCreateInput): Promise<Projetos>
    deleteById(id: string): Promise<Projetos>
    findAll(): Promise<Projetos[]>
    updateImagemById(id: string, imagens?: string): Promise<Projetos>
    updateById(data: Prisma.ProjetosUncheckedUpdateInput, id: string): Promise<Projetos>
    findById(id: string): Promise<Projetos | null>
}
