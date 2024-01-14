import { useQuery } from "@tanstack/react-query"
import { checkIsReviewedByUser, fetchReviewsByBookId } from "../api/book-reviews"

export const useBookReviewsCheck = (bookId) => {
  return useQuery({
    queryKey: ['book_reviews_check', { bookId }],
    queryFn: ({ signal, queryKey }) => checkIsReviewedByUser({ signal, ...queryKey[1] }),
    enabled: !!bookId,
  })
}

export const useReviewsByBookId = ({ bookId, reviewsPage }) => {
  return useQuery({
    queryKey: ['book_reviews', { bookId, reviewsPage }],
    queryFn: ({ signal, queryKey }) => fetchReviewsByBookId({ signal, ...queryKey[1] }),
    enabled: !!bookId,
  })
}