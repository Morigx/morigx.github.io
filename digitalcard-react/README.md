# Digital Card Hub - React + Vite

Многостраничный сайт на React + Vite для хостинга на GitHub Pages.

## 🚀 Быстрый старт

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для продакшена
```bash
npm run build
```

## 📁 Структура проекта

```
digitalcard-react/
├── src/
│   ├── components/       # Переиспользуемые компоненты
│   ├── pages/           # Страницы приложения
│   │   ├── Hub.jsx      # Главная страница (хаб)
│   │   └── Profile.jsx  # Страница профиля
│   ├── styles/          # CSS стили
│   │   ├── Hub.css
│   │   └── Profile.css
│   ├── App.jsx          # Основной компонент с роутингом
│   └── main.jsx         # Точка входа
├── public/              # Статические файлы
├── package.json
└── vite.config.js
```

## 🔧 Настройка

### Добавление нового профиля

1. Откройте `src/pages/Hub.jsx` и добавьте новый профиль в массив `profiles`:
```javascript
const profiles = [
  { nickname: 'gtnntg', displayName: 'gtnntg' },
  { nickname: 'gamecop20', displayName: 'gamecop20' },
  { nickname: 'newuser', displayName: 'New User' }, // Новый профиль
];
```

2. Откройте `src/pages/Profile.jsx` и добавьте конфигурацию API в `USER_CONFIGS`:
```javascript
const USER_CONFIGS = {
  gtnntg: {
    profileApiUrl: 'YOUR_PROFILE_API_URL',
    linksApiUrl: 'YOUR_LINKS_API_URL',
  },
  newuser: {
    profileApiUrl: 'https://your-api.com/profile/newuser',
    linksApiUrl: 'https://your-api.com/links/newuser',
  },
};
```

## 🌐 Деплой на GitHub Pages

### Шаг 1: Создайте репозиторий на GitHub
```bash
cd digitalcard-react
git init
git add .
git commit -m "Initial commit"
```

### Шаг 2: Создайте новый репозиторий на GitHub и следуйте инструкциям

### Шаг 3: Настройте GitHub Actions для деплоя

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Шаг 4: Настройте GitHub Pages

1. Зайдите в настройки репозитория
2. Перейдите в раздел "Pages"
3. В разделе "Build and deployment":
   - Source: GitHub Actions
4. Сохраните

### Шаг 5: Push кода
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

После этого GitHub Actions автоматически соберет и задеплоит ваш сайт!

## ✨ Функции

- ✅ Многостраничная навигация с React Router
- ✅ Динамическая загрузка профилей из API
- ✅ Поддержка двух языков (Русский/English)
- ✅ Темная и светлая темы
- ✅ Адаптивный дизайн
- ✅ Сохранение предпочтений пользователя в localStorage
- ✅ Оптимизированная сборка для продакшена

## 📝 API Формат

### Профиль (JSON)
```json
{
  "success": true,
  "data": [{
    "username": "gtnntg",
    "status": "Добро пожаловать!",
    "onlinestatus": "в Сети",
    "avatar": "https://example.com/avatar.jpg"
  }]
}
```

### Ссылки (JSON Array)
```json
[
  {
    "url": "https://github.com/gtnntg",
    "name": {
      "ru": "GitHub",
      "en": "GitHub"
    },
    "icon": "https://github.com/favicon.ico"
  }
]
```

## 📄 Лицензия

MIT
