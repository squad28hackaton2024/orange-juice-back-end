import { prisma } from "@/database/prisma";
import { IUsuarios } from "@/interface/i-usuarios";
import { Prisma } from "@prisma/client";

export class UsuarioRepository implements IUsuarios {

    async create(data: Prisma.UsuariosCreateInput) {
        const usuario = await prisma.usuarios.create({
            data
        })

        return usuario
    }

    async findByEmail(email: string) {
        const usuario = await prisma.usuarios.findUnique({
            where: {
                email
            }
        })

        if(!usuario) return null

        return usuario
    }

}