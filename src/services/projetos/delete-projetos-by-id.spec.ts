import { InMemoryProjetosRepository } from "@/repository/in-memory/in-memory-projetos-repository";
import { InMemoryUsuarioRepository } from "@/repository/in-memory/in-memory-usuario-repository";
import { DeleteProjetosByIdService } from "./delete-projetos-by-id";

let projetosRepository: InMemoryProjetosRepository
let usuariosRepository: InMemoryUsuarioRepository
let sut: DeleteProjetosByIdService

describe('Delete Projetos By id', () => {

    beforeEach(() => {
        projetosRepository = new InMemoryProjetosRepository()
        usuariosRepository = new InMemoryUsuarioRepository()
        sut = new DeleteProjetosByIdService(projetosRepository, usuariosRepository)
    })

    it('Deve deletar um projeto com usuário válido', async () => {
        await usuariosRepository.create({
            id: 'meu-id',
            nome: 'mazer',
            sobrenome: 'mazer',
            email: 'gabriel@mazer.com',
            senha: '12345678',
        })

        await projetosRepository.create({
            id: 'projeto-id',
            titulo: 'projeto top',
            descricao: 'que descricao boa',
            imagens: 'imaaaagem',
            link: 'http://link.com.br',
            tags: ['ux', 'dev'],
            usuariosId: 'meu-id'
        }) 

        const {projetos} = await sut.handle({
            id: 'projeto-id',
            usuariosId: 'meu-id'
        })

        expect(projetos).toEqual(undefined)
    }) 
})