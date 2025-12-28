import api from "./apiClient";

export async function login(email, password) {
  const form = new FormData();
  form.append("username", email);
  form.append("password", password);
  const res = await api.post("/auth/token", form);
  return res.data; // { access_token, token_type }
}
