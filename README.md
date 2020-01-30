
# Desafio Software Engineer, Back-end - Pagar.me

**Summary**

- [Features](#features)
- [Princípios básicos](#princípios-básicos)
- [Arquitetura do projeto](#arquitetura-do-projeto)
- [Configurando e subindo a aplicação](#configurando-e-subindo-a-aplicação)
- [Testando via Swagger](#testando-via-swagger)

## Features

<dl>
  <dt>Estrutura Multilayer folder</dt>
  <dd>
    A <a href="https://i.ibb.co/bgDvr6q/Screenshot-from-2020-01-29-21-58-25.png">organização do código</a> foi inspirada por <a href="https://vaadin.com/learn/tutorials/ddd/ddd_and_hexagonal/">DDD</a> e <a href="https://medium.com/better-programming/node-clean-architecture-deep-dive-ab68e523554b">Clean Architecture</a>, focado na escalabilidade do codebase.
  </dd>

  <dt>Pronto para produção</dt>
  <dd>
    Setup com PM2 em modo cluster (tema da minha palestra aí na pagar.me rs..) e com as <a href="https://github.com/gustavooliveiraf/psp-api/blob/master/ecosystem.config.js">variavéis</a> necessárias para o app está pronto para ser escalado. Para, por exemplo, um projeto simples já estaria mais que suficiente. Mas no mundo real, os problemas com escalabilidade são reais (Black Friday que o diga). Assim, o sistema também foi provisionado na nuvem, daí testei três cenários: 

  - `EC2` com docker-compose --> escalabilidade vertical; 

  - `AWS Lambda` com <a href="https://serverless.com/">Serverless</a> --> escalabilidade horizontal 

  - `K8s` com EKS --> escalabilidade tanto vertical como horizontal (não que não dê para escalar EC2 e serverless assim, mas não é o foco). Local foi testado com <a href="https://github.com/kubernetes/minikube">Minikube</a>. 

  Como não sei quando o desafio será avaliado, não vou disponibilizar os links agora, porque não é barato (principalmente o EKS). Mas quando for testar me avisa ou avisa pra Dani (que é suuper atenciosa) que provisiono (o endpoint pro swagger) qualquer um dos três.
  </dd>

  <dt>ORM e puro SQL para integração com o banco de dados</dt>
  <dd>
    Como ORM foi usado o <a href="https://www.npmjs.com/package/sequelize">Sequelize</a>. Foi ponderado o <a href="https://www.npmjs.com/package/slonik">Slonik</a> também, mas no final, não o escolhi. Para as queries mais complexas, como as que envolviam <a href="https://en.wikipedia.org/wiki/Database_transaction">transaction</a>, não foi usado ORM, para ganhar performance! Pois foi visto que em algumas queries era redundante, as que não eram, foi usado ORM.
  </dd>

  <dt>Preparado para testes</dt>
  <dd>
    Foi usado jest como framework para realizar essa tarefa. Tanto para os unitários como para os de integração e end to end. Até a feature de capture (na qual um cliente pode pedir autorização mas não capturar naquele momento, pegando o id da transação e capturando depois) os testes estavam com 100% de cobertura. Mas depois dessa feature, que foi gigante, os testes caíram por volta dos 90% (mais na frente falarei como rodar os testes e como gerar cobertura).
  </dd>

  <dt>Injeção de depêndencia</dt>
  <dd>
    Existem várias lib que proveem suporte para injeção de depêndencia (eu particulamente gosto da awilix). Mas como o desafio era relativamente simples, e para melhorar a compreensão, não usei nenhuma. Esse conceito facilita bastante os testes. Também vale salientar que a camada "Domain" é 100% agnóstica a tecnologia,
    todos requires dessa camada não podem envolver tecnologia.
  </dd>

  <dt>Logger</dt>
  <dd>
    Inicialmente estava pensando em fazer o sistema de logger com a elastic stack. Mas não sei se estava dentro do escopo do desafio. De qualquer forma, mantive a arquitetura, pra integrar com algum sistema de logger só precisa passar o callback (atualmente estou passando o callback console.log mesmo, só para efeitos de testes).
    Quando o request passa pelo middleware inicial de logger, é gerado um uuid e esse mesmo uuid se permeia para todo o request. Assim, dando algum bug o cliente pode pegar esse uuid, fazer uma busca na interface do sistema de log e fazer o trace do request dentro do projeto para entender o que aconteceu.
  </dd>

  <dt>CLI integration</dt>
  <dd>
    Sequelize é uma mão na roda nesse contexto. migrações e seeders são feitos quase que sem nenhum overhead. Falarei sobre como usar-los mais na frente.
  </dd>

  <dt>Linter</dt>
  <dd>
    Para code styling foi usado o eslint.
  </dd>
</dl>

## Princípios básicos
A API é RESTful, e todas suas respostas são em JSON, no endpoint base:
```
http://localhost:3000/1/
```
A seguir, algumas convenções de nossa API:
### Paginação
Há muitas rotas de listagem de entidades na API. Em todas elas é necessário lidar com um sistema de paginação para percorrer todas as instâncias. Esse sistema refere-se aos parâmetros count e page. Count representa quantos resultados por página deverão ser retornados — se não for informado um valor, o padrão é 10, e seu limite é 1000. Page é a página a ser retornada e se não for informado um valor, o padrão é 1.

### Autenticação
Deve passar como forma de autenticação a API Key, chave que pode ser encontrada quando realizar o login ou criar uma conta. 
A API Key pode ser informada de quatro forma diferentes:  
1 - No corpo da requisição como valor do parâmetro api_key  
2 - Na url (query param) como valor do parâmetro api_key  
3 - No header como valor do parâmetro api_key  
4 - Basic Auth com username igual à chave e senha igual a api_key  

### Versionamento
Deve ser passado no header o versionamento da api, com key X-PagarMe-Version e value [v1, ...].

### Ambientes de teste e produção
Para transacionar você tem acesso a duas Chaves de API distintas, uma para teste e outra para produção. Dessa forma, o endpoint é o mesmo, sendo possível diferenciar o ambiente apenas escolhendo a chave apropriada para o tipo de operação que você deseja fazer.

## Arquitetura
### Banco de dados
Foi usado Posgres, com duas instâncias para produção e duas instâncias para testes locais (no código chamei-as de jest, para não confundir com a instância de testes em produção). Existia também a possibilidade de usar um banco só, colocando as 4 chaves (ak_test, ak_prod, ek_test, ek_prod) numa mesma tabela. Mas por questões de performances, escolhi a primeira, com bancos de dados separados.

### Middlewares
Existem <a href="https://github.com/gustavooliveiraf/psp-api/tree/master/src/web/middlewares">vários middlewares</a> para de fato chegar no controlador do endpoint. Vou explicar os <a href="https://github.com/gustavooliveiraf/psp-api/blob/master/src/web/routes/index.js">principais</a>, em ordem de acesso:

Middlewares  | Responsabilidade
------------- | -------------
`responseHandler` | Faz um wraper dos tipos de erros
`setInfraVersion` | Seta a versão da infraestrutura. é o primeiro parâmetro da url. o default é 1. ex: url/1/transaction
`setApiVersion` | Seta a versão da api que é passada no header com key X-PagarMe-Version
`setKeyAndEnvironment`  | Seta a chave que o usuário usou e de acordo com a chave se é o ambiente de testes ou de prod.
`auth`  | Pega a chave do usuário do middleware anterior e faz um find no banco para descobrir se existe tal chave e para setar o id do usuário. Note que também poderia ser usada a key do usuário nas queries, mas usando o id performa mais.

## Configurando o ambiente e subindo a aplicação
O .env foi commitado para facilitar os testes.  
Para levantar o ambiente, basta ter o docker-compose instalado, ir na raiz do projeto e rodar o comando:
```bash
$ docker-compose -f docker-compose.yml build && docker-compose -f docker-compose.yml up -d
```
Se tentar rodar o mesmo comando novamente, com o container do postgres ainda vivo, irá dar erro pois os bancos já estarão criados.  
para resolver isso temos duas possibilidades, ou roda:
```bash
$ docker-compose -f docker-compose.yml down && docker-compose -f docker-compose.yml build && docker-compose -f docker-compose.yml up -d
```
para derrubas os containers e subir novamente, ou roda:
```bash
$ docker run -p 35432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker postgres && npm install && npm start
```
para subir o container do postgres e rodar o projeto normalmente, sem container.  

Se ainda assim tiver problemas, me avisa que subo uma instância RDS e disponibilizo as variáveis para ser setada no .env

## Testando via Swagger
O acesso é através do endpoint htt://<ip_maquina>:3000/1/swagger

O primeiro passo é cadastrar um usuário para ter acesso a api_key. Em seguida, para transacionar entre os endpoints que não são de usuário, é preciso setar a api_key no <a href="https://i.ibb.co/Y749xHJ/Screenshot-from-2020-01-30-02-17-35.png">Authorize</a> do swagger.

Para exemplificar, segue o fluxo de criar uma transação com: capture = false, paymentMethod = debit_card e usuário tendo fundos no cartão (no mocker setei que cartões master não tem fundos para transações >= 50000, visa e o resto não tem para >= 100000):  

criando usuário e copiando ak_test_:  
![criando usuário](https://i.ibb.co/74X7Xvc/Screenshot-from-2020-01-30-03-38-30.png)   

setando ak_test_ no swagger:  
![criando usuário](https://i.ibb.co/1sGNRCk/Screenshot-from-2020-01-30-03-29-52.png)  

criando transação e copiando o id  
![criando usuário](https://i.ibb.co/W2XZjHj/Screenshot-from-2020-01-30-03-39-12.png)  

Fazendo uma pesquisa pelo id da transação (note que ainda não tem payable pois capture = false):  
![criando usuário](https://i.ibb.co/8YnvrKL/Screenshot-from-2020-01-30-03-39-37.png)  

Fazendo um capture (agora, se novamente fizer uma pesquisa pelo id da transação, terá um payable)  
![criando usuário](https://i.ibb.co/sbCtxM6/Screenshot-from-2020-01-30-03-40-06.png)  

Balance para status = paid  
![criando usuário](https://i.ibb.co/RpZMmcL/Screenshot-from-2020-01-30-03-43-22.png)  

Balance para status = waiting_funds  
![criando usuário](https://i.ibb.co/VvjXr7v/Screenshot-from-2020-01-30-03-43-12.png)  
