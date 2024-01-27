import { makeUpdateProjetos } from "@/factory/make-update-projetos";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const getBodySchema = z.object({
        titulo: z.string().optional(),
        tags: z.string().array().optional(),
        link: z.string().optional(),
        descricao: z.string().optional(),
    })

    const getParamSchema = z.object({
        id: z.string()
    })

    const { titulo, tags, link, descricao } = getBodySchema.parse(request.body)
    const { id } = getParamSchema.parse(request.params)

    const updateProjetosById = makeUpdateProjetos()


    const { sub } = request.user

    try {
        const { projetos  } = await updateProjetosById.handle({
            titulo,
            descricao,
            tags,
            link,
            usuariosId: sub
        }, id)

        return reply.status(200).send({
            message: 'Atualizado com sucesso',
            projetos
        })
    } catch (error) {
        return reply.status(500).send({
            message: 'Erro interno no servidor'
        })
    }
}