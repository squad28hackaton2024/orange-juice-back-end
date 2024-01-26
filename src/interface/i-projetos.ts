import { Prisma, Projetos } from "@prisma/client";

export interface IProjetos {

    create(data: Prisma.ProjetosUncheckedCreateInput): Promise<Projetos>
    deleteById(id: string): Promise<Projetos>
    findAll(): Promise<Projetos[]>
}
