import api from '../utils/api';

export async function fetchReviews({ signal, search = '', page = 1 }) {
  const response = await api.get(`/admin/reviews?search=${search}&page=${page}`, { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  const reviews = response.data.data.reviews

  return reviews;
}
