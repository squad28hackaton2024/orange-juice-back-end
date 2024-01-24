import { create } from "@/controller/usuarios/create";
import { FastifyInstance } from "fastify";

export async function usuarioRoutes(app: FastifyInstance) {

    app.post('/', create)
}