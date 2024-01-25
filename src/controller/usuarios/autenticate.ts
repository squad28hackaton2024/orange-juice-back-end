import { CredenciaisInvalidasError } from "@/error/credenciais-invalidas-error";
import { makeAuthenticateUser } from "@/factory/make-autenticate-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
        email: z.string(),
        senha: z.string()
    })

    const { email, senha } = getBodySchema.parse(request.body)

    const authenticateUsuarioService = makeAuthenticateUser()

    try {
        const { usuarios } = await authenticateUsuarioService.handle({
            email,
            senha
        })

        const token = await reply.jwtSign({}, {
            expiresIn: '1h',
            sub: usuarios.id,
        })

        return reply.status(201).send({
            message: 'Usuário Logado',
            usuarios,
            token
        })
    } catch (error) {
        if(error instanceof CredenciaisInvalidasError) {
            return reply.status(404).send({
                message: error.message
            })
        }
    }
}