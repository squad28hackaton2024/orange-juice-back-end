
import { makeFindAllProjetos } from "@/factory/make-findas-all-projetos";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const getSearchParam = z.object({
        tag: z.string().array().optional()
    })

    const { tag } = getSearchParam.parse(request.query)

    const findAllProjetosService = makeFindAllProjetos()

    try {
        const { projetos } = await findAllProjetosService.handle({
            tag
        })

        return reply.status(200).send({
            projetos
        })
    } catch (error) {
        return reply.status(5000).send({
            message: 'Erro interno no servidor'
        })
    }
}