import api from './api';

export const fetchWishlist = async () => {
  const { data } = await api.get('/wishlist');
  return data.data.wishlist;
};

export const toggleWishlist = async (productId) => {
  const { data } = await api.post(`/wishlist/${productId}`);
  return data.data;
};