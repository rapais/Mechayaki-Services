package com.mechayaki.backend.orders.dto;

import java.time.Instant;
import java.util.List;

public class OrderResponse {
    public Long id;
    public Instant createdAt;
    public String paymentMethod;
    public Double total;
    public String status;
    public String note;
    public List<?> items; // decoded list for UI

    public OrderResponse(Long id, Instant createdAt, String paymentMethod, Double total, String status, String note, List<?> items) {
        this.id = id;
        this.createdAt = createdAt;
        this.paymentMethod = paymentMethod;
        this.total = total;
        this.status = status;
        this.note = note;
        this.items = items;
    }
}
