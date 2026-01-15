package com.mechayaki.backend.menu.service;

import com.mechayaki.backend.menu.dto.MenuItemRequest;
import com.mechayaki.backend.menu.dto.MenuItemResponse;
import com.mechayaki.backend.menu.model.MenuItem;
import com.mechayaki.backend.menu.repo.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {
    private final MenuItemRepository repo;

    public MenuItemService(MenuItemRepository repo) {
        this.repo = repo;
    }

    public List<MenuItemResponse> getAll(Boolean activeOnly) {
        return repo.findAll().stream()
                .filter(m -> activeOnly == null || !activeOnly || Boolean.TRUE.equals(m.getActive()))
                .map(this::toResponse)
                .toList();
    }

    public MenuItemResponse create(MenuItemRequest req) {
        validate(req, true);

        MenuItem m = new MenuItem();
        m.setName(req.name.trim());
        m.setPrice(req.price);
        m.setCategory(req.category.trim());
        m.setSpicy(req.spicy != null ? req.spicy : 0);
        m.setImagePath(req.imagePath);
        m.setActive(req.active != null ? req.active : true);

        return toResponse(repo.save(m));
    }

    public MenuItemResponse update(Long id, MenuItemRequest req) {
        MenuItem m = repo.findById(id).orElseThrow(() -> new RuntimeException("Menu item not found"));

        if (req.name != null) m.setName(req.name.trim());
        if (req.price != null) m.setPrice(req.price);
        if (req.category != null) m.setCategory(req.category.trim());
        if (req.spicy != null) m.setSpicy(req.spicy);
        if (req.imagePath != null) m.setImagePath(req.imagePath);
        if (req.active != null) m.setActive(req.active);

        // minimal validation after patch
        if (m.getName() == null || m.getName().isBlank()) throw new RuntimeException("Name required");
        if (m.getPrice() == null || m.getPrice() <= 0) throw new RuntimeException("Price must be > 0");
        if (m.getCategory() == null || m.getCategory().isBlank()) throw new RuntimeException("Category required");

        return toResponse(repo.save(m));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    private void validate(MenuItemRequest req, boolean creating) {
        if (creating) {
            if (req.name == null || req.name.isBlank()) throw new RuntimeException("Name required");
            if (req.price == null || req.price <= 0) throw new RuntimeException("Price must be > 0");
            if (req.category == null || req.category.isBlank()) throw new RuntimeException("Category required");
        }
    }

    private MenuItemResponse toResponse(MenuItem m) {
        return new MenuItemResponse(
                m.getId(),
                m.getName(),
                m.getPrice(),
                m.getCategory(),
                m.getSpicy(),
                m.getImagePath(),
                m.getActive()
        );
    }
}
