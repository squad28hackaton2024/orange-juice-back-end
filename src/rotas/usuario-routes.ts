
import { authenticate } from "@/controller/usuarios/authenticate";
import { create } from "@/controller/usuarios/create";
import { FastifyInstance } from "fastify";

export async function usuarioRoutes(app: FastifyInstance) {

    app.post('/', {
        schema: {
          description: 'Cadastro de usuários',
          body: {
            type: 'object',
            properties: {
                nome: { type: 'string' },
                sobrenome: { type: 'string'},
                email: { type: 'string'},
                senha: { type: 'string' },
            }
          },
          response: {
            201: {
                description: 'Cadastro feito com sucesso',
                type: 'object',
                properties: {
                  nome: { type: 'string' },
                  sobrenome: { type: 'string'},
                  email: { type: 'string'},
                  senha: { type: 'string' },
                }
            }
          }
        }
    }, create)

    app.post('/login', {
        schema: {
            description: 'Login de usuários',
            body: {
              type: 'object',
              properties: {
                  email: { type: 'string'},
                  senha: { type: 'string' },
              }
            },
            response: {
              201: {
                  description: 'Usuário Logado',
                  type: 'object',
                  properties: {
                    nome: { type: 'string' },
                    sobrenome: { type: 'string'},
                    email: { type: 'string'},
                    senha: { type: 'string' },
                    token: { type: 'string' }
                  }
              }
            }
          }
    }, authenticate)
}