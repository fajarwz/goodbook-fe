import api from "../utils/api";

export async function fetchGenres({ signal }) {
  const response = await api.get('/member/genres', { signal });

  return response.data.data.genres;
}
