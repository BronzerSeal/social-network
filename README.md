Social Network - Next.js Social Platform
https://img.shields.io/badge/Next.js-15.0-black?logo=next.js
https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript
https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma
https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql
https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css

Современная социальная платформа на базе Next.js 15 с полным набором социальных функций: аутентификацией, постами, подписками и платежной системой.

✨ Особенности
🚀 Современный стек: Next.js 15 с App Router и Server Actions

🔐 Безопасная аутентификация: Google OAuth + Email Magic Links

💳 Платежная система: Полная интеграция с YooKassa

☁️ Облачное хранение: Vercel Blob Storage для медиафайлов

📱 Адаптивный дизайн: Полностью отзывчивый интерфейс

⚡ Реактивное обновление: Instant UI updates без перезагрузки

🏗️ Архитектура
text
┌─────────────────────────────────────────────┐
│ Frontend (Next.js 15) │
│ • App Router • Server Components │
│ • Server Actions • React 18 │
└──────────────┬──────────────────────────────┘
│
┌──────────────▼──────────────────────────────┐
│ Backend Services │
│ • Auth.js v5 • Prisma ORM │
│ • Resend Email • YooKassa API │
│ • Vercel Blob • PostgreSQL │
└──────────────┬──────────────────────────────┘
│
┌──────────────▼──────────────────────────────┐
│ External APIs │
│ • Google OAuth • YooKassa │
│ • Resend • Vercel Blob │
└─────────────────────────────────────────────┘
📦 Технологический стек
Технология Назначение
Next.js 15 React-фреймворк с App Router
TypeScript Статическая типизация
Prisma ORM Работа с базой данных
PostgreSQL Основная база данных
Auth.js v5 Аутентификация и авторизация
Tailwind CSS Стилизация компонентов
shadcn/ui UI компоненты
Zustand Управление состоянием
Resend Email-рассылки
YooKassa Платежная система
Vercel Blob Хранение файлов
🚀 Быстрый старт

1. Клонирование репозитория
   bash
   git clone https://github.com/your-username/social-network.git
   cd social-network
2. Установка зависимостей
   bash
   npm install

# или

yarn install

# или

pnpm install 3. Настройка переменных окружения
Создайте файл .env в корне проекта:

env

# База данных

DATABASE_URL="postgresql://user:password@localhost:5432/social_network"

# NextAuth

AUTH_SECRET="your-secret-key-here"

# Google OAuth

AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Resend Email

AUTH_RESEND_KEY="your-resend-key"
RESEND_API_KEY="your-resend-api-key"

# Приложение

NEXT_PUBLIC_APP_URL="http://localhost:3000"

# YooKassa

YOOKASSA_SHOP_ID="your-shop-id"
YOOKASSA_SECRET_KEY="your-secret-key"

# Vercel Blob Storage

BLOB_READ_WRITE_TOKEN="your-blob-token" 4. Настройка базы данных
bash

# Генерация Prisma клиента

npx prisma generate

# Применение миграций

npx prisma migrate dev

# (Опционально) Заполнение тестовыми данными

npx prisma db seed 5. Запуск приложения
bash

# Разработка

npm run dev

# Production сборка

npm run build
npm start
Приложение будет доступно по адресу: http://localhost:3000

🔐 Аутентификация
Методы входа:
Google OAuth - через Auth.js

Email Magic Link - одноразовая ссылка на почту

Сессии - безопасное хранение с JWT

Защита маршрутов:
typescript
// Middleware автоматически защищает приватные маршруты
export { auth as middleware } from "@/auth"
💳 Платежная система (YooKassa)
Поддерживаемые функции:
✅ Создание платежей

✅ Secure 3D-Secure

✅ Возвраты средств

✅ Webhook обработка

✅ История транзакций

Интеграция:
typescript
// Создание платежа
const payment = await yooKassa.createPayment({
amount: { value: "100.00", currency: "RUB" },
confirmation: { type: "redirect" },
description: "Premium подписка"
});
📁 Хранение файлов
Vercel Blob Storage:
Аватары пользователей - автоматическая оптимизация

Изображения постов - CDN доставка

Документы - безопасное хранение

Пример загрузки:
typescript
const blob = await put(file.name, file, {
access: 'public',
});
🧩 Основные функции
👤 Профиль пользователя
Кастомизация аватара и информации

Статистика активности

Настройки приватности

📝 Посты и лента
Создание постов с медиа

Лента на основе подписок

Реакции (лайки, репосты)

Комментарии с ветвлением

🤝 Социальные функции
Система подписок

Уведомления в реальном времени

Поиск пользователей

Чат (в разработке)

💎 Премиум функции
Улучшенная аналитика

Расширенные настройки приватности

Уникальные значки

Приоритетная поддержка

📱 Адаптивность
Устройство Поддержка
Мобильные ✅ Полная адаптация
Планшеты ✅ Оптимизированный интерфейс
Десктоп ✅ Расширенные функции

🚀 Деплой
Vercel (Рекомендуется)
https://vercel.com/button

🛠️ Команды разработки
bash

# Запуск в режиме разработки

npm run dev

# Production сборка

npm run build

# Статический анализ кода

npm run lint

# Проверка типов TypeScript

npm run type-check

# Запуск тестов

npm test

# Открытие Prisma Studio

npx prisma studio
🤝 Вклад в проект
Форкните репозиторий

Создайте ветку для функции (git checkout -b feature/amazing-feature)

Закоммитьте изменения (git commit -m 'Add amazing feature')

Запушьте в ветку (git push origin feature/amazing-feature)

Откройте Pull Request

📄 Лицензия
Этот проект распространяется под лицензией MIT. Подробнее см. в файле LICENSE.

📞 Поддержка
Issues: GitHub Issues

Discord: Наш сервер

Email: support@socialnetwork.com

<div align="center"> <sub>Создано с ❤️ для современного социального взаимодействия</sub> <br> <sub>Если вам нравится проект, поставьте ⭐ на GitHub!</sub> </div>
