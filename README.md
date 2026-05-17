# КР1 - Магазин парфюмерии

Веб-приложение интернет-магазина парфюмерии: каталог товаров с CRUD-операциями, REST API и документацией Swagger.

Контрольная работа №1 по дисциплине «Фронтенд и бэкенд разработка».

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

## Требования

- [Node.js](https://nodejs.org/)
- npm

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

Сборка стилей и запуск одной командой:

```bash
npm run dev
```

Приложение: [http://localhost:3004](http://localhost:3004)

> Backend и frontend должны работать одновременно.

### Карточка товара (SASS)

```bash
cd practice1
sass styles.scss styles.css
```

Откройте `practice1/index.html` в браузере.

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

Результаты проверки API в Postman и скриншоты интерфейса расположены в каталоге `screenshots/`."# frontend-kr1" 
