import { useMutation } from "@tanstack/react-query"
import { submitReview } from "../api/reviews"
import queryClient from "../../common/utils/queryClient"
import toast from "react-hot-toast"

export const useSubmitReview = (bookId) => {
  return useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries(['book_reviews', { bookId }])
      toast.success('Review submitted successfully.', { duration: 5000 })
    },
  })
}
