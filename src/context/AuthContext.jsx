import { createContext, useEffect, useMemo, useState } from "react";
import { fetchMe, loginUser, registerUser } from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("flowterp_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrapAuth() {
      const access = localStorage.getItem("flowterp_access_token");

      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const me = await fetchMe();
        setUser(me);
        localStorage.setItem("flowterp_user", JSON.stringify(me));
      } catch (error) {
        localStorage.removeItem("flowterp_access_token");
        localStorage.removeItem("flowterp_refresh_token");
        localStorage.removeItem("flowterp_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrapAuth();
  }, []);

  async function signup(payload) {
    await registerUser(payload);
    return login({
      email: payload.email,
      password: payload.password,
    });
  }

  async function login(payload) {
    const data = await loginUser(payload);

    localStorage.setItem("flowterp_access_token", data.access);
    localStorage.setItem("flowterp_refresh_token", data.refresh);
    localStorage.setItem("flowterp_user", JSON.stringify(data.user));

    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("flowterp_access_token");
    localStorage.removeItem("flowterp_refresh_token");
    localStorage.removeItem("flowterp_user");
    setUser(null);
  }

  async function refreshUser() {
    const me = await fetchMe();
    setUser(me);
    localStorage.setItem("flowterp_user", JSON.stringify(me));
    return me;
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      signup,
      login,
      logout,
      refreshUser,
      setUser,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}