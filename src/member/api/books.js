import api from "../utils/api";

export async function fetchBestBooks({ signal }) {
  const response = await api.get('/member/books/best', { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  const books = response.data.data.books

  return books;
}

export async function fetchNewestBooks({ signal }) {
  const response = await api.get('/member/books/newest', { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  const books = response.data.data.books

  return books;
}

export async function fetchBooks({ signal, search, page, publishedFrom, publishedUntil, rating }) {
  let url = `/member/books?search=${search}&page=${page}&filter[ratings]=${rating}`
  if (publishedFrom !== '' && publishedUntil !== '') {
    url += `&filter[published_between]=${publishedFrom},${publishedUntil}`
  }

  const response = await api.get(url, { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  const books = response.data.data.books

  return books;
}

export async function fetchBookBySlug({ signal, slug }) {
  const response = await api.get(`/member/books/${slug}`, { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  return response.data.data.book
}

export async function fetchReviewsByBookId({ signal, bookId, reviewsPage }) {
  const response = await api.get(`/member/books/${bookId}/reviews?page=${reviewsPage}`, { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  return response.data.data.reviews
}
