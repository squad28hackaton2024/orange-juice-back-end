import { app } from '@/app'
import request from 'supertest'
import path from 'node:path'

const filePath = path.resolve(__dirname, '../../../tmp/storage', 'chipi.jpeg')

describe('Find By Id Projetos [GET]', () => {

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
                    nome: 'lucas',
                    sobrenome: 'nather',
                    email: 'lucas@email.com',
                    senha: 'funciona por favor'
                }) 
        
        const usuario = await request(app.server)
                            .post('/usuarios/login')
                            .send({
                                email: 'lucas@email.com',
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

        const projetos = await request(app.server)
                .post('/projetos')
                .set('Authorization', `Bearer ${token}`)
                .field('titulo', 'projeto legal')
                .field('descricao', 'que descricao bacana')
                .field('link', 'pega ai por favor')
                .field('tags', 'front , back')
                .attach('imagens', filePath)

        const {id} = projetos.body.projetos

        await request(app.server)
                .get(`/projetos/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

    })
})