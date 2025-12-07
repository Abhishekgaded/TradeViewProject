import { useNavigate } from "react-router-dom";

// src/utils/authHelper.ts
export const getToken = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return null;
  return JSON.parse(auth).token;
};

export const logoutUser = () => {
  const navigate = useNavigate();
  localStorage.removeItem("auth");
  // window.location.href = "/";
  navigate('/');
};
