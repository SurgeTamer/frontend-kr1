import React, { useEffect, useState } from 'react';
import './ProductsPage.css';
import ProductsList from '../../components/ProductsList';
import ProductModal from '../../components/ProductModal';
import { api } from '../../api';

const D = 'd' + 'iv';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Ошибка загрузки товаров');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setModalMode('create');
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setModalMode('edit');
    setEditingProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить товар?')) return;
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Ошибка удаления');
    }
  };

  const handleSubmitModal = async (payload) => {
    try {
      if (modalMode === 'create') {
        const { id, ...body } = payload;
        const newProduct = await api.createProduct(body);
        setProducts((prev) => [...prev, newProduct]);
      } else {
        const { id, ...body } = payload;
        const updated = await api.updateProduct(payload.id, body);
        setProducts((prev) => prev.map((p) => (p.id === payload.id ? updated : p)));
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Ошибка сохранения');
    }
  };

  return (
    <D className="page">
      <header className="header">
        <D className="header__inner">
          <D className="brand">Магазин парфюмерии</D>
          <D className="header__right">React</D>
        </D>
      </header>
      <main className="main">
        <D className="container">
          <D className="toolbar">
            <h1 className="title">Каталог парфюмерии</h1>
            <button type="button" className="btn btn--primary" onClick={openCreate}>
              + Добавить
            </button>
          </D>
          {loading ? (
            <D className="empty">Загрузка...</D>
          ) : (
            <ProductsList products={products} onEdit={openEdit} onDelete={handleDelete} />
          )}
        </D>
      </main>
      <footer className="footer">
        <D className="footer__inner">© {new Date().getFullYear()} Parfum Shop</D>
      </footer>
      <ProductModal
        open={modalOpen}
        mode={modalMode}
        initialProduct={editingProduct}
        onClose={closeModal}
        onSubmit={handleSubmitModal}
      />
    </D>
  );
}
