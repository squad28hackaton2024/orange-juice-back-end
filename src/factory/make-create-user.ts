import { UsuarioRepository } from "@/repository/prisma/usuario-repository";
import { CreateUsuariosService } from "@/services/usuarios/create-usuarios-service";

export function makeCreateUser() {
    const userRepository = new UsuarioRepository()
    const createUsuarioService = new CreateUsuariosService(userRepository)

    return createUsuarioService
}