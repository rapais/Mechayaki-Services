package com.mechayaki.backend.stalls.service;

import com.mechayaki.backend.stalls.dto.StallCreateRequest;
import com.mechayaki.backend.stalls.dto.StallResponse;
import com.mechayaki.backend.stalls.model.Stall;
import com.mechayaki.backend.stalls.repo.StallRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StallService {

    private final StallRepository repo;

    public StallService(StallRepository repo) {
        this.repo = repo;
    }

    public List<StallResponse> getAll() {
        return repo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public StallResponse create(StallCreateRequest req) {
        Stall s = new Stall();
        s.setName(req.name);
        s.setActive(req.active != null ? req.active : true);
        return toResponse(repo.save(s));
    }

    public StallResponse update(Long id, StallCreateRequest req) {
        Stall s = repo.findById(id).orElseThrow(() -> new RuntimeException("Stall not found"));
        if (req.name != null) s.setName(req.name);
        if (req.active != null) s.setActive(req.active);
        return toResponse(repo.save(s));
    }

    public StallResponse toggleActive(Long id) {
        Stall s = repo.findById(id).orElseThrow(() -> new RuntimeException("Stall not found"));
        s.setActive(!s.isActive());
        return toResponse(repo.save(s));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    private StallResponse toResponse(Stall s) {
        return new StallResponse(s.getId(), s.getName(), s.isActive());
    }
}
