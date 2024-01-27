import { UsuarioNaoEncontradoError } from "@/error/usuario-nao-encontrado-error";
import { makeDeleteByIdProjeto } from "@/factory/make-delete-projeto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const getParamSchema = z.object({
        id: z.string()
    })

    const { id } = getParamSchema.parse(request.params)
    const { sub } = request.user

    const deleteProjetosByIdService = makeDeleteByIdProjeto()

    try {
        const { projetos } = await deleteProjetosByIdService.handle({
            id,
            usuariosId: sub
        })

        return reply.status(200).send({
            message: 'Projeto Deletado',
            projetos
        })
    } catch (error) {
        if(error instanceof UsuarioNaoEncontradoError) {
            return reply.status(401).send({
                message: error.message
            })
        }
    }
}