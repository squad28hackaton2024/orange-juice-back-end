import { Prisma, Projetos } from "@prisma/client";

export interface IProjetos {

    create(data: Prisma.ProjetosUncheckedCreateInput): Promise<Projetos>
}