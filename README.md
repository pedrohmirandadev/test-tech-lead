## Perguntas teste

1. Quanto tempo levaria
Afim de concluir o projeto com agilidade e com o máximo de qualidade e features possíveis eu daria um prazo de 3 dias. 
Seguindo apenas o que está no PDF.

2. Quantos desenvolvedores
Eu utilizaria 2 desenvolvedores, sendo um Backend e um Frontend.

3. Qual senioridade dos desenvolvedores
Eu utilizaria 2 desenvolvedores plenos.

## Arquitetura do projeto

Para o projeto em NestJS, a arquitetura é composta por um conjunto de serviços AWS que garantem escalabilidade, 
alta disponibilidade e baixo custo operacional. O API Gateway será o ponto de entrada para todas as requisições HTTP,
encaminhando-as para o AWS EC2 onde o NestJS estará hospedado. 
O Amazon RDS será utilizado para gerenciar o banco de dados relacional, enquanto o Amazon S3 será utilizado para armazenamento 
de arquivos estáticos. Para gerenciar tarefas assíncronas, será utilizado o Amazon SQS, enquanto o Amazon ElastiCache garantirá 
o cache das consultas frequentemente acessadas. Para autenticação e autorização, o Amazon Cognito será integrado com o API Gateway 
para garantir que apenas usuários autenticados possam acessar os recursos da API.

## Observabilidade

Para monitorar o desempenho e o comportamento das APIs, serão utilizadas ferramentas como o Amazon CloudWatch e como uma maneira mais simples
de monitorar adicionei o winston para criação de logs e um health check.

## Adicionais

Adicionei o docker-compose para facilitar o desenvolvimento e o deploy.
Para validações nas rotas utilizei o class-validator.

Para documentação adicionei o Swagger, caso queira acessar o endpoint /api.
Para o Health check apenas acessar o endpoint /health.

Também adicionei testes unitários para a feature implementada.

Faltou apenas implementar o frontend e mensageria. Tive alguns problemas de saúde onde precisei ir algumas vezes no hospital por isso, 
acabou não dando tempo de fazer os dois.

Fiz os comentários abaixos em inglês afim de seguir o padrão de desenvolvimento em inglês, portanto nem ali nem no código haverá inglês.

## Enviroment
Create .env file and add the following variables

```bash
# database (example)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
```

## Run With Docker (Other steps are not necessary if running this one)
```bash
# run docker-compose
$ docker-compose up --build

# run migration
$ yarn db:migrate

```

## Project setup

```bash
# install dependencies
$ yarn
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run Migrations

```bash
# Generate migrations
$ yarn db:generate

# Run migrations
$ yarn db:migrate

# Drop database
$ yarn db:drop
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
