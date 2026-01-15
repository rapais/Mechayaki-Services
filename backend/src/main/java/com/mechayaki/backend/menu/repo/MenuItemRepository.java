package com.mechayaki.backend.menu.repo;

import com.mechayaki.backend.menu.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    boolean existsByNameAndCategory(String name, String category);
}
