import { app } from '@/app'
import request from 'supertest'
import path from 'node:path'

const filePath = path.resolve(__dirname, '../../../tmp/storage', 'chipi.jpeg')

describe('Delete Projetos [DELETE]', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Deve deletar um projeto pelo id ', async () => {
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

        const { id } = projetos.body

        await request(app.server)
                .del(`/projetos/${id}`)
                .set('Authorization', `Bearer ${token}`) 
                .expect(200)
    })

    it('Não deve deletar um projeto pelo id invalido', async () => {
        await request(app.server)
                .post('/usuarios')
                .send({
                    nome: 'anna',
                    sobrenome: 'gabriela',
                    email: 'anna@email.com',
                    senha: 'funciona por favor'
                }) 
        
        const usuario = await request(app.server)
                            .post('/usuarios/login')
                            .send({
                                email: 'anna@email.com',
                                senha: 'funciona por favor'
                            })

        const { token } = usuario.body
        
        const projeto = await request(app.server)
                .post('/projetos')
                .set('Authorization', `Bearer ${token}`)
                .field('titulo', 'projeto top')
                .field('descricao', 'que descricao boa')
                .field('link', 'aaaaa')
                .field('tags', 'ux , dev')
                .attach('imagens', filePath)

        const { id } = projeto.body

        await request(app.server)
                .del(`/projetos/${id}`)
                .set('Authorization', `Bearer invalido token`) 
                .expect(401)
    })
})