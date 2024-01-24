import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(8080),
    NODE_ENV: z.enum(['dev','test', 'prod']).default('dev')
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('Environment Variable Error')

    throw new Error('Environment Variable Error')
}

export const env = _env.data