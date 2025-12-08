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
    }
    setloading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      // console.log(res.data,'ksdfkjhsdfmn')

      const { token, role } = res.data;

      const newAuth = {
        isAuthenticated: true,
        token:token,
        role,
      };

      setAuth(newAuth);
      localStorage.setItem("auth", JSON.stringify(newAuth));

      return true;
    } catch (err) {
      console.log("Login failed:", err);
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



// // src/context/AuthContext.tsx
// import React, { createContext, useState, useEffect } from "react";
// import api from "../../api/api";

// export const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [auth, setAuth] = useState({ isAuthenticated: false, role: null, accessToken: null });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // load stored accessToken/role if you saved them
//     const stored = localStorage.getItem("auth");
//     if (stored) setAuth(JSON.parse(stored));
//     setLoading(false);
//   }, []);

//   const login = async (username: string, password: string) => {
//     const res = await api.post("/auth/login", { username, password });
//     const { accessToken, role } = res.data;
//     const newAuth = { isAuthenticated: true, role, accessToken };
//     setAuth(newAuth);
//     localStorage.setItem("auth", JSON.stringify(newAuth));
//     return true;
//   };

//   const logout = async () => {
//     await api.post("/auth/logout");
//     setAuth({ isAuthenticated: false, role: null, accessToken: null });
//     localStorage.removeItem("auth");
//   };

//   return <AuthContext.Provider value={{ auth, login, logout, loading }}>{children}</AuthContext.Provider>;
// };
