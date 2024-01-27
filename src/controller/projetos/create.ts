import { makeCreateProjeto } from "@/factory/make-create-projetos";
import { IMulterRequest } from "@/interface/i-multer-request";
import { FastifyReply } from "fastify";
import { z } from "zod";

export async function create(request: IMulterRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const getBodySchema = z.object({
        titulo: z.string(),
        tags: z.string(),
        link: z.string(),
        descricao: z.string(),
    })

    const getFileSchema = z.object({
        originalname: z.string()
    })

    const { titulo, tags, link, descricao } = getBodySchema.parse(request.body)
    const { originalname: name } = getFileSchema.parse(request.file)

    const createProjetoService = makeCreateProjeto()

    const transformandoTagsParaArray = tags.split(',')

    const { sub } = request.user

    try {
        const { projetos } = await createProjetoService.handle({
            titulo,
            tags: transformandoTagsParaArray,
            link,
            descricao,
            imagens: name,
            usuariosId: sub
        })

        return reply.status(201).send({
            message: 'Projeto Criado',
            projetos
        })
    } catch (error) {
        return reply.status(404).send('erro')
    }
}