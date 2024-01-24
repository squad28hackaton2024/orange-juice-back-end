import { Prisma, Usuarios } from "@prisma/client";

export interface IUsuarios {
    create(data: Prisma.UsuariosCreateInput): Promise<Usuarios>
    findByEmail(email: string): Promise<Usuarios | null>
}