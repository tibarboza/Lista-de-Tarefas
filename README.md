Esta é uma aplicação full-stack de tarefas construída com tecnologias modernas, apresentando um frontend em Next.js e um backend em Go.

## Stack

### Frontend
- **Framework**: Next.js com TypeScript
- **Gerenciamento de Estado**: Redux Toolkit
- **Estilização**: Tailwind CSS
- **Componentes UI**: 
  - Primitivos do Radix UI
  - Componentes do Shadcn/ui
- **Manipulação de Formulários**: React Hook Form com validação Zod
- **Animações**: Framer Motion
- **Manipulação de Datas**: date-fns
- **Cliente HTTP**: Axios
- **Notificações**: React Toastify

### Backend
- **Linguagem**: Go
- **Framework Web**: Gin
- **Banco de Dados**: SQL (PostgreSQL)
- **Arquitetura**: Clean Architecture
  - Controladores
  - Casos de Uso
  - Repositórios
  - Modelos

## Funcionalidades

- Operações CRUD para tarefas
- Gerenciamento de status (Pendente, Em Andamento, Concluído)
- Filtragem de tarefas por:
  - Status
  - Título
  - Intervalo de datas
- Design responsivo com navegação lateral
- Validação de formulários
- Componentes UI animados
- Notificações toast para feedback do usuário
- Formatação e localização de datas (pt-BR)

## Estrutura do Projeto

### Frontend (todolist)
```
src/
├── app/
│   ├── store/            # Configuração da store Redux
│   ├── hooks/            # Hooks personalizados
│   └── todolist/         # Funcionalidades de tarefas
├── components/
│   ├── ui/              # Componentes UI reutilizáveis
│   ├── todo/            # Componentes específicos de tarefas
│   └── form/            # Componentes de formulário
└── lib/                 # Funções utilitárias
```

### Backend (api)
```
├── cmd/                 # Ponto de entrada da aplicação
├── controller/          # Manipuladores HTTP
├── model/              # Modelos de dados
├── repository/         # Operações de banco de dados
└── usecase/            # Lógica de negócios
```

## Como Começar

### Frontend
1. Navegue até o diretório todolist
2. Instale as dependências:
```bash
npm install
```
3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```
4. Abra [http://localhost:3000](http://localhost:3000)

### Backend
1. Navegue até o diretório api
2. Certifique-se de ter o Go instalado
3. Instale as dependências:
```bash
go mod tidy
```
4. Configure sua conexão com o banco de dados
5. Execute o servidor:
```bash
go run cmd/main.go
```
A API estará disponível em [http://localhost:8000](http://localhost:8000)

## Endpoints da API

- `GET /todos/:status` - Obter tarefas por status
- `POST /todo` - Criar uma nova tarefa
- `PUT /todo` - Atualizar uma tarefa
- `DELETE /todo/:id` - Excluir uma tarefa
