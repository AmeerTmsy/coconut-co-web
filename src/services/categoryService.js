import api from './api';

export const fetchCategories = async () => {
  const { data } = await api.get('/products/categories');
  return data.data.categories;
};