import api from "../utils/api";

export async function submitReview({ formData }) {
  const response = await api.post('/member/reviews', JSON.stringify(formData));

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status === 422 || response.status === 401) {
    throw response.data.data;
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  return response.data.data.review;
}
