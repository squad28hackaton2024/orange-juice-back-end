import { IProjetos } from "../../interface/i-projetos"
import { Prisma, Projetos } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryProjetosRepository implements IProjetos {

    private projetos: Projetos[] = []

    async create(data: Prisma.ProjetosUncheckedCreateInput) {
        const projeto: Projetos = {
            id: data.id ?? randomUUID(),
            titulo: data.titulo,
            descricao: data.descricao,
            tags: typeof(data.tags) == 'symbol' ? Array.from(data.tags) : [],
            link: data.link,
            imagens: data.imagens ?? null,
            usuariosId: data.usuariosId,
            createdAt: new Date(),
            updatedAt: null
        }

        this.projetos.push(projeto)

        return projeto
    }

    async deleteById(id: string) {
        const indiceUsuario = this.projetos.findIndex(usuario => usuario.id === id)

        this.projetos = this.projetos.splice(1, indiceUsuario)

        return this.projetos[indiceUsuario]
    }
    
    async findAll(tag?: string[]) {
       return this.projetos
    }

    async updateImagemById(id: string, imagem?: string | undefined){
        return this.projetos[0]
    }

    async updateById(data: Prisma.ProjetosUncheckedUpdateInput, id: string) {
        return this.projetos[0]
    }

    async findById(id: string) {
        const projeto = this.projetos.find(projeto => projeto.id === id)

        if(!projeto) return null

        return projeto
    }

}