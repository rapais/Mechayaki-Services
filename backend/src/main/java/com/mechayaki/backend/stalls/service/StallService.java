package com.mechayaki.backend.stalls.service;

import org.springframework.stereotype.Service;

import com.mechayaki.backend.stalls.dto.StallCreateRequest;
import com.mechayaki.backend.stalls.dto.StallResponse;
import com.mechayaki.backend.stalls.model.Stall;
import com.mechayaki.backend.stalls.repo.StallRepository;

import java.util.List;

@Service
public class StallService {

    private final StallRepository repo;

    public StallService(StallRepository repo) {
        this.repo = repo;
    }

    public List<StallResponse> getAll() {
        return repo.findAll().stream()
                .map(s -> new StallResponse(s.getId(), s.getName(), s.isActive(), s.getCreatedAt()))
                .toList();
    }

    public StallResponse create(StallCreateRequest req) {
        if (req == null || req.name() == null || req.name().trim().isEmpty()) {
            throw new IllegalArgumentException("name is required");
        }
        Stall saved = repo.save(new Stall(req.name().trim()));
        return new StallResponse(saved.getId(), saved.getName(), saved.isActive(), saved.getCreatedAt());
    }
}
