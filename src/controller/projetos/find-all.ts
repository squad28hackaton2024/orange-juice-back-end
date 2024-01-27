
import { makeFindAllProjetos } from "@/factory/make-findas-all-projetos";
import { FastifyReply, FastifyRequest } from "fastify";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const findAllProjetosService = makeFindAllProjetos()

    try {
        const { projetos } = await findAllProjetosService.handle()

        return reply.status(200).send({
            projetos
        })
    } catch (error) {
        return reply.status(5000).send({
            message: 'Erro interno no servidor'
        })
    }
}