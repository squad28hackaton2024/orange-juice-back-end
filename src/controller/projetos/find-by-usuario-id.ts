import { ProjetoNaoEncontradoError } from "@/error/projeto-nao-encontrado-error";
import { makeFindByUsuariosIdProjeto } from "@/factory/make-find-by-usuario-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findByUsuariosId(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const findProjetoByUsuariosIdService = makeFindByUsuariosIdProjeto()

    const { sub } = request.user

    try {
        const { projeto } = await findProjetoByUsuariosIdService.handle({
            usuariosId: sub
        })

        return reply.status(200).send({
            message: 'Projeto encontrado',
            projeto
        })
    } catch (error) {
        if(error instanceof ProjetoNaoEncontradoError) {
            return reply.status(404).send({
                message: error.message
            })
        }
    }
}