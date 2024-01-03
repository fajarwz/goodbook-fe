import api from "../utils/api";

export async function fetchGenres() {
  const response = await api.get('/member/genres');

  return response.data.data.genres;
}
