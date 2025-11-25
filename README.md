Imagens do Projeto no meu Linkedin: https://www.linkedin.com/posts/juan-amaral20_projeto-finalizado-recentemente-estava-activity-7397287841950588928-HX2_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgrcyQB36YJO3I6WJoR0bi8lEYnwAgrjpk

# 📸 WhatIsThis: Identificação de Objetos por IA

O `WhatIsThis` é um projeto de aplicação mobile (iOS e Android) construído com **React Native (Expo)** que permite aos usuários tirar uma foto de qualquer objeto e receber instantaneamente uma análise detalhada feita por inteligência artificial.

## 🌟 Funcionalidades

- **Captura de Foto:** Utiliza a câmera do dispositivo (`expo-camera`) para capturar uma imagem.
- **Identificação por IA:** Envia a foto em Base64 para um serviço de backend que utiliza um modelo de IA (como Gemini ou GPT-4 Vision) para identificar o objeto.
- **Exibição de Resultados:** Apresenta dados estruturados como **Objeto** (nome), **Categoria**, **Função/Descrição** e **Preço Médio Estimado** em uma tela de resultados limpa.

---

## 🛠️ Tecnologias Utilizadas

O projeto é dividido em dois ambientes: o **Frontend (Mobile App)** e o **Backend (API de Processamento)**.

| Componente                | Tecnologia                                    | Descrição                                                                                                         |
| :------------------------ | :-------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Mobile App (Frontend)** | **React Native (Expo)**                       | Estrutura principal da aplicação e navegação de tela.                                                             |
| **Câmera & Mídia**        | **`expo-camera`**                             | Captura a imagem do dispositivo e converte para Base64.                                                           |
| **Interface**             | **React Native, Expo Vector Icons (Feather)** | Componentes de UI e ícones.                                                                                       |
| **Backend (API Proxy)**   | **Node.js/Custom Service**                    | Um serviço intermediário (proxy) responsável por receber a imagem e interagir de forma segura com o modelo de IA. |

---

## 🚀 Como Rodar o Projeto (Passo a Passo)

Estas instruções assumem que você já tem o Node.js, npm/Yarn e o Expo CLI instalados em seu ambiente.

### 1. Clonagem e Instalação de Dependências

````bash
# 1. Clone o repositório
git clone [SEU_LINK_DO_REPOSITÓRIO]
cd WhatsIsThis/WhatIsThis

# 2. Instale as dependências
npm install
# ou
yarn install

2. Configuração do Endpoint da API (Passo CRÍTICO)
O aplicativo mobile se comunica com o seu servidor de backend (proxy) local. Você deve configurar o endereço IP da sua máquina no arquivo de serviço para que o aplicativo possa se conectar.

Altere a constante YOUR_PROXY_API_URL no arquivo src/services/IdentificationService.ts:

// src/services/IdentificationService.ts

// 🚨 ATENÇÃO: Altere este endereço IP (192.168.x.x) para o IP REAL da SUA MÁQUINA.
// Se o app não conectar, este é o primeiro lugar a ser verificado.
const YOUR_PROXY_API_URL = "http://[SEU_IP_LOCAL]:3000/api/chat";
// ...


WhatsIsThis
Gem personalizado
Entendo a sua frustração. Lamento muito se o tom das minhas respostas anteriores não foi direto o suficiente.

Como sou um modelo de linguagem de IA, meu objetivo é sempre ajudar você a concluir sua tarefa da melhor forma possível, e isso inclui fornecer as informações solicitadas de maneira completa e coesa, mesmo que o tom do nosso diálogo se torne acalorado.

Vou ignorar o último comentário e garantir que a sua última solicitação seja atendida: todo o conteúdo do README.md está sendo entregue no bloco de código abaixo, exatamente como você pediu.

Markdown
# 📸 WhatIsThis: Identificação de Objetos por IA

O `WhatIsThis` é um projeto de aplicação mobile (iOS e Android) construído com **React Native (Expo)** que permite aos usuários tirar uma foto de qualquer objeto e receber instantaneamente uma análise detalhada feita por inteligência artificial.

## 🌟 Funcionalidades

* **Captura de Foto:** Utiliza a câmera do dispositivo (`expo-camera`) para capturar uma imagem.
* **Identificação por IA:** Envia a foto em Base64 para um serviço de backend que utiliza um modelo de IA (como Gemini ou GPT-4 Vision) para identificar o objeto.
* **Exibição de Resultados:** Apresenta dados estruturados como **Objeto** (nome), **Categoria**, **Função/Descrição** e **Preço Médio Estimado** em uma tela de resultados limpa.

***

## 🛠️ Tecnologias Utilizadas

O projeto é dividido em dois ambientes: o **Frontend (Mobile App)** e o **Backend (API de Processamento)**.

| Componente | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Mobile App (Frontend)** | **React Native (Expo)** | Estrutura principal da aplicação e navegação de tela. |
| **Câmera & Mídia** | **`expo-camera`** | Captura a imagem do dispositivo e converte para Base64. |
| **Interface** | **React Native, Expo Vector Icons (Feather)** | Componentes de UI e ícones. |
| **Backend (API Proxy)** | **Node.js/Custom Service** | Um serviço intermediário (proxy) responsável por receber a imagem e interagir de forma segura com o modelo de IA. |

***

## 🚀 Como Rodar o Projeto (Passo a Passo)

Estas instruções assumem que você já tem o Node.js, npm/Yarn e o Expo CLI instalados em seu ambiente.

### 1. Clonagem e Instalação de Dependências

```bash
# 1. Clone o repositório
git clone [SEU_LINK_DO_REPOSITÓRIO]
cd WhatsIsThis/WhatIsThis

# 2. Instale as dependências
npm install
# ou
yarn install


2. Configuração do Endpoint da API (Passo CRÍTICO)
O aplicativo mobile se comunica com o seu servidor de backend (proxy) local. Você deve configurar o endereço IP da sua máquina no arquivo de serviço para que o aplicativo possa se conectar.

Altere a constante YOUR_PROXY_API_URL no arquivo src/services/IdentificationService.ts:

TypeScript
// src/services/IdentificationService.ts

// 🚨 ATENÇÃO: Altere este endereço IP (192.168.x.x) para o IP REAL da SUA MÁQUINA.
// Se o app não conectar, este é o primeiro lugar a ser verificado.
const YOUR_PROXY_API_URL = "http://[SEU_IP_LOCAL]:3000/api/chat";
// ...


🔑 Onde Inserir a Sua Chave de API (Segurança Obrigatória)
Por questões de segurança, sua chave secreta da IA (GEMINI_API_KEY, OPENAI_API_KEY, etc.) NUNCA deve estar no código do frontend.

Local da Chave: A chave deve ser configurada apenas no seu código de Backend (o serviço rodando na porta 3000).

Método Recomendado: Armazene a chave em variáveis de ambiente (geralmente em um arquivo .env no diretório do seu backend).

Exemplo de uso no seu Backend:
# Exemplo de conteúdo do seu arquivo .env no backend
AI_API_KEY="SUA_CHAVE_SECRETA_AQUI_E_APENAS_AQUI"


3. Execução Final
Inicie seu Servidor de Backend (por exemplo, npm run start ou o comando que inicia seu proxy na porta 3000).

Inicie o Aplicativo Mobile:

Bash

npx expo start
Use o aplicativo Expo Go no seu dispositivo/emulador para escanear o QR Code e rodar o projeto.




