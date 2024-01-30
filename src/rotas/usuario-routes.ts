
import { authenticate } from "@/controller/usuarios/authenticate";
import { create } from "@/controller/usuarios/create";
import { FastifyInstance } from "fastify";

export async function usuarioRoutes(app: FastifyInstance) {

    app.post('/', {
    }, create)

    app.post('/login', {
    }, authenticate)
}