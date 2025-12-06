import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  auth: { isAuthenticated: boolean; token: string | null; role: string | null };
  login: (role?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


export const AuthProvider = ({ children }) => {

  const initialAuth = {
    isAuthenticated: false,
    token: null,
    role: null // "user" or "admin"
  }


  const [auth, setAuth] = useState(initialAuth);



  useEffect(() => {
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    if (savedAuth?.token) {
      setAuth(savedAuth);
    }
  }, []);

  const login = (role = "user") => {
    const fakeToken = crypto.randomUUID(); // simulate backend JWT

    const newAuth = {
      isAuthenticated: true,
      token: fakeToken,
      role
    };

    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      role: null
    });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
// export useAuth = () => useContext(AuthContext);
