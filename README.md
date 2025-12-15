# 🤖 AI Chatbot para Clínicas | AI Clinic Chatbot

Um chatbot inteligente para clínicas que automatiza marcações de consultas, responde perguntas e envia confirmações por email. **100% GRATUITO** usando Groq AI ou OpenRouter.

![Next.js](https://img.shields.io/badge/Next.js-15.1.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Funcionalidades

- 🤖 **Chatbot AI Inteligente** - Respostas naturais usando AI gratuita (Groq/OpenRouter)
- 📅 **Marcações Automáticas** - Sistema completo de agendamento com formulário
- 📧 **Emails Automáticos** - Confirmações para pacientes e notificações para a clínica
- 👨‍💼 **Painel Admin** - Gestão de marcações com filtros e exportação CSV
- 🌍 **Bilíngue** - Suporte para Português e Inglês
- 📱 **100% Responsivo** - Funciona perfeitamente em mobile e desktop
- 🎨 **UI Moderna** - Design limpo e profissional com Tailwind CSS
- 🔒 **Segurança Médica** - Nunca fornece diagnósticos, apenas informações

## 🚀 Demo Rápida

1. **Chat AI** - Converse com o assistente virtual em `/chat`
2. **Marcar Consulta** - Preencha o formulário diretamente no chat
3. **Receber Email** - Confirmação automática enviada ao paciente
4. **Admin Dashboard** - Gerir marcações em `/admin` (password: `clinic2024`)

## 💰 100% GRATUITO

Este projeto usa serviços completamente GRATUITOS:

- ✅ **OpenRouter AI** - Modelo `mistralai/devstral-2512:free` (sem limites!)
- ✅ **MongoDB Atlas** - 512MB gratuitos
- ✅ **Resend** - 100 emails/dia gratuitos
- ✅ **Vercel** - Hosting gratuito

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta MongoDB Atlas (gratuita)
- Conta Resend (gratuita)
- Conta OpenRouter ou Groq (gratuita)

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/ai-clinic-chatbot.git
cd ai-clinic-chatbot
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# MongoDB Atlas (Database)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clinic

# OpenRouter AI (100% Gratuito)
OPENROUTER_API_KEY=sk-or-v1-...

# Resend (Email Service)
RESEND_API_KEY=re_...

# Admin Password
ADMIN_PASSWORD=clinic2024
```

### 4. Execute em desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🔑 Como Obter as API Keys (TUDO GRÁTIS!)

### 1. MongoDB Atlas (Database)

1. Acesse [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Crie uma conta gratuita
3. Crie um cluster (selecione **M0 FREE** - 512MB)
4. Clique em **"Connect"** > **"Connect your application"**
5. Copie a connection string
6. Substitua `<password>` pela sua senha
7. Cole em `MONGODB_URI` no arquivo `.env`

**Exemplo:**
```
MONGODB_URI=mongodb+srv://user:senha123@cluster0.abc.mongodb.net/clinic
```

### 2. OpenRouter (AI - 100% GRATUITO)

1. Acesse [openrouter.ai](https://openrouter.ai/)
2. Clique em **"Sign In"** (pode usar Google/Discord)
3. Vá para [openrouter.ai/keys](https://openrouter.ai/keys)
4. Clique em **"Create Key"**
5. Dê um nome (ex: "Clinic Chatbot")
6. Copie a key (começa com `sk-or-v1-...`)
7. Cole em `OPENROUTER_API_KEY` no arquivo `.env`

**Modelo usado:** `mistralai/devstral-2512:free` - 100% gratuito, sem limites de uso!

### 3. Resend (Email Service)

1. Acesse [resend.com/signup](https://resend.com/signup)
2. Crie uma conta gratuita
3. Vá para [resend.com/api-keys](https://resend.com/api-keys)
4. Clique em **"Create API Key"**
5. Copie a key (começa com `re_...`)
6. Cole em `RESEND_API_KEY` no arquivo `.env`

**Plano gratuito:** 100 emails/dia, suficiente para testes e pequenas clínicas!

**Nota:** No plano gratuito, emails são enviados de `onboarding@resend.dev`. Para domínio próprio, verifique seu domínio no dashboard do Resend.

## 📁 Estrutura do Projeto

```
ai-clinic-chatbot/
├── app/
│   ├── page.tsx              # Homepage com demo
│   ├── chat/
│   │   └── page.tsx          # Página de chat full-screen
│   ├── admin/
│   │   └── page.tsx          # Dashboard admin
│   └── api/
│       ├── chat/route.ts     # Endpoint do chatbot AI
│       └── leads/route.ts    # CRUD de marcações
│
├── components/
│   ├── BookingFlow.tsx       # Formulário de marcação
│   ├── MessageBubble.tsx     # Mensagens do chat
│   └── ChatWidget.tsx        # Widget (não usado)
│
├── lib/
│   ├── groq.ts              # Cliente OpenRouter/Groq
│   ├── email.ts             # Serviço de emails (Resend)
│   ├── mongodb.ts           # Conexão MongoDB
│   ├── knowledge-base.ts    # Informações da clínica
│   └── booking-logic.ts     # Validações
│
├── models/
│   └── Lead.ts              # Tipos TypeScript
│
└── .env                     # Variáveis de ambiente (criar)
```

## 🎨 Personalização

### 1. Dados da Clínica

Edite [lib/knowledge-base.ts](lib/knowledge-base.ts):

```typescript
export function getClinicData() {
  return {
    name: "Sua Clínica Médica",
    location: "Lisboa, Portugal",
    hours: {
      weekday: "9h-18h",
      saturday: "9h-13h",
      sunday: "Fechado"
    },
    services: [
      {
        name: "Consulta de Medicina Geral",
        price: "€50",
        duration: "30 minutos"
      },
      // Adicione mais serviços...
    ],
    contact: {
      phone: "+351 912 345 678",
      email: "contato@suaclinica.pt",
      address: "Rua Principal, 123, Lisboa"
    }
  };
}
```

### 2. Cores do Tema

Edite [tailwind.config.ts](tailwind.config.ts):

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#e6f7f7',
        100: '#ccefef',
        // ...
        600: '#00a0a0',  // Cor principal
        700: '#008080',
      },
      secondary: {
        // Cores secundárias
      }
    }
  }
}
```

### 3. Email de Destino

Edite [lib/email.ts](lib/email.ts) linha 71:

```typescript
// Mudar o email que recebe as notificações
to: ['seu-email@exemplo.com'],
```

### 4. Password do Admin

No arquivo `.env`:

```env
ADMIN_PASSWORD=sua_senha_segura
```

## 🚀 Deploy na Vercel

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em **"New Project"**
4. Importe seu repositório
5. Adicione as variáveis de ambiente:
   - `MONGODB_URI`
   - `OPENROUTER_API_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_PASSWORD`
6. Clique em **"Deploy"**

Seu chatbot estará online em `https://seu-projeto.vercel.app` 🎉

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU-USUARIO/ai-clinic-chatbot)

