# 🔐 CipherNest

Aplicação full stack desenvolvida com **Angular** e **Spring Boot**, capaz de **codificar** e **decodificar** textos em três formatos diferentes: **Binário**, **Código Morse** e **Base64**.

---

## 🚀 Descrição

O **CipherNest** é uma ferramenta educacional e prática voltada para entusiastas de programação, criptografia e curiosos sobre linguagens de codificação. A aplicação possui uma interface amigável e intuitiva, permitindo transformar mensagens para diferentes formas codificadas e revertê-las de forma rápida e precisa.

---

## 🧠 Funcionalidades

- 🔁 Codificação e decodificação em:
  - Binário
  - Código Morse
  - Base64

- 📩 Interface moderna e reativa com Angular
- 🌐 Comunicação com a API via HTTP
- 🔐 Backend robusto com Spring Boot
- 📄 Histórico ou resultado exibido dinamicamente na tela

---

## 🛠️ Tecnologias utilizadas

### Frontend (Angular)
- Angular CLI
- TypeScript
- HTML5, CSS3
- Bootstrap (ou outra biblioteca, se desejar especificar)
- Angular Services + HttpClient

### Backend (Java Spring Boot)
- Spring Web
- Spring Boot Starter
- API REST com endpoints para codificação/decodificação
- Lógica de conversão para Binário, Morse e Base64

---

## 📦 Instalação

### 🔧 Backend (Spring Boot)

```bash
# 1. Clone o projeto
git clone https://github.com/seu-usuario/CipherNest.git

# 2. Acesse a pasta do backend
cd CipherNest/backend

# 3. Compile e execute o projeto
./mvnw spring-boot:run
```

🖥️ Frontend (Angular)
```bash
# 1. Acesse a pasta do frontend
cd CipherNest/frontend

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
ng serve
