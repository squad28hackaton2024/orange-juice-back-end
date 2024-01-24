import { CredenciaisInvalidasError } from "@/error/credenciais-invalidas-error";
import { IUsuarios } from "@/interface/i-usuarios";
import { PasswordHash } from "@/uteis/password-hash";
import { Usuarios } from "@prisma/client";

interface AuthenticateUsuariosRequest {
    email: string
    senha: string
}

interface AuthenticateUsuariosResponse {
    usuarios: Usuarios
}

export class AuthenticateUsuariosService {

    constructor(private usuariosRepository: IUsuarios) {}

    async handle(data: AuthenticateUsuariosRequest): Promise<AuthenticateUsuariosResponse> {
        const usuarios = await this.usuariosRepository.findByEmail(data.email)

        if(!usuarios) throw new CredenciaisInvalidasError()

        const passwordHash = new PasswordHash()

        const eSenhaEValida = await passwordHash.compareSenha(data.senha, usuarios.senha)

        if(!eSenhaEValida) throw new CredenciaisInvalidasError()

        return {
            usuarios
        }
    }
}