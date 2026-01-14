package com.mechayaki.backend.stalls.dto;

public class StallResponse {
    public Long id;
    public String name;
    public boolean active;

    public StallResponse(Long id, String name, boolean active) {
        this.id = id;
        this.name = name;
        this.active = active;
    }
}
