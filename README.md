<h1 align="center">Projeto Orange Porfólio - Orange Juice</h1>

<p align="center">
    Projeto desenvolvido com Nodejs + Typescript, a API foi criada para cadastrar usuários onde eles possam facilmente vizualizar, cadastrar, editar e atualizar projetos que queiram compartilhar nesse mundão a fora !!!
</p>


### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/squad28hackaton2024/orange-juice-back-end.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd orange-juice-back-end

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# Subindo o container docker

$ docker compose up

# Variáveis de ambiente

Olhe o arquivo chamado .env.example para criar as variáveis de ambiente utilizadas no projeto

# Testes Unitários

$ npm run test:unit

# Testes de Ponta a Ponta

$ npm run test:e2e 
$ sudo npm run test:e2e -> para usuários unix que estiverem com problema ao rodar o comando acima

# O servidor inciará na porta:8080 por padrão - acesse <http://localhost:8080> 
