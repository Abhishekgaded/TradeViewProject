import { createContext, useContext, useState, useEffect } from "react";
import api from "../../api/api";


interface AuthContextType {
  auth: { isAuthenticated: boolean; token: string | null; role: string | null };
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}


export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const initialAuth = {
    isAuthenticated: false,
    token: null,
    role: null,
  };

  const [auth, setAuth] = useState(initialAuth);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem("auth"));

    if (savedAuth?.token) {
      setAuth(savedAuth);
    } else {
      setAuth({ isAuthenticated: false, token: null, role: null });
    }

    setloading(false);
  }, []);



  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, role } = res.data;

      const newAuth = { isAuthenticated: true, token, role };

      setAuth(newAuth);
      localStorage.setItem("auth", JSON.stringify(newAuth));

      return true;

    } catch (err) {
      // remove old token to avoid fake authentication
      localStorage.removeItem("auth");
      setAuth({ isAuthenticated: false, token: null, role: null });

      return false;
    }
  };


  const logout = () => {
    setAuth(initialAuth);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


