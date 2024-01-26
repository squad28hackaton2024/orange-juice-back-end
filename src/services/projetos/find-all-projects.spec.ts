import { InMemoryProjetosRepository } from "@/repository/in-memory/in-memory-projetos-repository";
import { InMemoryUsuarioRepository } from "@/repository/in-memory/in-memory-usuario-repository";
import { FindAllProjetosService } from "./find-all-projects-service";



let projetosRepository = new InMemoryProjetosRepository
let usuariosRepository = new InMemoryUsuarioRepository
let sut: FindAllProjetosService

describe('Find all Projetos Service', () => {

    beforeEach(() => {
        projetosRepository = new InMemoryProjetosRepository()
        usuariosRepository = new InMemoryUsuarioRepository()
        sut = new FindAllProjetosService(projetosRepository)
    })


    it('deve ser possivel achar todos os projetos cadastrados', async () => {
        await usuariosRepository.create({
            id: 'meu-id',
            nome: 'anna',
            sobrenome: 'mota',
            email: 'a@gmail.com',
            senha: '12345678'
        })

        await projetosRepository.create({
            titulo: 'front',
            link: 'http://link.com/',
            descricao: 'descricao legal',
            usuariosId: 'meu-id',
            imagens: 'cleinte.jpeg',
            tags: ['ux', 'front']
        })

        await projetosRepository.create({
            titulo: 'back',
            link: 'http://link.com/',
            descricao: 'descricao legal',
            usuariosId: 'meu-id',
            imagens: 'cleinte.jpeg',
            tags: ['java', 'back']
        })

        const { projetos } = await sut.handle()

        expect(projetos).toHaveLength(2)
    })


})