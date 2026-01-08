# 🌐 Social Network (Next.js)

Современная **социальная платформа**, построенная на **Next.js**, с аутентификацией, постами, подписками и платежами.

Проект использует актуальные подходы и технологии: **App Router**, **Server Actions**, **Prisma**, **OAuth**, **YooKassa** и **облачное хранилище файлов**.

---

## 🚀 Стек технологий

- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **PostgreSQL**
- **Auth.js (NextAuth v5)**
- **Google OAuth**
- **Resend (Email)**
- **YooKassa**
- **Vercel Blob Storage**
- **HeroUI / shadcn/ui**
- **Zustand**

---

## 📦 Установка

1. Клонирование репозитория
   bash
   git clone https://github.com/your-username/social-network.git
   cd social-network
2. Установка зависимостей
   bash
   npm install
   или
   yarn install
   или
pnpm install 3.

Настройка переменных окружения
Создайте файл .env в корне проекта:

📄 .env
Создай файл .env в корне проекта:
DATABASE_URL=
AUTH_RESEND_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
YOOKASSA_SHOP_ID=
YOOKASSA_SECRET_KEY=
Назначение переменных
DATABASE_URL — подключение к PostgreSQL (Prisma)
AUTH_RESEND_KEY — ключ авторизации Resend
RESEND_API_KEY — API-ключ для email-рассылок
NEXT_PUBLIC_APP_URL — публичный URL приложения
YOOKASSA_SHOP_ID — ID магазина YooKassa
YOOKASSA_SECRET_KEY — секретный ключ YooKassa

📄 .env.local
Создай файл .env.local:
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
BLOB_READ_WRITE_TOKEN=
Назначение переменных
AUTH_SECRET — секрет Auth.js (NextAuth v5)
AUTH_GOOGLE_ID — Google OAuth Client ID
AUTH_GOOGLE_SECRET — Google OAuth Client Secret
BLOB_READ_WRITE_TOKEN — токен для Vercel Blob Storage (загрузка файлов)

🧠 Prisma

Перед запуском необходимо инициализировать Prisma:
npx prisma generate
npx prisma migrate dev

▶️ Запуск проекта
npm run dev
Приложение будет доступно по адресу:
👉 http://localhost:3000

🚀 Деплой
Vercel (Рекомендуется)
https://vercel.com/button

🔑 Аутентификация
Google OAuth
Email Magic Link
Auth.js (NextAuth v5)

💳 Платежи
Интеграция с YooKassa:
Создание платежей
Checkout через confirmation_token
Серверная обработка статусов платежей

📁 Хранение файлов
Используется Vercel Blob Storage:
Аватары пользователей
Изображения постов

🧩 Основной функционал
👤 Профили пользователей
📝 Посты и комментарии
❤️ Лайки
➕ Подписки
💳 Платные функции
🔄 Реактивное обновление данных
📱 Адаптивный интерфейс
