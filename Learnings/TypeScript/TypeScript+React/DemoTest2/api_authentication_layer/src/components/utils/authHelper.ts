// src/utils/authHelper.ts
export const getToken = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return null;
  return JSON.parse(auth).token;
};

export const logoutUser = () => {
  localStorage.removeItem("auth");
  window.location.href = "/";
};
