import api from "../api";

export async function fetchMembers({ page }) {
  const response = await api.get(`/admin/members?page=${page}`);

  // if (response.status !== 200) {
  //   const error = new Error('An error occurred');
  //   error.code = response.status;
  //   error.info = await response.json();
  //   throw error;
  // }
  // const responseJson = await response.json()
  // console.log(responseJson)

  const users = response.data.data.users

  return users;
}
