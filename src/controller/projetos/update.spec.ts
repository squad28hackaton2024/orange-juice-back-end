import { app } from '@/app'
import request from 'supertest'
import path from 'node:path'

const filePath = path.resolve(__dirname, '../../../tmp/storage', 'laranja.jpeg')

describe('Update Projeto [PUT]', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Deve atualizar campos do projeto', async () => {
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
        
        const projetos = await request(app.server)
                .post('/projetos')
                .set('Authorization', `Bearer ${token}`)
                .field('titulo', 'projeto top')
                .field('descricao', 'que descricao boa')
                .field('link', 'aaaaa')
                .field('tags', 'ux , dev')
                .attach('imagens', filePath)

        const { id } = projetos.body.projetos
        
        await request(app.server)
                .put(`/projetos/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "titulo": "novo titulo"
                })
                .expect(200)

    })
})