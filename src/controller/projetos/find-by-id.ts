import { ProjetoNaoEncontradoError } from "@/error/projeto-nao-encontrado-error";
import { makeFindByIdProjeto } from "@/factory/make-find-by-id-projeto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findById(request: FastifyRequest, reply: FastifyReply) {

    const getParamSchema = z.object({
        id: z.string()
    })

    const { id } = getParamSchema.parse(request.params)

    const findProjetoByIdService = makeFindByIdProjeto()

    try {
        const { projeto } = await findProjetoByIdService.handle({
            id
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