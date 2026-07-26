import api from './api';

export const fetchProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data.data; // unwraps to { products, pagination }
};

export const fetchProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/${slug}`);
  return data.data; // unwraps to { product, relatedProducts }
};