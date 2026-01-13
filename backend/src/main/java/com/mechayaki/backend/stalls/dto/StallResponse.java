package com.mechayaki.backend.stalls.dto;

import java.time.Instant;

public record StallResponse(Long id, String name, boolean active, Instant createdAt) {}