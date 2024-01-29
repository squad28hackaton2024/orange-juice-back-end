import { InMemoryProjetosRepository } from "@/repository/in-memory/in-memory-projetos-repository";
import { FindProjetosUsuariosByIdService } from "./find-by-id-usuario";


let projetosRepository: InMemoryProjetosRepository
let sut: FindProjetosUsuariosByIdService

describe('Find Projetos By Usuarios Id', () => {

    beforeEach(() => {
        projetosRepository = new InMemoryProjetosRepository()
        sut = new FindProjetosUsuariosByIdService(projetosRepository)
    })

    it('deve encontrar um projeto por id do usuário', async () => {


        await projetosRepository.create({
            id: 'projeto-id',
            descricao: 'back',
            link: 'http://link/',
            titulo: 'titulo',
            imagens: 'imagen',
            tags: ['back'],
            usuariosId: 'fake-id'
        })

        const { projeto } = await sut.handle({
            usuariosId: 'fake-id'
        })

        expect(projeto).toHaveLength(1)
        expect(projeto).toEqual([expect.objectContaining({
            id: expect.any(String),
            titulo: 'titulo',
            imagens: 'imagen',
        })])
    })
})