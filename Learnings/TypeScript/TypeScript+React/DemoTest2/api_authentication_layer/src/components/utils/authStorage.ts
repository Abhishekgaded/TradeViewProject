export const getAuth = () => {
  const raw = localStorage.getItem("auth");
  return raw ? JSON.parse(raw) : null;
};
export const setAuth = (auth: any) => {
  if (!auth) localStorage.removeItem("auth");
  else localStorage.setItem("auth", JSON.stringify(auth));
};
