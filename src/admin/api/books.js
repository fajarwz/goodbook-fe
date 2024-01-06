import api from '../utils/api';

export async function fetchBooks({ signal, search = '', page = 1 }) {
  const response = await api.get(`/admin/books?search=${search}&page=${page}`, { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  const books = response.data.data.books

  return books;
}
