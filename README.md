
# Desafio Software Engineer, Back-end - Pagar.me

**Summary**

- [Features](#features)
- [Arquitetura do projeto](#arquitetura-do-projeto)
- [Configurando o ambiente](#configurando-o-ambiente)
- [Testando via Swagger](#testando-via-swagger)

## Features

<dl>
  <dt>Estrutura Multilayer folder</dt>
  <dd>
    A <a href="https://vaadin.com/learn/tutorials/ddd/ddd_and_hexagonal/">[link]organização do código</a> foi inspirada na arquitetura <a href="https://vaadin.com/learn/tutorials/ddd/ddd_and_hexagonal/">DDD</a> e <a href="https://medium.com/better-programming/node-clean-architecture-deep-dive-ab68e523554b">Clean Architecture</a>, focando na escalabilidade.
  </dd>

  <dt>Pronto para produção</dt>
  <dd>
    Setup com PM2 em modo cluster (tema da minha palestra aí na pagarme hehe) e com as variavéis necessárias para o [link]app está pronto para ser escalado. Também foi provisionado na nuvem, daí testei três cenários: 

  - `EC2`: Com docker-compose --> escalabilidade vertical; 

  - `AWS Lambda` Com <a href="https://serverless.com/">Serverless</a> para rápida configuração --> escalabilidade horizontal 

  - `K8s`: Com <a href="https://aws.amazon.com/pt/eks/">EKS</a> --> escalabilidade tanto vertical como horizontal (não que EC2 e serverless não sejam, mas não é o    foco). Local foi testado com <a href="https://github.com/kubernetes/minikube">Minikube</a>, que a menos de configuração, é a mesma coisa do EKS, só mudando o     apontamento do console. 

  Como não sei quando o desafio será avaliado, não vou disponibilizar os links agora, porque não é barato (principalmente o k8s). Mas quando for testar me avisa ou avisa pra Dani (que é suuuper atenciosa) que provisiono (o endpoint pro swagger) qualquer um dos três.
  </dd>

  <dt>ORM e puro SQL para integração com o banco de dados</dt>
  <dd>
    Como ORM foi usado o <a href="https://www.npmjs.com/package/sequelize">Sequelize</a>. Foi ponderado o <a href="https://www.npmjs.com/package/slonik">Slonik</a> também, mas no final, não o escolhi. Para as queries mais complexas, como as que envolviam <a href="https://www.npmjs.com/package/sequelize">[link]transaction</a>, não foi usado ORM, para ganhar performance! Pois foi visto que em algumas queries era redundante, as que não eram, foi usado ORM.
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

  <dt>CLI integration</dt>
  <dd>
    Sequelize é uma mão na roda nesse contexto. migrações e seeders são feitos quase que sem nenhum overhead. Falarei mais sobre como usar-los mais na frente.
  </dd>

  <dt>Linter</dt>
  <dd>
    Para code styling foi usado o eslint.
  </dd>
</dl>

## Arquitetura do projeto

## Configurando o ambiente

### Comandos de inicialização

Para iniciar a aplicação basta executar o comando: `yarn start` ou `npm run start`mas existe alguns comandos que podem lhe ajudar a realizar tarefas especificas como testes com a sua respectiva cobertura, cobertura dos testes e build da aplicação Uma lista completa sobre os comandos de inicialização pode ser vista abaixo:

Comandos  | Tarefa a ser realizada
------------- | -------------
`yarn start` | Inicializa o serviço em ambiente de desenvolvimento, com o modo live reload funcionando. O que facilita na atualização de componentes alterados em desenvolvimento
`yarn test` | Realiza todos os testes relacionados aos arquivos alterados
`yarn test:coverage`  | Realiza todos os testes e mostra os arquivos cobridos pelo teste
`yarn lint`  | Executa o ESLint nos arquivos da aplicação
`yarn build`  | Realiza o build da aplicação para execução em produção

## Testando via Swagger
