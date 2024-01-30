import fastify from "fastify";
import fastifyCors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastifySwagger } from "@fastify/swagger";
import multer from "fastify-multer";
import path from "node:path";
import { ZodError } from "zod";
import { env } from "./env/env";
import { projetosRoutes } from "./rotas/projetos-routes";
import { usuarioRoutes } from "./rotas/usuario-routes";

export const app = fastify()


app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
})

app.register(fastifySwagger, {
    swagger: {
        info: {
          title: 'Orange Portfólio',
          description: 'Aplicacação para cadastro de projetos',
          version: '0.1.0'
        },
        securityDefinitions: {
            jwt: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header',
            },
        },
    }
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(fastifyStatic, {
    root: path.join(__dirname, '../', 'tmp', 'storage'),
    prefix: '/uploads/'
})

app.register(fastifyJwt,{ 
    secret:env.JWT_SECRET
})

app.register(multer.contentParser)

app.register(usuarioRoutes, {
    prefix: '/usuarios'
})

app.register(projetosRoutes, {
    prefix: '/projetos'
})

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply.status(404).send({
            message: 'Erro de validação',
            issues: error.format()
        })
    }

    return reply.status(500).send({
        message: 'Erro interno do servidor'
    })
})
