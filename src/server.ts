import { app } from "./app";
import { env } from "./env/env";

app.listen({
    port: env.PORT
})
.then(() => {
    console.log(`Rodando na porta http://localhost:${env.PORT}`)
})
.catch((e) => {
    console.error('Erro ao rodar servidor')
})