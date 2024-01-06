import api from "../utils/api";

export async function fetchGenres({ signal }) {
  const response = await api.get('/member/genres', { signal });

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  return response.data.data.genres;
}
