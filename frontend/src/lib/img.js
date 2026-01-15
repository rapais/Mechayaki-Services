export function img(path) {
  // Ensures spaces and parentheses won’t break the URL if any remain.
  // Example: img("menu-images/1. Matcha Kaze (Green Tea Breeze).png")
  return "/images/" + encodeURIComponent(path).replaceAll("%2F", "/");
}
