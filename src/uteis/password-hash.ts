import {compare, hash} from "bcryptjs"

export class PasswordHash{
    async hashSenha(senha:string){
        const rodadas=6 
        return await hash(senha, rodadas)
    }

    async compareSenha(senha:string, senhaDb:string){
        return await compare(senha, senhaDb)
    }
}

