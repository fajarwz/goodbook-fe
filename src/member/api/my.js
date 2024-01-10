import api from "../utils/api";

export async function fetchMyBooks({ signal, search, page, updatedFrom, updatedUntil, rating }) {
  let url = `/member/reviews?search=${search}&page=${page}&filter[ratings]=${rating}`
  if (updatedFrom !== '' && updatedUntil !== '') {
    url += `&filter[updated_between]=${updatedFrom},${updatedUntil}`
  }

  const response = await api.get(url, { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  const reviews = response.data.data.reviews

  return reviews;
}