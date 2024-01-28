export class ProjetoNaoEncontradoError extends Error {
    constructor() {
        super('Projeto não encontrado')
    }
}