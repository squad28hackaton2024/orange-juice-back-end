import { UsuarioExisteError } from "@/error/usuario-existe-error";
import { makeCreateUser } from "@/factory/make-create-user";
import { PasswordHash } from "@/uteis/password-hash";
import { FastifyReply, FastifyRequest } from "fastify";
import { e } from "vitest/dist/reporters-rzC174PQ";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
        nome: z.string(),
        sobrenome: z.string(),
        email: z.string().email('O email não está no formato correto'),
        senha: z.string().min(8, 'Mínimo de 8 caracteres')
    })

    const { nome, sobrenome, email, senha } = getBodySchema.parse(request.body)

    const passWordHash = new PasswordHash()

    const hash = await passWordHash.hashSenha(senha)

    const createUsuarioService = makeCreateUser()

    try {
        const { usuarios } = await createUsuarioService.handle({
            nome,
            sobrenome,
            email,
            senha: hash
        })

        return reply.status(201).send({
            message: 'Usuário Criado',
            usuarios
        })
    } catch (error) {
        if(error instanceof UsuarioExisteError) {
            return reply.status(404).send({
                message: error.message
            })
        }
    }
}