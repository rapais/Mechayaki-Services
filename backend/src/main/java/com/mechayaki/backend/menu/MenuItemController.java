package com.mechayaki.backend.menu;

import com.mechayaki.backend.menu.dto.MenuItemRequest;
import com.mechayaki.backend.menu.dto.MenuItemResponse;
import com.mechayaki.backend.menu.service.MenuItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    private final MenuItemService service;

    public MenuItemController(MenuItemService service) {
        this.service = service;
    }

    // Public & tablet can fetch (optionally only active items)
    @GetMapping
    public List<MenuItemResponse> getAll(@RequestParam(required = false) Boolean activeOnly) {
        return service.getAll(activeOnly);
    }

    // Admin creates
    @PostMapping
    public ResponseEntity<MenuItemResponse> create(@RequestBody MenuItemRequest req) {
        return ResponseEntity.ok(service.create(req));
    }

    // Admin updates
    @PutMapping("/{id}")
    public ResponseEntity<MenuItemResponse> update(@PathVariable Long id, @RequestBody MenuItemRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    // Admin deletes
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
