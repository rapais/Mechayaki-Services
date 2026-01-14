const KEY = "mechayaki_auth_user";

export function getAuthUser() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuthUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearAuthUser() {
  localStorage.removeItem(KEY);
}

export function isLoggedIn() {
  return !!getAuthUser();
}
