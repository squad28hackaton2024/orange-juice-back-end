import { UsuarioExisteError } from "@/error/usuario-existe-error";
import { InMemoryUsuarioRepository } from "@/repository/in-memory/in-memory-usuario-repository";
import { CreateUsuariosService } from "./create-usuarios-service";

let usuariosRepository: InMemoryUsuarioRepository
let sut: CreateUsuariosService

describe('Create Usuarios Service', () => {
    beforeEach(() => {
        usuariosRepository = new InMemoryUsuarioRepository()
        sut = new CreateUsuariosService(usuariosRepository)
    })

    it('deve cadastar um usuário', async () => {
        const { usuarios } = await sut.handle({
            nome: 'lucas',
            sobrenome: 'nather',
            email: 'lteste@gmail.com',
            senha: '123456'
        })

        expect(usuarios).toEqual(expect.objectContaining({
            id: expect.any(String),
            nome: 'lucas'
        }))
    })

    it('Não deve cadastar um usuário com o mesmo email', async () => {
        await sut.handle({
            nome: 'lucas',
            sobrenome: 'nather',
            email: 'lteste@gmail.com',
            senha: '123456'
        })

        expect(async () => {
            await sut.handle({
                nome: 'lucas',
                sobrenome: 'nather',
                email: 'lteste@gmail.com',
                senha: '123456'
            })
        })
    })
    
})