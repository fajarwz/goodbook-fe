import api from "../utils/api";

export async function fetchBestBooks() {
  const response = await api.get('/member/books/best');

  const books = response.data.data.books

  return books;
}
