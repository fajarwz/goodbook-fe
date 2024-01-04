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

export async function fetchBooks({ signal, search, page, publishedFrom, publishedUntil }) {
  let url = `/member/books?search=${search}&page=${page}`
  if (publishedFrom !== '' && publishedUntil !== '') {
    url += `&filter[published_between]=${publishedFrom},${publishedUntil}`
  }

  const response = await api.get(url, { signal });

  const books = response.data.data.books

  return books;
}
