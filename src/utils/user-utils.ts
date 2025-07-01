// utils/auth.ts
// utils/user-utils.ts
export const getUserFromLocalStorage = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
