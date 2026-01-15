package com.mechayaki.backend.menu.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "menu_items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private Integer price; // store in RM whole number for simplicity

    @Column(nullable=false)
    private String category; // "Beverages", "Dessert", etc.

    @Column(nullable=false)
    private Integer spicy = 0;

    @Column(nullable=true)
    private String imagePath; // "/images/menu-images/xxx.png"

    @Column(nullable=false)
    private Boolean active = true;

    @Column(nullable=false)
    private Instant createdAt = Instant.now();

    public MenuItem() {}

    // getters/setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public Integer getPrice() { return price; }
    public String getCategory() { return category; }
    public Integer getSpicy() { return spicy; }
    public String getImagePath() { return imagePath; }
    public Boolean getActive() { return active; }
    public Instant getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setPrice(Integer price) { this.price = price; }
    public void setCategory(String category) { this.category = category; }
    public void setSpicy(Integer spicy) { this.spicy = spicy; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
    public void setActive(Boolean active) { this.active = active; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
