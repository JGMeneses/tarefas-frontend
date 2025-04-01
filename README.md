# Frontend - Gerenciador de Tarefas

Este é o frontend da aplicação **Gerenciador de Tarefas**, desenvolvido utilizando **Angular 19.2.5**. O sistema permite a criação, atualização, remoção e listagem de tarefas. Ele se comunica com o backend, que deve estar rodando para que a aplicação funcione corretamente.

## Tecnologias Utilizadas

- **Frontend:** Angular 19.2.5
- **Backend:** Java 21 e Spring Boot 3 (com Docker)
- **Autenticação:** JWT (JSON Web Token)
- **Estilos:** CSS/SCSS

---

## Como Rodar o Projeto Frontend

### 1. Configuração do Backend

Antes de rodar o frontend, **garanta que o backend esteja em execução**. Para isso, siga os passos abaixo no README do backend:

1. **Configuração do banco de dados e backend com Docker**
   - Defina as variáveis de ambiente necessárias.
   - Suba o backend com Docker Compose utilizando o comando:
     ```bash
     docker-compose up --build
     ```
   - O backend estará disponível em [http://localhost:8081](http://localhost:8081/).

2. **Verifique a documentação da API no Swagger:**
   - [http://localhost:8081/swagger-ui/index.html#/](http://localhost:8081/swagger-ui/index.html#/)

---

### 2. Rodar o Frontend

1. **Instale o Node.js** (recomenda-se a versão LTS mais recente).

2. **Instale as dependências do projeto Angular:**

   Navegue até o diretório do projeto frontend e instale as dependências com:

   ```bash
   npm install

3. Inicie o servidor de desenvolvimento:
   ```bash 
    ng serve
4. Acesse a aplicação no navegador:

Abra o navegador e acesse o frontend em http://localhost:4200.


## Funcionalidades Implementadas
A aplicação permite que o usuário execute as seguintes operações:

Criar uma tarefa com título, descrição, responsável, prioridade e deadline.

Atualizar uma tarefa.

Remover uma tarefa.

Listar as tarefas existentes.

Estrutura do Projeto
📂 Frontend

    📁 src/app/auth → Módulo de autenticação (login).

    📁 src/app/core → Funcionalidades essenciais e compartilhadas.

      📁 guards → Proteção de rotas (guarda de acesso).

      📁 interceptors → Interceptação de requisições HTTP.

      📁 services → Serviços utilizados por toda a aplicação.

    📁 src/app/shared → Componentes e recursos compartilhados.

      📁 DTO → Objetos de Transferência de Dados.

      📁 models → Modelos de dados.

📁 src/app/tasks → Módulo principal para gerenciamento de tarefas.

    📁 components → Componentes reutilizáveis, como rodapé e cabeçalho.

    📁 footer → Rodapé da aplicação.

    📁 header → Cabeçalho da aplicação.

    📁 pages → Páginas para listagem, criação, edição e remoção de tarefas.

Contato
Caso tenha alguma dúvida ou sugestão, fique à vontade para entrar em contato!

🚀 Projeto desenvolvido por João Meneses.
