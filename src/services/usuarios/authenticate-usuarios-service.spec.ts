import { InMemoryUsuarioRepository } from "@/repository/in-memory/in-memory-usuario-repository";
import { AuthenticateUsuariosService } from "./authenticate-usuarios-service";

let usuariosRepository: InMemoryUsuarioRepository
let sut: AuthenticateUsuariosService

describe('Authenticate Usuarios Service', () => {

    beforeEach(() => {
        usuariosRepository = new InMemoryUsuarioRepository()
        sut = new AuthenticateUsuariosService(usuariosRepository)
    })

    it('deve autenticar um usuário com email e senha corretos', async () => {
        const a = await usuariosRepository.create({
            nome: 'gabriel',
            sobrenome: 'mazer',
            email: 'mteste@email.com',
            senha: '123456'
        })

        const { usuarios  } = await sut.handle({
            email: 'mteste@email.com',
            senha: '123456'
        })

        expect(usuarios).toEqual(expect.objectContaining({
            id: expect.any(String),
            nome: 'gabriel',
            sobrenome: 'mazer',
        }))
    })

    it('Não deve autenticar um usuário com senha incorreta', async () => {
        await usuariosRepository.create({
            nome: 'gabriel',
            sobrenome: 'mazer',
            email: 'mteste@email.com',
            senha: '123456'
        })

        expect(async () => {
            await sut.handle({
                email: 'mteste@email.com',
                senha: 'senha errada'
            })
        })
    })

    it('Não deve autenticar um usuário com email incorreto', async () => {
        await usuariosRepository.create({
            nome: 'gabriel',
            sobrenome: 'mazer',
            email: 'mteste@email.com',
            senha: '123456'
        })

        expect(async () => {
            await sut.handle({
                email: 'email errado',
                senha: '123456'
            })
        })
    })
})