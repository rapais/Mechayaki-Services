const KEY = "mechayaki_tablet_session";

export function getTabletSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setTabletSession(session) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearTabletSession() {
  localStorage.removeItem(KEY);
}
