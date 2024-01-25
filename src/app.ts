import fastify from "fastify";
import { ZodError } from "zod";
import { usuarioRoutes } from "./rotas/usuario-routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env/env";
import multer from "fastify-multer";

export const app = fastify()

app.register(fastifyJwt,{
    secret:env.JWT_SECRET
})

app.register(multer.contentParser)

app.register(usuarioRoutes, {
    prefix: '/usuarios'
})

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply.status(401).send({
            message: 'Erro de validação',
            issues: error.format()
        })
    }

    return reply.status(500).send({
        message: 'Erro Interno no Servidor'
    })
})
