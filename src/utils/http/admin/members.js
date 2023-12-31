import api from "../api";

export async function fetchMembers({ search = '', page = 1 }) {
  const response = await api.get(`/admin/members?search=${search}&page=${page}`);

  const users = response.data.data.users

  return users;
}
