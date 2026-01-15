package com.mechayaki.backend.orders.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant createdAt = Instant.now();

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private Double total;

    @Column(nullable = false)
    private String status = "PAID";

    @Lob
    @Column(nullable = false)
    private String itemsJson;

    private String note;

    public Order() {}

    public Long getId() { return id; }
    public Instant getCreatedAt() { return createdAt; }
    public String getPaymentMethod() { return paymentMethod; }
    public Double getTotal() { return total; }
    public String getStatus() { return status; }
    public String getItemsJson() { return itemsJson; }
    public String getNote() { return note; }

    public void setId(Long id) { this.id = id; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public void setTotal(Double total) { this.total = total; }
    public void setStatus(String status) { this.status = status; }
    public void setItemsJson(String itemsJson) { this.itemsJson = itemsJson; }
    public void setNote(String note) { this.note = note; }
}
