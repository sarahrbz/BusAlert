# 🚌 BusAlert

<p align="center">
  <img src="https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/H2-Database-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Leaflet-Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white"/>
</p>

<p align="center">
Aplicativo Full Stack desenvolvido para auxiliar passageiros de transporte público, enviando alertas quando o usuário estiver próximo do ponto de desembarque.
</p>

---

# 📖 Sobre o projeto

O **BusAlert** é um aplicativo desenvolvido como projeto acadêmico para as disciplinas de **Interação Humano Computador** e **Engenharia de Software II**.

O objetivo é oferecer uma experiência simples e intuitiva para passageiros de ônibus, permitindo acompanhar rotas em tempo real, visualizar o trajeto no mapa e receber alertas personalizados antes da chegada ao destino.

Durante o desenvolvimento foram utilizados conceitos de UX/UI, integração com APIs externas, mapas interativos, autenticação de usuários e arquitetura Full Stack.

---

# ✨ Funcionalidades

## 🔐 Autenticação

- Cadastro de usuários
- Login
- Logout
- Alteração de senha
- Edição de perfil

---

## 🏠 Home

- Saudação personalizada
- Busca de origem e destino
- Sugestão de rotas
- Acessos rápidos
- Integração com localização do usuário

---

## 🗺️ Mapa

- Visualização de linhas
- Visualização de pontos de ônibus
- Visualização do trânsito
- Mapa interativo utilizando Leaflet
- Rotas reais obtidas pela API OSRM

---

## 🚌 Seleção de Rotas

- Pesquisa de origem
- Pesquisa de destino
- Sugestão de trajetos
- Tempo estimado
- Distância
- Número de paradas
- Seleção da rota

---

## 📍 Monitoramento da viagem

- Simulação do deslocamento do ônibus
- Trajeto desenhado em mapa
- Distância restante
- Barra de progresso
- Atualização do status da viagem
- Alertas em:
  - 5 km
  - 3 km
  - 500 metros
- Notificações em tempo real
- Interface semelhante a aplicativos mobile

---

## ⭐ Rotas Favoritas

- Lista de rotas salvas
- Informações de tempo estimado
- Categoria da viagem
- Acesso rápido ao monitoramento

---

## 🧾 Histórico

### Histórico de viagens

- Rotas realizadas
- Tempo gasto
- Horário
- Categoria da viagem

### Histórico de notificações

- Alertas recebidos
- Histórico organizado por data
- Diferentes tipos de notificações

---

## ⚙️ Configurações

- Ativar/desativar alerta de 5 km
- Ativar/desativar alerta de 3 km
- Ativar/desativar alerta de 500 metros
- Som das notificações
- Vibração
- Permissão de localização
- Configurações persistidas no Local Storage

---

# 🖥️ Tecnologias utilizadas

## Front-end

- Angular
- TypeScript
- HTML5
- CSS3
- Leaflet
- Font Awesome

## Back-end

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven

## Banco de dados

- H2 Database

## APIs

- OpenStreetMap
- OSRM (Open Source Routing Machine)

---

# 🗂️ Arquitetura

```
Frontend (Angular)
        │
HTTP REST
        │
Backend (Spring Boot)
        │
Spring Data JPA
        │
Banco H2
```

---

# 📸 Telas

- Login
- Cadastro
- Home
- Seleção de Rotas
- Monitoramento
- Mapa
- Histórico de Viagens
- Histórico de Notificações
- Rotas Favoritas
- Perfil
- Configurações

> Em breve serão adicionadas imagens e GIFs demonstrando o funcionamento do aplicativo.

---

# 🚀 Como executar

## Backend

```bash
cd backend

mvn spring-boot:run
```

Servidor:

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend

npm install

ng serve
```

Aplicação:

```
http://localhost:4200
```

---

# 🎯 Funcionalidades futuras

- Integração com GPS em tempo real
- Consumo de API oficial de transporte público
- Notificações Push
- Favoritos persistidos em banco
- Histórico persistido em banco
- Recuperação de senha
- Tema escuro
- Internacionalização

---

# 📚 Aprendizados

Durante o desenvolvimento deste projeto foi possível praticar:

- Arquitetura Full Stack
- Desenvolvimento com Angular
- Desenvolvimento com Spring Boot
- Consumo de APIs REST
- Integração com APIs externas
- Manipulação de mapas com Leaflet
- Autenticação de usuários
- Componentização
- Persistência de dados
- UX/UI para aplicações mobile
- Organização utilizando Git e GitHub

---

# 👩‍💻 Desenvolvido por

**Sarah Ribeiro de Souza**

Estudante de Análise e Desenvolvimento de Sistemas

FATEC Itu

---

<p align="center">
⭐ Se este projeto foi interessante para você, deixe uma estrela no repositório!
</p>
