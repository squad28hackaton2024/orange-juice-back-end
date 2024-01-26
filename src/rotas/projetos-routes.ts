
import { create } from "@/controller/projetos/create";
import { jwtVerifyToken } from "@/middleware/jwt-verify-token";
import { upload } from "@/multer/multer";
import { FastifyInstance } from "fastify";

export async function projetosRoutes(app: FastifyInstance) {

    app.post('/',{
        onRequest: [jwtVerifyToken],
        preHandler: upload.single('imagens')
    }, create)
}