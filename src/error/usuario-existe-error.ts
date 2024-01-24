export class UsuarioExisteError extends Error {

    constructor() {
        super('Usuário já existente')
    }
}