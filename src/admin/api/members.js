import api from '../utils/api';

export async function fetchMembers({ signal, search = '', page = 1 }) {
  const response = await api.get(`/admin/members?search=${search}&page=${page}`, { signal });

  const users = response.data.data.users

  return users;
}
