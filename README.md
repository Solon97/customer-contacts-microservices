# customer-contacts-microservices

## Como o sistema foi pensado ?
Foi desenvolvido um monorepo de uma API de contatos e duas APIs de clientes. As APIs dos clientes podem ser integradas com a contacts-api e esses contatos serão salvos no banco de dados do cliente em que o usuário da contacts-api estiver autenticado. A ideia foi criar uma api (contacts-api) que centralizaria a integração com as APIs dos Clientes (Atuais e futuros). Para simular as integrações, criei duas APIs de um Armazém (Warehouse) e uma Farmácia (Pharmacy), que seriam APIs externas que teriam suas próprias formas de autenticação e seus próprios bancos de dados.

## Tecnologias usadas
* Node.js com o Framework Nestjs
* Autenticação JWT  
* Prisma ORM
* Docker
* PostgreSQL / MySQL
## Como rodar o projeto ?

* Copiar o .env.example para .env

```bash
docker compose up
```