import { app } from '@/app'
import request from 'supertest'

describe('Autenticar Usuario [POST]', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('deve autenticate um usuario pelo email senha', async () => {
        await request(app.server)
                .post('/usuarios')
                .send({
                    nome:'anna',
                    sobrenome: 'gabriela',
                    email: 'gtest@gmail.com',
                    senha: '12345678'
                })

        await request(app.server)
                .post('/usuarios/login')
                .send({
                    email: "gtest@gmail.com",
                    senha: "12345678"
                })
                .expect(201)
    })

    it('Não deve autenticat um usuario com senha ou email errados', async () => {
        await request(app.server)
                .post('/usuarios')
                .send({
                    nome:'gabriel',
                    sobrenome: 'mazer',
                    email: 'g@gmail.com',
                    senha: '12345678'
                })

        await request(app.server)
                .post('/usuarios/login')
                .send({
                    email: "super email errado",
                    senha: "errou"
                })
                .expect(404)
    })
})