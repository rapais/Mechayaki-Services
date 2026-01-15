-- seed_menu.sql
-- Inserts into public.menu_items, idempotent on (name, category).
-- Requires created_at (NOT NULL), so we set it to now().

INSERT INTO menu_items (name, price, category, spicy, image_path, active, created_at)
SELECT v.name, v.price, v.category, v.spicy, v.image_path, v.active, now()
FROM (
  VALUES
    ('Matcha Kaze', 7, 'Beverages', 0, '/images/menu-images/1. Matcha Kaze (Green Tea Breeze).png', true),
    ('Yuzu Mojito Kaze', 7, 'Beverages', 0, '/images/menu-images/2. Yuzu Mojito Kaze (Lemon Mint Breeze).png', true),
    ('Aoi Buru Sūmūji', 8, 'Beverages', 0, '/images/menu-images/3. Aoi Buru Sūmūji (Blueberry Bliss Smoothie).png', true),
    ('Kōri no Kuronō Ame', 5, 'Beverages', 0, '/images/menu-images/4. Kōri no Kuronō Ame (Iced Black Rain Americano).png', true),

    ('Purin no Yume', 7, 'Dessert', 0, '/images/menu-images/1. Purin no Yume (Dreamy Caramel Custard).png', true),
    ('Imo Mochi Tenshi', 6, 'Dessert', 0, '/images/menu-images/2. Imo Mochi Tenshi (Sweet Potato Angel).png', true),
    ('Mango no Taiyō Kakigori', 14, 'Dessert', 0, '/images/menu-images/3. Mango no Taiyō Kakigori (Mango Sunlit Shaved Ice).png', true),

    ('Yakitori no Yume', 9, 'Snacks', 0, '/images/menu-images/1. Yakitori no Yume (Dream of Skewers).png', true),
    ('Miso no Kokoro', 6, 'Snacks', 0, '/images/menu-images/2. Miso no Kokoro (Heart of Miso Soup).png', true),
    ('Tempura no Uta', 10, 'Snacks', 0, '/images/menu-images/3. Tempura no Uta (Tempura Melody).png', true),
    ('Takoyaki no Takaramono', 10, 'Snacks', 0, '/images/menu-images/4. Takoyaki no Takaramono (Treasure Takoyaki).png', true),
    ('Karaage Tenshi', 9, 'Snacks', 0, '/images/menu-images/5. Karaage Tenshi (Golden Fried Chicken Angel).png', true),

    ('Gyoza no Kessaku', 11, 'Snacks', 1, '/images/menu-images/6. Gyoza no Kessaku (Masterpiece Dumplings).png', true),

    ('Sakana no Umi', 16, 'Main Dish', 0, '/images/menu-images/1. Sakana no Umi (The Ocean''s Harvest Platter).png', true),
    ('Itadakimasu Yakisoba', 14, 'Main Dish', 0, '/images/menu-images/2. Itadakimasu Yakisoba (Grateful Feast Noodles).png', true),
    ('Kare Raisu no Kiseki', 15, 'Main Dish', 1, '/images/menu-images/3. Kare Raisu no Kiseki (Curry Rice Miracle).png', true),
    ('Akari no Ramen', 15, 'Main Dish', 0, '/images/menu-images/5. Akari no Ramen (Light of Ramen).png', true)
) AS v(name, price, category, spicy, image_path, active)
WHERE NOT EXISTS (
  SELECT 1 FROM menu_items m
  WHERE m.name = v.name AND m.category = v.category
);
