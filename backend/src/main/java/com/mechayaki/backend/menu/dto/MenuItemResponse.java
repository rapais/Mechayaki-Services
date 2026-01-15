package com.mechayaki.backend.menu.dto;

public class MenuItemResponse {
    public Long id;
    public String name;
    public Integer price;
    public String category;
    public Integer spicy;
    public String imagePath;
    public Boolean active;

    public MenuItemResponse(Long id, String name, Integer price, String category, Integer spicy, String imagePath, Boolean active) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.spicy = spicy;
        this.imagePath = imagePath;
        this.active = active;
    }
}
