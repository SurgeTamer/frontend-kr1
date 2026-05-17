import React, { useEffect, useState } from 'react';

const D = 'd' + 'iv';

export default function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!open) return;
    setName(initialProduct?.name ?? '');
    setCategory(initialProduct?.category ?? '');
    setDescription(initialProduct?.description ?? '');
    setPrice(initialProduct?.price != null ? String(initialProduct.price) : '');
    setStock(initialProduct?.stock != null ? String(initialProduct.stock) : '');
    setRating(initialProduct?.rating != null ? String(initialProduct.rating) : '');
    setImage(initialProduct?.image ?? '');
  }, [open, initialProduct]);

  if (!open) return null;

  const title = mode === 'edit' ? 'Редактирование товара' : 'Создание товара';

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);
    const parsedRating = rating === '' ? undefined : Number(rating);

    if (!trimmedName) {
      alert('Введите название');
      return;
    }
    if (!category.trim()) {
      alert('Введите категорию');
      return;
    }
    if (!description.trim()) {
      alert('Введите описание');
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      alert('Введите корректную цену');
      return;
    }
    if (!Number.isFinite(parsedStock) || parsedStock < 0) {
      alert('Введите корректное количество');
      return;
    }
    if (parsedRating !== undefined && (!Number.isFinite(parsedRating) || parsedRating < 0 || parsedRating > 5)) {
      alert('Рейтинг от 0 до 5');
      return;
    }

    onSubmit({
      id: initialProduct?.id,
      name: trimmedName,
      category: category.trim(),
      description: description.trim(),
      price: parsedPrice,
      stock: parsedStock,
      rating: parsedRating,
      image: image.trim(),
    });
  };

  return (
    <D className="backdrop" onMouseDown={onClose}>
      <D className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <D className="modal__header">
          <D className="modal__title">{title}</D>
          <button type="button" className="iconBtn" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </D>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Название
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Chanel No. 5"
              autoFocus
            />
          </label>
          <label className="label">
            Категория
            <input
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Женские"
            />
          </label>
          <label className="label">
            Описание
            <textarea
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание аромата"
              rows={3}
            />
          </label>
          <label className="label">
            Цена (₽)
            <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" />
          </label>
          <label className="label">
            На складе
            <input className="input" value={stock} onChange={(e) => setStock(e.target.value)} inputMode="numeric" />
          </label>
          <label className="label">
            Рейтинг (0–5)
            <input className="input" value={rating} onChange={(e) => setRating(e.target.value)} inputMode="decimal" />
          </label>
          <label className="label">
            Фото (путь)
            <input
              className="input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/images/parfum.jpg"
            />
          </label>
          <D className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === 'edit' ? 'Сохранить' : 'Создать'}
            </button>
          </D>
        </form>
      </D>
    </D>
  );
}
