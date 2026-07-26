import api from './api';

export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data.data.order;
};

export const fetchMyOrders = async () => {
  const { data } = await api.get('/orders');
  return data.data.orders;
};

export const fetchOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data.data.order;
};

export const cancelOrder = async (id) => {
  const { data } = await api.put(`/orders/${id}/cancel`);
  return data.data.order;
};