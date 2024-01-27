import { makeUpdateImagem } from "@/factory/make-update-imagem";
import { IMulterRequest } from "@/interface/i-multer-request";
import { FastifyReply } from "fastify";
import { z } from "zod";

export async function updateImagem(request: IMulterRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const getFileSchema = z.object({
        originalname: z.string()
    })

    const getParamSchema = z.object({
        id: z.string()
    })

    const { originalname: name } = getFileSchema.parse(request.file)
    const { id } = getParamSchema.parse(request.params)

    const updateImagemById = makeUpdateImagem()


    try {
        const { projetos } = await updateImagemById.handle({
            imagens: name
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