import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteMyReview, fetchMyBooks, updateMyReview } from "../api/my";
import queryClient from "../../common/utils/queryClient";
import toast from "react-hot-toast";

const toastOptions = { duration: 5000 }

export const useMyBook = ({ search, page, updatedFrom, updatedUntil, rating }) => useQuery({
  queryKey: ['my', 'books', { search, page, updatedFrom, updatedUntil, rating }],
  queryFn: ({ signal, queryKey }) => fetchMyBooks({ signal, ...queryKey[2] }),
  onSuccess: window.scrollTo(0, 0),
})

export const useUpdateMyReview = () => useMutation({
  mutationFn: updateMyReview,
  onSuccess: () => {
      queryClient.invalidateQueries(['my', 'books'])
      toast.success('Review updated successfully.', toastOptions);
  },
})

export const useDeleteMyReview = () => useMutation({
  mutationFn: deleteMyReview,
  onSuccess: () => {
      queryClient.invalidateQueries(['my', 'books'])
      toast.success('Review deleted successfully.', toastOptions);
  },
})