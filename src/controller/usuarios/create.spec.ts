import { app } from '@/app'
import request from 'supertest'

describe('Create Usuario [POST]', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Deve ser possível cadastrar um usuário', async () => {
        await request(app.server)
            .post('/usuarios')
            .send({
                nome: 'lucas',
                sobrenome: 'nather',
                email: 'lucas@email.com',
                senha: 'senha forte'
            })
            .expect(201)
    })

    it('Não deve ser possível cadastrar um usuário com email inválido', async () => {
        await request(app.server)
            .post('/usuarios')
            .send({
                nome: 'lucas',
                sobrenome: 'nather',
                email: 'email invalido',
                senha: '123456'
            })
            .expect(404)
    })

    it('Não deve ser possível cadastrar um usuário com senha de menos 8 caracteres', async () => {
        await request(app.server)
            .post('/usuarios')
            .send({
                nome: 'lucas',
                sobrenome: 'nather',
                email: 'lucas@email.com',
                senha: '1'
            })
            .expect(404)
    })
})