export class UsuarioNaoEncontradoError extends Error {
    constructor() {
        super('Usuário não encontrado error')
    }
}