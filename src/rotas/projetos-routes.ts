import { create } from "@/controller/projetos/create";
import { deleteById } from "@/controller/projetos/delete-by-id";
import { findAll } from "@/controller/projetos/find-all";
import { findById } from "@/controller/projetos/find-by-id";
import { findByUsuariosId } from "@/controller/projetos/find-by-usuario-id";
import { update } from "@/controller/projetos/update";
import { updateImagem } from "@/controller/projetos/update-imagem";
import { jwtVerifyToken } from "@/middleware/jwt-verify-token";
import { upload } from "@/multer/multer";
import { FastifyInstance } from "fastify";

export async function projetosRoutes(app: FastifyInstance) {

    app.post('/',{
        onRequest: [jwtVerifyToken],
        preHandler: upload.single('imagens')
    }, create)

    app.get('/:id', {
        onRequest: [jwtVerifyToken]
    }, findById)

    app.get('/', {
        onRequest: [jwtVerifyToken]
    }, findAll)

    app.get('/usuarios', {
        onRequest: [jwtVerifyToken]
    }, findByUsuariosId)
    
    app.delete('/:id',{
        onRequest: [jwtVerifyToken]
    }, deleteById)

    app.put('/:id', {
        onRequest: [jwtVerifyToken]
    }, update)

    app.patch('/:id', {
        onRequest: [jwtVerifyToken],
        preHandler: upload.single('imagens')
    }, updateImagem)
}