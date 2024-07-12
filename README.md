<h2>STARKBANK BAAS</h2>

<h3>Motivação </h3>

Essa aplicação usa como base o padrão de arquitetura de Microkernel e o paradigma funcional. A ideia foi segregar o domínio da aplicação das extensões (plugins) que ampliam os recursos do sistema principal (Microkernel). Interfaces não foram utilizadas, mas esse tipo de abordagem sugere definir contratos entre o domínio e as suas extensões. O objetivo é promover modularidade, flexibilidade e extensibilidade.

#

<h3>Instruções para executar o projeto </h3>

#

<h4>Executando o projeto (via Docker) </h4>

- **dependências:** docker e docker-compose

- crie o arquivo **.env** conforme o arquivo **.env.sample** na raiz do projeto

- execute o comando abaixo para subir a aplicação

```zsh
  docker-compose up -d --build
```

#

<h4>Executando o projeto (no seu ambiente local)</h4>

Este projeto sugere o uso do **volta** como gerenciador de ferramentas de linha de comando JavaScript.

segue guia de instalação:
[volta-docs](https://docs.volta.sh/guide/getting-started)

Instale a versão fixada no arquivo **package.json**

```zsh
  volta install node@[version]
```

verificando a instalação

```zsh
  volta list
```

_atenção: todos os comandos a seguir devem ser executados na raiz do projeto._

#

Instale as dependências da aplicação

```zsh
  npm install
```

_nota: você vai precisar de uma instância do **PostgreSQL** rodando em sua máquina (é recomendável a versão 16)._

crie o arquivo **.env** conforme o arquivo **.env.sample** na raiz do projeto

Execute as migrações do banco de dados

```zsh
  npm run migrations
```

Em seguida basta executar o comando abaixo para subir a aplicação

```zsh
  npm run dev:watch
```

#

<h3>Testes unitários</h3>

Execute o comando a seguir para rodar os testes

```zsh
  $ npm run test
```

_A prioridade foi testar as funções puras. Mas testes de integração deveriam ser implementados para uma maior cobertura e confiabilidade_

#

<h3>Informações complementares</h3>

Apesar de não ser um requisito, foi adicionado uma camada de persistência para realizar a conciciliação do ciclo de vida das faturas. Toda vez que temos um evento de fatura elegível para transferência de crédito, o status é atualizado na base da aplicação.

**_importante:_** não foi possível salvar os dados de transferência de crédito para posterior conciliação, uma falha é reportada pela API do starkbank (SDK Node.js) ao tentar criar as transferências. Um log de erro é gerado para ajudar na depuração.

Na raiz do projeto você vai encontrar um arquivo chamado **_starkbank-baas.postman.json_**. Basta importá-lo no Postman para obter as informações das rotas e realizar os testes funcionais. As rotas usam uma abordagem de "feature-toggle", para ligar ou desligar uma rotina.
