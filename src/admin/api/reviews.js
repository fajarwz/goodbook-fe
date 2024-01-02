import api from '../utils/api';

export async function fetchReviews({ search = '', page = 1 }) {
  const response = await api.get(`/admin/reviews?search=${search}&page=${page}`);

  const reviews = response.data.data.reviews

  return reviews;
}
