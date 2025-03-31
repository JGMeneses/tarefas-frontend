# TarefasFrontend

Este é um sistema desenvolvido em **Angular** para gerenciamento de tarefas (**Tasks**), que permite realizar o **CRUD completo** de tarefas, com separação por **squads**. No momento do cadastro, o usuário informa qual é seu **cargo** e a qual **squad (time)** pertence.

O backend foi desenvolvido em **Java Spring Boot** e está **dockerizado**, sendo necessário rodá-lo antes de iniciar o frontend.

## Tecnologias Utilizadas

- **Frontend:** Angular 19.2.5
- **Backend:** Java 21  & Spring Boot
- **Banco de Dados:** PostgreSQL (Docker)
- **Gerenciador de Pacotes:** npm

---

## Como Rodar o Projeto

### 1. Configurar e Rodar o Backend (Spring Boot)

1. Certifique-se de ter o **Docker** e o **Docker Compose** instalados.
2. No terminal, navegue até o diretório do backend:

   ```bash
   cd caminho/do/backend
   ```
3. Execute o seguinte comando para subir o backend e o banco de dados:

   ```bash
   docker-compose up -d
   ```
4. O backend estará rodando em `http://localhost:8081/`

---

### 2. Rodar o Frontend (Angular)

1. Certifique-se de ter o **Node.js** instalado (recomenda-se a versão LTS mais recente).
2. Instale as dependências do projeto Angular:

   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:

   ```bash
   ng serve
   ```
4. Acesse o frontend no navegador em `http://localhost:4200/`.

---

## Scripts Úteis

### Criar um Novo Componente

```bash
ng generate component nome-do-componente
```

### Criar um Novo Serviço

```bash
ng generate service nome-do-servico
```

### Rodar Testes Unitários

```bash
ng test
```

### Criar Build para Produção

```bash
ng build --configuration production
```

---

## Estrutura do Projeto

📂 **TarefasFrontend**
- 📁 src/app/auth → Módulo de autenticação
- 📁 src/app/core → Contém funcionalidades essenciais do projeto
  - 📁 guards → Guards para proteger rotas
  - 📁 interceptors → Interceptores para manipulação de requisições HTTP
  - 📁 services → Serviços essenciais compartilhados
- 📁 src/app/shared → Recursos compartilhados entre os módulos
  - 📁 DTO → Objetos de transferência de dados
  - 📁 models → Modelos de dados
- 📁 src/app/tasks → Módulo principal do sistema
  - 📁 components → Componentes específicos de tarefas
    - 📁 footer → Rodapé do sistema
    - 📁 header → Cabeçalho do sistema
  - 📁 pages → Páginas do sistema
- 📁 src/environments → Configurações de ambiente (dev e prod)

---

## Contato

Caso tenha alguma dúvida ou sugestão, fique à vontade para entrar em contato!

🚀 **Projeto desenvolvido por João Meneses**.

