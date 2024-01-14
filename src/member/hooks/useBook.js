import { useQuery } from "@tanstack/react-query"
import { fetchBookBySlug } from "../api/books"

export const useBookBySlug = (slug) => {
  return useQuery({
    queryKey: ['books', { slug }],
    queryFn: ({ signal, queryKey }) => fetchBookBySlug({ signal, ...queryKey[1] }),
    staleTime: 5000,
  })
}
