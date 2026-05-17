import React from 'react';

const API_BASE = 'http://localhost:3003';

export default function ProductItem({ product, onEdit, onDelete }) {
  const imageSrc = product.image
    ? `${API_BASE}${product.image}`
    : 'https://via.placeholder.com/80x80?text=Perfume';

  return (
    <div className="productRow">
      <img className="productImage" src={imageSrc} alt={product.name} />
      <div className="productMain">
        <div className="productId">#{product.id}</div>
        <div className="productName">{product.name}</div>
        <div className="productCategory">{product.category}</div>
        <div className="productDesc">{product.description}</div>
        <div className="productMeta">
          <span>{product.price} ₽</span>
          <span>На складе: {product.stock}</span>
          {product.rating != null && <span>★ {product.rating}</span>}
        </div>
      </div>
      <div className="productActions">
        <button type="button" className="btn" onClick={() => onEdit(product)}>Редактировать</button>
        <button type="button" className="btn btn--danger" onClick={() => onDelete(product.id)}>Удалить</button>
      </div>
    </div>
  );
}
