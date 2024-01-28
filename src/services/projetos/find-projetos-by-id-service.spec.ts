import { InMemoryProjetosRepository } from "@/repository/in-memory/in-memory-projetos-repository";
import { FindProjetosByIdService } from "./find-projetos-by-id-service";

let projetosRepository: InMemoryProjetosRepository
let sut: FindProjetosByIdService

describe('Find Projetos By Id', () => {

    beforeEach(() => {
        projetosRepository = new InMemoryProjetosRepository()
        sut = new FindProjetosByIdService(projetosRepository)
    })

    it('deve encontrar um projeto por id', async () => {


        await projetosRepository.create({
            id: 'projeto-id',
            descricao: 'back',
            link: 'http://link',
            titulo: 'titulo',
            imagens: 'imagen',
            tags: ['back'],
            usuariosId: 'fake'
        })

        const { projeto } = await sut.handle({
            id: 'projeto-id'
        })

        expect(projeto).toEqual(expect.objectContaining({
            id: expect.any(String),
            titulo: 'titulo',
            imagens: 'imagen',
        }))
    })
})