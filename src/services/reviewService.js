import api from './api';

export const fetchProductReviews = async (productId) => {
  const { data } = await api.get(`/reviews/${productId}`);
  return data.data.reviews;
};

export const submitReview = async (productId, payload) => {
  const { data } = await api.post(`/reviews/${productId}`, payload);
  return data.data.review;
};

export const deleteReview = async (reviewId) => {
  await api.delete(`/reviews/${reviewId}`);
};