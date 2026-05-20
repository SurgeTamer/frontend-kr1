# КР1 - Магазин парфюмерии

Веб-приложение интернет-магазина парфюмерии: каталог товаров с CRUD-операциями, REST API и документацией Swagger. Контрольная работа №1 по дисциплине «Фронтенд и бэкенд разработка».

## Возможности

- Каталог из 12 товаров с возможностью добавления, редактирования и удаления
- REST API на Node.js и Express
- Клиент на React с запросами через axios
- Интерактивная документация API (Swagger UI)
- Статическая карточка товара на SASS (практика по препроцессорам)

## Стек

| Часть | Технологии |
|-------|------------|
| Backend | Node.js, Express, nanoid, cors, swagger-jsdoc, swagger-ui-express |
| Frontend | React 18, axios, SASS |
| Практика №1 | HTML, SASS |

## Структура репозитория

```
KR1/
├── practice1/       # Карточка товара (SASS)
├── backend/         # Сервер и API
├── frontend/        # React-приложение
├── screenshots/     # Скриншоты тестирования (Postman)
└── README.md
```

| Практика | Основные файлы и каталоги |
|----------|---------------------------|
| №1 | `practice1/index.html`, `practice1/styles.scss`, `practice1/styles.css` |
| №2, №4 (backend), №5 | `backend/app.js`, `backend/package.json`, `backend/public/` |
| №3 | Тесты вне репозитория; результаты — `screenshots/` |
| №4 (frontend) | `frontend/src/App.js`, `frontend/src/api/index.js`, `frontend/src/components/*.jsx`, `frontend/src/pages/ProductsPage/*` |
| №6 | Весь проект целиком, этот документ |

### Практика №1 — CSS-препроцессоры (SASS)

**Тема:** карточка товара парфюмерии (название, описание, фото).

| Требование | Реализация |
|------------|------------|
| Переменные (не менее двух) | `practice1/styles.scss` — `$primary`, `$accent-gold`, `$theme` |
| Миксин (не менее одного) | `@mixin button($color)` для стиля кнопки |
| Вложенность селекторов | Блок `.card` с элементами `&__title`, `&__description` и модификатором `&--accent` |
| Условие по теме | `@if $theme == dark` для фона карточки |
| Вёрстка | `practice1/index.html` + скомпилированный `styles.css` |

Компиляция: `sass styles.scss styles.css` в каталоге `practice1/`.

### Практика №2 — Сервер на Node.js и Express

**Тема:** CRUD для списка товаров вместо пользователей из примера.

| Элемент | Реализация |
|---------|------------|
| Express, порт | `backend/app.js`, порт **3003** |
| Парсинг JSON | `express.json()` |
| Раздача статики | `express.static('public')` для изображений товаров |
| CRUD | `GET/POST /api/products`, `GET/PATCH/DELETE /api/products/:id` |
| Валидация и ошибки | Вспомогательная функция `findProductOr404`, ответы `400` / `404` / `500` по аналогии с примером из практики |
| Поля по заданию ПЗ №2 | `id`, `name`, `price`; дополнительно — поля из ПЗ №4 (категория, описание, склад и др.) |
| Логирование | Middleware с выводом метода, кода ответа и пути |

### Практика №3 — JSON и внешние API

| Элемент | Реализация |
|---------|------------|
| Тестирование собственного API | Отправка запросов к `http://localhost:3003/...` (пример: Postman) |
| Внешние публичные API | По заданию — отдельная серия запросов (погода, курс валют и т.п.) |
| Артефакты | Каталог `screenshots/` — скриншоты запросов и ответов |

Логика приложения не меняется: ПЗ №3 — это проверка и фиксация результатов тестирования.

### Практика №4 — API + React

**Тема:** интернет-магазин парфюмерии, не менее **10** товаров.

