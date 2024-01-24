import { UsuarioExisteError } from "@/error/usuario-existe-error";
import { IUsuarios } from "@/interface/i-usuarios";
import { Usuarios } from "@prisma/client";

interface CreateUsuariosRequest {
    nome: string
    sobrenome: string
    email: string
    senha: string
}

interface CreateUsuariosResponse {
    usuarios: Usuarios
}

export class CreateUsuariosService {

    constructor(private usuariosRepository: IUsuarios) {}

    async handle(data: CreateUsuariosRequest): Promise<CreateUsuariosResponse> {
        const encontrarUsuarioPeloEmail = await this.usuariosRepository.findByEmail(data.email)

        if(encontrarUsuarioPeloEmail) throw new UsuarioExisteError()

        const usuarios = await this.usuariosRepository.create(data)

        return {
            usuarios
        }
    } 
}