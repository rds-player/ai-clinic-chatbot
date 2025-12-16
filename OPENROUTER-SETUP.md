# 🔑 Como Obter Chave OpenRouter (2 minutos)

## ✅ Por que OpenRouter?

- **Funciona globalmente** (sem bloqueios regionais)
- **100% GRÁTIS** (modelos gratuitos disponíveis)
- **Sem cartão de crédito** necessário
- **Mais fácil** de configurar que Groq

---

## 📝 Passo a Passo (SUPER SIMPLES)

### 1. Acesse OpenRouter

Vá para: **https://openrouter.ai/keys**

### 2. Faça Login

Escolha uma opção:
- Login com Google
- Login com Discord
- Login com email

### 3. Crie uma API Key

1. Clique no botão **"Create Key"**
2. Dê um nome: `Clinic Chatbot`
3. Deixe o limite em **"No limit"** (é grátis mesmo)
4. Clique **"Create"**

### 4. Copie a Chave

A chave vai aparecer no formato:
```
sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Copie essa chave!**

### 5. Cole no .env.local

Abra o arquivo `.env.local` e substitua:

```bash
OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui
```

### 6. Pronto! 🎉

```bash
npm run dev
```

O chatbot agora vai funcionar com IA gratuita!

---

## 🎯 Modelos Gratuitos Disponíveis

O código já está configurado para usar:
- **meta-llama/llama-3.1-8b-instruct:free**

Outros modelos grátis que você pode testar:
- `google/gemma-2-9b-it:free`
- `mistralai/mistral-7b-instruct:free`
- `meta-llama/llama-3-8b-instruct:free`

Para mudar o modelo, edite `lib/groq.ts` linha 19.

---

## 🆚 OpenRouter vs Groq

| Feature | OpenRouter | Groq |
|---------|-----------|------|
| Acesso Global | ✅ Sim | ❌ Bloqueado em algumas regiões |
| Grátis | ✅ Sim | ✅ Sim |
| Velocidade | ⚡ Rápido | ⚡⚡ Muito Rápido |
| Modelos | 🎯 Muitos | 🎯 Poucos |
| Setup | 😊 Fácil | 😐 Médio |

**Recomendação:** Use OpenRouter se Groq estiver bloqueado na sua região.

---

## 🔧 Teste Rápido

Depois de adicionar a chave:

1. Inicie o servidor: `npm run dev`
2. Abra http://localhost:3000
3. Clique no botão de chat
4. Digite: "Olá!"
5. O bot deve responder em segundos! ✅

---

## ❌ Problemas Comuns

### "API key inválida"
- Certifique-se que copiou a chave completa
- A chave deve começar com `sk-or-v1-`
- Reinicie o servidor após adicionar a chave

### "Rate limit"
- Modelos gratuitos têm limite de requisições
- Espere 1 minuto e tente novamente
- Ou crie outra conta

### Ainda não funciona?
- Verifique se o arquivo `.env.local` está na raiz do projeto
- Verifique se não há espaços antes/depois da chave
- Tente usar outro navegador

---

## 💡 Dica Extra

Se quiser **ainda mais velocidade**, você pode:
1. Criar uma conta no OpenRouter
2. Adicionar $5 de crédito
3. Usar modelos pagos (mais rápidos)

Mas o modelo gratuito já é **excelente** para uma clínica!

---

## 🎓 Resumo

1. Acesse https://openrouter.ai/keys
2. Faça login (Google/Discord/Email)
3. Clique "Create Key"
4. Copie a chave
5. Cole no `.env.local`
6. `npm run dev`
7. **Funciona!** 🚀

---

**Tempo total: 2 minutos ⏱️**

**Custo: €0 💰**

**Dificuldade: Muito Fácil 😊**
