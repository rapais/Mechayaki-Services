package com.mechayaki.backend.stalls;

import com.mechayaki.backend.stalls.dto.StallCreateRequest;
import com.mechayaki.backend.stalls.dto.StallResponse;
import com.mechayaki.backend.stalls.service.StallService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stalls")
public class StallController {

    private final StallService stalls;

    public StallController(StallService stalls) {
        this.stalls = stalls;
    }

    @GetMapping
    public List<StallResponse> getAll() {
        return stalls.getAll();
    }

    @PostMapping
    public StallResponse create(@RequestBody StallCreateRequest req) {
        return stalls.create(req);
    }

    @PutMapping("/{id}")
    public StallResponse update(@PathVariable Long id, @RequestBody StallCreateRequest req) {
        return stalls.update(id, req);
    }

    @PatchMapping("/{id}/toggle")
    public StallResponse toggle(@PathVariable Long id) {
        return stalls.toggleActive(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        stalls.delete(id);
        return ResponseEntity.noContent().build();
    }
}
