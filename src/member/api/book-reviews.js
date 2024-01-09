import api from "../utils/api";

export async function fetchReviewsByBookId({ signal, bookId, reviewsPage }) {
  const response = await api.get(`/member/books/${bookId}/reviews?page=${reviewsPage}`, { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  return response.data.data.book_reviews
}

export async function checkIsReviewedByUser({ signal, bookId }) {
  const response = await api.get(`/member/books/${bookId}/reviews/check`, { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  return response.data.data.book_reviews_check
}
