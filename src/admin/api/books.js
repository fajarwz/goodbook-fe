import api from '../utils/api';

export async function fetchBooks({ signal, search = '', page = 1 }) {
  const response = await api.get(`/admin/books?search=${search}&page=${page}`, { signal });

  const books = response.data.data.books

  return books;
}
