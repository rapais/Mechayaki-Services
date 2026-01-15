export const CATEGORIES = [
  {
    title: "Beverages",
    items: [
      { id: "matcha", name: "Matcha Kaze", price: 7, img: "/images/menu-images/1. Matcha Kaze (Green Tea Breeze).png" },
      { id: "yuzu", name: "Yuzu Mojito Kaze", price: 7, img: "/images/menu-images/2. Yuzu Mojito Kaze (Lemon Mint Breeze).png" },
      { id: "aoi", name: "Aoi Buru Sūmūji", price: 8, img: "/images/menu-images/3. Aoi Buru Sūmūji (Blueberry Bliss Smoothie).png" },
      { id: "kori", name: "Kōri no Kuronō Ame", price: 5, img: "/images/menu-images/4. Kōri no Kuronō Ame (Iced Black Rain Americano).png" },
    ],
  },
  {
    title: "Dessert",
    items: [
      { id: "purin", name: "Purin no Yume", price: 7, img: "/images/menu-images/1. Purin no Yume (Dreamy Caramel Custard).png" },
      { id: "imo", name: "Imo Mochi Tenshi", price: 6, img: "/images/menu-images/2. Imo Mochi Tenshi (Sweet Potato Angel).png" },
      { id: "mango", name: "Mango no Taiyō Kakigori", price: 14, img: "/images/menu-images/3. Mango no Taiyō Kakigori (Mango Sunlit Shaved Ice).png" },
    ],
  },
  {
    title: "Main Dish",
    items: [
      { id: "sakana", name: "Sakana no Umi", price: 16, img: "/images/menu-images/1. Sakana no Umi (The Ocean's Harvest Platter).png" },
      { id: "yakisoba", name: "Itadakimasu Yakisoba", price: 14, img: "/images/menu-images/2. Itadakimasu Yakisoba (Grateful Feast Noodles).png" },
      { id: "curry", name: "Kare Raisu no Kiseki", price: 15, img: "/images/menu-images/3. Kare Raisu no Kiseki (Curry Rice Miracle).png" },
      { id: "ramen", name: "Akari no Ramen", price: 15, img: "/images/menu-images/5. Akari no Ramen (Light of Ramen).png" },
    ],
  },
  {
    title: "Snacks",
    items: [
      { id: "yakitori", name: "Yakitori no Yume", price: 9, img: "/images/menu-images/1. Yakitori no Yume (Dream of Skewers).png" },
      { id: "miso", name: "Miso no Kokoro", price: 6, img: "/images/menu-images/2. Miso no Kokoro (Heart of Miso Soup).png" },
      { id: "tempura", name: "Tempura no Uta", price: 10, img: "/images/menu-images/3. Tempura no Uta (Tempura Melody).png" },
      { id: "takoyaki", name: "Takoyaki no Takaramono", price: 10, img: "/images/menu-images/4. Takoyaki no Takaramono (Treasure Takoyaki).png" },
      { id: "karaage", name: "Karaage Tenshi", price: 9, img: "/images/menu-images/5. Karaage Tenshi (Golden Fried Chicken Angel).png" },
      { id: "gyoza", name: "Gyoza no Kessaku", price: 11, img: "/images/menu-images/6. Gyoza no Kessaku (Masterpiece Dumplings.png" },
    ],
  },
];

export const allItems = () => CATEGORIES.flatMap((c) => c.items);
