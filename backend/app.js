const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3003;

let products = [
  { id: nanoid(6), name: 'Chanel No. 5', category: 'Женские', description: 'Классический цветочный альдегидный аромат.', price: 8900, stock: 15, rating: 4.9, image: '/images/chanel-no5.jpg' },
  { id: nanoid(6), name: 'Dior Sauvage', category: 'Мужские', description: 'Свежий пряный аромат с нотами бергамота и амбры.', price: 7200, stock: 22, rating: 4.8, image: '/images/dior-sauvage.jpg' },
  { id: nanoid(6), name: 'Tom Ford Black Orchid', category: 'Унисекс', description: 'Тёмный восточный аромат с трюфелем и чёрной орхидеей.', price: 11500, stock: 8, rating: 4.7, image: '/images/black-orchid.jpg' },
  { id: nanoid(6), name: 'Yves Saint Laurent Libre', category: 'Женские', description: 'Лаванда и апельсиновый цвет в современном исполнении.', price: 6800, stock: 18, rating: 4.6, image: '/images/libre.jpg' },
  { id: nanoid(6), name: 'Bleu de Chanel', category: 'Мужские', description: 'Древесно-ароматический парфюм для ежедневного использования.', price: 8100, stock: 14, rating: 4.8, image: '/images/bleu-chanel.jpg' },
  { id: nanoid(6), name: 'Gucci Bloom', category: 'Женские', description: 'Белые цветы жасмина, туберозы и рангун.', price: 5900, stock: 20, rating: 4.5, image: '/images/gucci-bloom.jpg' },
  { id: nanoid(6), name: 'Acqua di Gio', category: 'Мужские', description: 'Морской свежий аромат с цитрусами и мускусом.', price: 4500, stock: 25, rating: 4.7, image: '/images/acqua-gio.jpg' },
  { id: nanoid(6), name: 'La Vie Est Belle', category: 'Женские', description: 'Сладкий гурманский аромат ириса и пачули.', price: 6200, stock: 16, rating: 4.6, image: '/images/la-vie.jpg' },
  { id: nanoid(6), name: 'Versace Eros', category: 'Мужские', description: 'Мятный, зелёное яблоко и ваниль.', price: 4800, stock: 19, rating: 4.5, image: '/images/eros.jpg' },
  { id: nanoid(6), name: 'Miss Dior', category: 'Женские', description: 'Роза и пион в нежном шипровом букете.', price: 7500, stock: 12, rating: 4.8, image: '/images/miss-dior.jpg' },
  { id: nanoid(6), name: 'Armani Code', category: 'Мужские', description: 'Пряный древесный вечерний аромат.', price: 5200, stock: 17, rating: 4.4, image: '/images/armani-code.jpg' },
  { id: nanoid(6), name: 'Flowerbomb', category: 'Женские', description: 'Взрыв цветочных нот жасмина и фрезии.', price: 6900, stock: 11, rating: 4.9, image: '/images/flowerbomb.jpg' },
];

app.use(express.json());
app.use(express.static('public'));

app.use(cors({
  origin: 'http://localhost:3004',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      console.log('Body:', req.body);
    }
  });
  next();
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API магазина парфюмерии',
      version: '1.0.0',
      description: 'CRUD API для управления товарами парфюмерии',
    },
    servers: [{ url: `http://localhost:${port}`, description: 'Локальный сервер' }],
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function findProductOr404(id, res) {
  const product = products.find((p) => p.id == id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return null;
  }
  return product;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный ID товара
 *         name:
 *           type: string
 *           description: Название парфюма
 *         category:
 *           type: string
 *           description: Категория (Мужские, Женские, Унисекс)
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена в рублях
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *         rating:
 *           type: number
 *           description: Рейтинг (опционально)
 *         image:
 *           type: string
 *           description: Путь к изображению (опционально)
 *       example:
 *         id: "abc123"
 *         name: "Chanel No. 5"
 *         category: "Женские"
 *         description: "Классический аромат"
 *         price: 8900
 *         stock: 15
 *         rating: 4.9
 *         image: "/images/chanel-no5.jpg"
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создаёт новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, category, description, price, stock]
 *             properties:
 *               name: { type: string }
 *               category: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               stock: { type: integer }
 *               rating: { type: number }
 *               image: { type: string }
 *     responses:
 *       201:
 *         description: Товар создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка в теле запроса
 */
app.post('/api/products', (req, res) => {
  const { name, category, description, price, stock, rating, image } = req.body;
  if (!name || !category || !description || price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'name, category, description, price and stock are required' });
  }
  const newProduct = {
    id: nanoid(6),
    name: name.trim(),
    category: category.trim(),
    description: description.trim(),
    price: Number(price),
    stock: Number(stock),
    rating: rating !== undefined ? Number(rating) : undefined,
    image: image || '',
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/api/products', (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get('/api/products/:id', (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;
  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет данные товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               category: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               stock: { type: integer }
 *               rating: { type: number }
 *               image: { type: string }
 *     responses:
 *       200:
 *         description: Обновлённый товар
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Товар не найден
 */
app.patch('/api/products/:id', (req, res) => {
  const product = findProductOr404(req.params.id, res);
  if (!product) return;

  const fields = ['name', 'category', 'description', 'price', 'stock', 'rating', 'image'];
  const hasUpdate = fields.some((f) => req.body?.[f] !== undefined);
  if (!hasUpdate) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  const { name, category, description, price, stock, rating, image } = req.body;
  if (name !== undefined) product.name = name.trim();
  if (category !== undefined) product.category = category.trim();
  if (description !== undefined) product.description = description.trim();
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (rating !== undefined) product.rating = Number(rating);
  if (image !== undefined) product.image = image;

  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       204:
 *         description: Товар удалён
 *       404:
 *         description: Товар не найден
 */
app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const exists = products.some((p) => p.id === id);
  if (!exists) return res.status(404).json({ error: 'Product not found' });
  products = products.filter((p) => p.id !== id);
  res.status(204).send();
});

app.get('/', (req, res) => {
  res.send('API магазина парфюмерии. Документация: /api-docs');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
});
