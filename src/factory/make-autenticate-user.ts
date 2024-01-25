import { UsuarioRepository } from "@/repository/prisma/usuario-repository";
import { AuthenticateUsuariosService } from "@/services/usuarios/authenticate-usuarios-service";

export function makeAuthenticateUser() {
    const usuarioRepository = new UsuarioRepository()
    const authenticateUsarioService = new AuthenticateUsuariosService(usuarioRepository)

    return authenticateUsarioService
}