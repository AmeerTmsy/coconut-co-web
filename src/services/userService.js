import api from './api';

export const fetchAddresses = async () => {
  const { data } = await api.get('/users/addresses');
  return data.data.addresses;
};

export const addAddress = async (payload) => {
  const { data } = await api.post('/users/addresses', payload);
  return data.data.addresses;
};

export const updateAddress = async (addressId, payload) => {
  const { data } = await api.put(`/users/addresses/${addressId}`, payload);
  return data.data.addresses;
};

export const deleteAddress = async (addressId) => {
  const { data } = await api.delete(`/users/addresses/${addressId}`);
  return data.data.addresses;
};