import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log("AuthProvider");
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();
  console.log(`token ${token}`);

  // call this function when you want to authenticate the token
  const login = useCallback(async (token) => {
    setToken(token);
    navigate("/profile");
  }, [setToken, navigate]);

  // call this function to sign out logged in token
  const logout = useCallback(() => {
    setToken(null);
    navigate("/", { replace: true });
  }, [setToken, navigate]);

  const value = useMemo(
    () => ({
        token,
      login,
      logout
    }),
    [login, logout, token]
  );
  console.log("AuthProvider32");
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};