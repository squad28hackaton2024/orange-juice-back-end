import { IUsuarios } from "@/interface/i-usuarios";
import { Prisma, Usuarios } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryUsuarioRepository implements IUsuarios {

    private usuarios: Usuarios[] = []

    async create(data: Prisma.UsuariosCreateInput) {
        const usuario: Usuarios = {
            id: data.id ?? randomUUID(),
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            senha: data.senha,
            createdAt: new Date(),
            updatedAt: null
        }

        this.usuarios.push(usuario)

        return usuario
    }

    async findByEmail(email: string) {
        const usuario = this.usuarios.find(usuario => usuario.email === email)

        if(!usuario) return null

        return null
    }

}