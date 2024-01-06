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

export async function fetchBooks({ signal, search, page, publishedFrom, publishedUntil, rating }) {
  let url = `/member/books?search=${search}&page=${page}&filter[ratings]=${rating}`
  if (publishedFrom !== '' && publishedUntil !== '') {
    url += `&filter[published_between]=${publishedFrom},${publishedUntil}`
  }

  const response = await api.get(url, { signal });

  const books = response.data.data.books

  return books;
}

export async function fetchBookBySlug({ signal, slug }) {
  const response = await api.get(`/member/books/${slug}`, { signal });

  if (response.status === 404) {
    throw new Error(response.data.data.message);
  }

  return response.data.data.book
}
