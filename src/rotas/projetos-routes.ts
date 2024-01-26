
import { create } from "@/controller/projetos/create";
import { deleteById } from "@/controller/projetos/delete-by-id";
import { findAll } from "@/controller/projetos/find-all";
import { updateImagem } from "@/controller/projetos/update-imagem";
import { jwtVerifyToken } from "@/middleware/jwt-verify-token";
import { upload } from "@/multer/multer";
import { FastifyInstance } from "fastify";

export async function projetosRoutes(app: FastifyInstance) {

    app.post('/',{
        onRequest: [jwtVerifyToken],
        preHandler: upload.single('imagens')
    }, create)

    app.delete('/:id', {
        onRequest: [jwtVerifyToken],
    }, deleteById)

    app.get('/', {
        onRequest: [jwtVerifyToken]
    }, findAll)

    app.patch('/:id', {
        onRequest: [jwtVerifyToken],
        preHandler: upload.single('imagens')
    }, updateImagem)
}