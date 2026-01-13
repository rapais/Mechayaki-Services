package com.mechayaki.backend.stalls;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stalls")
public class StallController {

    @GetMapping
    public List<Map<String, Object>> getAll() {
        return List.of(
            Map.of("id", 1, "name", "Stall A", "active", true),
            Map.of("id", 2, "name", "Stall B", "active", true)
        );
    }

    public StallController() {
    System.out.println("=== StallController bean created ===");
}

}
