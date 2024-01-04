import api from "../utils/api";

export async function fetchBestBooks({ signal }) {
  const response = await api.get('/member/books/best', { signal });

  const books = response.data.data.books

  return books;
}

export async function fetchNewestBooks({ signal }) {
  const response = await api.get('/member/books/newest', { signal });

  const books = response.data.data.books

  return books;
}

export async function fetchBooks({ signal, search, page }) {
  const response = await api.get(`/member/books?search=${search}&page=${page}`, { signal });

  const books = response.data.data.books

  return books;
}
