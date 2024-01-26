import { app } from '@/app'
import request from 'supertest'
import path from 'node:path'

const filePath = path.resolve(__dirname, '../../../tmp/storage', 'chipi.jpeg')

describe('Find All Projetos [GET]', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Deve encontrar todos os projetos', async () => {
        await request(app.server)
                .post('/usuarios')
                .send({
                    nome: 'gabriel',
                    sobrenome: 'mazer',
                    email: 'gabriel@email.com',
                    senha: 'funciona por favor'
                }) 

        const usuario = await request(app.server)
                            .post('/usuarios/login')
                            .send({
                                email: 'gabriel@email.com',
                                senha: 'funciona por favor'
                            })

        const { token } = usuario.body

        await request(app.server)
                .post('/projetos')
                .set('Authorization', `Bearer ${token}`)
                .field('titulo', 'projeto top')
                .field('descricao', 'que descricao boa')
                .field('link', 'aaaaa')
                .field('tags', 'ux , dev')
                .attach('imagens', filePath)

        await request(app.server)
                .post('/projetos')
                .set('Authorization', `Bearer ${token}`)
                .field('titulo', 'projeto legal')
                .field('descricao', 'que descricao bacana')
                .field('link', 'pega ai por favor')
                .field('tags', 'front , back')
                .attach('imagens', filePath)

        await request(app.server)
                .get('/projetos')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

    })
})