| Элемент | Реализация |
|---------|------------|
| Бэкенд | `backend/app.js` — `nanoid` для `id`, обработчики ошибок, ответ `204` при удалении |
| CORS | Разрешён origin `http://localhost:3004` для работы фронтенда |
| Фронтенд | `frontend/` — приложение на React; структура как в методичке: `src/api/`, `src/components/`, `src/pages/` |
| Связка с API | `frontend/src/api/index.js` — axios-клиент с `baseURL: http://localhost:3003/api` |
| Компоненты | `ProductItem.jsx`, `ProductsList.jsx`, `ProductModal.jsx`, страница `pages/ProductsPage/ProductsPage.jsx` |
| Стили каталога | `ProductsPage.scss` компилируется в `ProductsPage.css` (скрипт `npm run sass` в `frontend`) |
| CRUD в UI | Список, кнопки «Создать», «Редактировать», «Удалить», форма в модальном окне |
| Объём каталога | 12 предзаполненных ароматов; в каждой записи есть название, категория, описание, цена, склад; при необходимости — рейтинг и путь к изображению |

Префикс маршрутов `/api/products` и порты **3003** (сервер) / **3004** (клиент) выбраны для удобной совместной работы приложений на одной машине.

### Практика №5 — Swagger (OpenAPI)

| Элемент | Реализация |
|---------|------------|
| Пакеты | `swagger-jsdoc`, `swagger-ui-express` |
| Документация | Интерфейс по адресу `/api-docs` |
| Описание схемы | JSDoc `@swagger` — `components.schemas.Product` |
| Описание операций | Для каждого метода CRUD по `/api/products` и `/api/products/{id}` |

Комментарии `/** @swagger ... */` в `backend/app.js` обязательны для генерации спецификации.

### Практика №6 — Подготовка к контрольной работе №1

Контрольная работа объединяет результаты практик **1–5**.

| Элемент | Реализация |
|---------|------------|
| Единый проект | Каталог парфюмерии: статическая карточка (`practice1/`), API и Swagger (`backend/`), клиент (`frontend/`) |
| Проверка | Ручной прогон сценариев: UI, Swagger UI (`/api-docs`), при необходимости — Postman |
| Отчётность | Скриншоты тестов и интерфейса — в `screenshots/`; описание — в данном README |
| Публикация | Открытый репозиторий и ссылка в СДО — по требованиям кафедры |

## Модель товара

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | string | Уникальный идентификатор (nanoid) |
| `name` | string | Название |
| `category` | string | Категория (Мужские / Женские / Унисекс) |
| `description` | string | Описание |
| `price` | number | Цена, ₽ |
| `stock` | number | Количество на складе |
| `rating` | number | Рейтинг (необязательно) |
| `image` | string | Путь к изображению (необязательно) |

## Установка и запуск

### Backend (порт 3003)

```bash
cd backend
npm install
npm start
```

- API: [http://localhost:3003/api/products](http://localhost:3003/api/products)
- Swagger: [http://localhost:3003/api-docs](http://localhost:3003/api-docs)

### Frontend (порт 3004)

```bash
cd frontend
npm install
npm run sass
npm start
```
Приложение: [http://localhost:3004](http://localhost:3004)

## API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `GET` | `/api/products` | Список товаров |
| `GET` | `/api/products/:id` | Товар по ID |
| `POST` | `/api/products` | Создание товара |
| `PATCH` | `/api/products/:id` | Обновление товара |
| `DELETE` | `/api/products/:id` | Удаление товара |

Пример тела запроса для `POST` / `PATCH`:

```json
{
  "name": "Chanel No. 5",
  "category": "Женские",
  "description": "Классический цветочный аромат",
  "price": 8900,
  "stock": 15,
  "rating": 4.9,
  "image": "/images/chanel-no5.jpg"
}
```

## Изображения

Файлы фотографий размещаются в `backend/public/images/` (имена соответствуют полю `image` в данных товаров). Для карточки в `practice1/` используется `practice1/images/placeholder.jpg`.

## Тестирование

Результаты проверки API в Postman и скриншоты интерфейса расположены в каталоге `screenshots/`.
