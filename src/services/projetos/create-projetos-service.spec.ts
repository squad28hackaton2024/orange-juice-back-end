import { InMemoryProjetosRepository } from "@/repository/in-memory/in-memory-projetos-repository";
import { InMemoryUsuarioRepository } from "@/repository/in-memory/in-memory-usuario-repository";
import { CreateProjetosService } from "./create-projetos-service";

let projetosRepository: InMemoryProjetosRepository
let usuariosRepository: InMemoryUsuarioRepository
let sut: CreateProjetosService

describe('Create Projetos Service', () => {

    beforeEach(() => {
        projetosRepository = new InMemoryProjetosRepository()
        usuariosRepository = new InMemoryUsuarioRepository()
        sut = new CreateProjetosService(projetosRepository)
    })

    it('Deve poder cadastrar um projeto',async () => {
        await usuariosRepository.create({
            id: 'meu-id',
            nome: 'mazer',
            sobrenome: 'mazer',
            email: 'gabriel@mazer.com',
            senha: '12345678',
        })

        const { projetos } = await sut.handle({
            titulo: 'projeto top',
            descricao: 'que descricao boa',
            imagens: 'imaaaagem',
            link: 'http://link.com.br',
            tags: ['ux', 'dev'],
            usuariosId: 'meu-id'
        })

        expect(projetos).toEqual(expect.objectContaining({
            id: expect.any(String),
            imagens: 'imaaaagem',
        }))
    })

    it('Não deve cadastrar um projeto',async () => {
        await usuariosRepository.create({
            id: 'meu-id',
            nome: 'mazer',
            sobrenome: 'mazer',
            email: 'gabriel@mazer.com',
            senha: '12345678',
        })

        const { projetos } = await sut.handle({
            titulo: 'projeto top',
            descricao: 'que descricao boa',
            imagens: 'imaaaagem',
            link: 'http://link.com.br',
            tags: ['ux', 'dev'],
            usuariosId: 'meu-id'
        })

        expect(projetos).toEqual(expect.objectContaining({
            id: expect.any(String),
            imagens: 'imaaaagem',
        }))
    })
})