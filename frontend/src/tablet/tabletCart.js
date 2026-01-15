const KEY = "tablet_cart_v1";

export function readCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function writeCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function addToCart(id) {
  const c = readCart();
  c[id] = (c[id] || 0) + 1;
  writeCart(c);
  return c;
}

export function decFromCart(id) {
  const c = readCart();
  const next = (c[id] || 0) - 1;
  if (next <= 0) delete c[id];
  else c[id] = next;
  writeCart(c);
  return c;
}

export function clearCart() {
  writeCart({});
}
