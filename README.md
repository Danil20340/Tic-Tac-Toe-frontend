# 🎮 Tic-Tac-Toe Frontend

**Tic-Tac-Toe** — это классическая игра "Крестики-нолики", реализованная в виде клиент-серверного веб-приложения.  
Приложение поддерживает **игру между пользователями в реальном времени**, систему **чата**, **уведомлений**, **роли пользователей** (включая администратора), **модальные окна** и **обмен сообщениями через WebSocket**.

Этот репозиторий содержит **frontend-часть** проекта, разработанную на **React + TypeScript** с использованием сборщика **Vite**.

---

## 📦 Стек технологий

- ⚛️ React + TypeScript
- ⚡ Vite
- 📦 Redux
- 🧭 React Router DOM
- 🧼 React Hook Form
- 🔌 WebSocket
- 🌐 REST API
- 🎨 Чистый CSS и HTML
- 🐳 Docker
- 🖧 Nginx (для продакшн-сборки и проксирования)

---

## 🚀 Запуск проекта локально через Docker

### 📁 1. Структура директорий

Клонируйте оба репозитория `Tic-Tac-Toe-frontend` и `Tic-Tac-Toe-backend` в одну общую директорию:

/папка-проекта
├── Tic-Tac-Toe-frontend
└── Tic-Tac-Toe-backend

### ⚙️ 2. Создайте `.env` файл для backend

В корне `Tic-Tac-Toe-backend` создайте файл `.env` со следующим содержимым:

DATABASE_URL="mongodb://monty:pass@db:27017/db?authSource=admin&directConnection=true"
SECRET_KEY=your_secret_key_here
ADMIN_KEY=admin
📝 Значение SECRET_KEY — любой строковый секрет.
🔐 Значение ADMIN_KEY используется для генерации учетной записи администратора.

### 🛠️ 3. Сборка и запуск контейнеров
Перейдите в папку Tic-Tac-Toe-backend и выполните:
docker compose up --build -d
⚙️ Эта команда запустит:

backend-сервер (Express)

frontend (React, Vite)

MongoDB

Nginx (обеспечивает проксирование API и WebSocket)

### 🌐 4. Откройте приложение
После запуска приложение будет доступно по адресу:
http://localhost

### 👤 5. Вход как администратор
Используйте следующие данные:
Логин: admin  
Пароль: admin
🔧 Вы можете изменить эти данные в файле init-admin.js и переменной ADMIN_KEY в .env.
