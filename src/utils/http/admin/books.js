import api from "../api";

export async function fetchBooks({ search = '', page = 1 }) {
  const response = await api.get(`/admin/books?search=${search}&page=${page}`);

  const books = response.data.data.books

  return books;
}
