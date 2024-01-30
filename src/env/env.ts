import 'dotenv/config'
import { z } from 'zod'

if(process.env.NODE_ENV !== 'dev') {
    process.env.NODE_ENV = 'production'
}

const envSchema = z.object({
    PORT: z.coerce.number().default(8080),
    NODE_ENV: z.enum(['dev','test', 'production']).default('dev'),
    JWT_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('Erro na variável de ambiente', _env.error.format())

    throw new Error('Erro na variável de ambiente')
}

export const env = _env.data