import api from './api';

// Dashboard
export const fetchDashboardStats = async () => {
  const { data } = await api.get('/admin/dashboard');
  return data.data;
};

// Orders
export const fetchAllOrders = async (params = {}) => {
  const { data } = await api.get('/admin/orders', { params });
  return data.data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/admin/orders/${id}/status`, { status });
  return data.data.order;
};

// Customers
export const fetchAllCustomers = async (params = {}) => {
  const { data } = await api.get('/admin/customers', { params });
  return data.data;
};

// Products
export const adminCreateProduct = async (payload) => {
  const { data } = await api.post('/admin/products', payload);
  return data.data.product;
};

export const adminUpdateProduct = async (id, payload) => {
  const { data } = await api.put(`/admin/products/${id}`, payload);
  return data.data.product;
};

export const adminDeleteProduct = async (id) => {
  await api.delete(`/admin/products/${id}`);
};

// Categories
export const adminCreateCategory = async (payload) => {
  const { data } = await api.post('/admin/categories', payload);
  return data.data.category;
};

export const adminUpdateCategory = async (id, payload) => {
  const { data } = await api.put(`/admin/categories/${id}`, payload);
  return data.data.category;
};

export const adminDeleteCategory = async (id) => {
  await api.delete(`/admin/categories/${id}`);
};

export const fetchAdminProducts = async (params = {}) => {
  const { data } = await api.get('/admin/products', { params });
  return data.data;
};

export const fetchAdminCategories = async () => {
  const { data } = await api.get('/admin/categories');
  return data.data.categories;
};