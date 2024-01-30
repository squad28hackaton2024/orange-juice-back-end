import { Prisma, Projetos } from "@prisma/client";

export interface IProjetos {

    create(data: Prisma.ProjetosUncheckedCreateInput): Promise<Projetos>
    deleteById(id: string): Promise<Projetos>
    findAll(tag?: string[]): Promise<Projetos[]>
    updateImagemById(id: string, imagens?: string): Promise<Projetos>
    updateById(data: Prisma.ProjetosUncheckedUpdateInput, id: string): Promise<Projetos>
    findById(id: string): Promise<Projetos | null>
    findByUsuariosId(usuariosId: string, tag?: string[]): Promise<Projetos[] | null>
}