## 📊 Rotas Disponíveis

| Rota | Descrição |
|------|-----------|
| `/` | Homepage com demonstração |
| `/chat` | Interface de chat full-screen |
| `/admin` | Dashboard administrativo (requer password) |
| `/api/chat` | Endpoint do chatbot AI |
| `/api/leads` | API de marcações (GET, POST, PATCH) |

## 🔒 Funcionalidades de Segurança

- ✅ Validação de telefones portugueses (+351)
- ✅ Validação de emails
- ✅ Validação de nomes completos
- ✅ Proteção do admin com password
- ✅ Sanitização de dados MongoDB
- ✅ AI nunca fornece diagnósticos médicos
- ✅ Rate limiting recomendado para produção

## 🌍 Suporte Multi-idioma

O chatbot suporta automaticamente:
- 🇵🇹 **Português** (padrão)
- 🇬🇧 **Inglês**

Troca de idioma no canto superior direito.

## 💡 Tecnologias Utilizadas

- **Next.js 15** - Framework React moderno
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **MongoDB Atlas** - Database NoSQL
- **OpenRouter** - AI API gratuita
- **Resend** - Serviço de email
- **Lucide Icons** - Ícones modernos

## 🤝 Como Contribuir

1. Faça fork do projeto
2. Crie uma branch: `git checkout -b feature/MinhaFeature`
3. Commit: `git commit -m 'Adiciona MinhaFeature'`
4. Push: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

## 📞 Suporte

Problemas ou dúvidas?

- 📖 Leia a documentação
- 🐛 Abra uma [Issue](https://github.com/SEU-USUARIO/ai-clinic-chatbot/issues)
- 💬 Consulte:
  - [OpenRouter Docs](https://openrouter.ai/docs)
  - [Resend Docs](https://resend.com/docs)
  - [MongoDB Docs](https://www.mongodb.com/docs/atlas/)

## 🎯 Roadmap (Futuras Features)

- [ ] Integração com Google Calendar
- [ ] Notificações por SMS (Twilio)
- [ ] Analytics dashboard avançado
- [ ] Multi-clínicas (multi-tenancy)
- [ ] Exportação para PDF
- [ ] Webhooks para integrações
- [ ] App mobile (React Native)
- [ ] Voice chat (Speech-to-Text)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Você pode usar este projeto livremente para:
- ✅ Projetos pessoais
- ✅ Projetos comerciais
- ✅ Modificar e distribuir
- ✅ Incluir no seu portfólio

## 👨‍💻 Autor

**Rodinei Silva**

- 🌐 Portfolio: [seu-portfolio.com](#)
- 💼 LinkedIn: [[Rodinei Silva]](https://www.linkedin.com/in/rodinei-silva-979441276/)
- 📧 Email: [rodineisilva34@gmail.com](#)
- 🐙 GitHub: [rds-player]([https://github.com/seu-usuario](https://github.com/rds-player))

---

⭐ **Se este projeto foi útil, deixe uma estrela no GitHub!**

💬 **Experimente o chatbot ao vivo:** [Demo Online](#)

🚀 **Pronto para usar em produção!**
