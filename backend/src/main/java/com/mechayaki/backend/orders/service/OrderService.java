package com.mechayaki.backend.orders.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mechayaki.backend.orders.dto.OrderCreateRequest;
import com.mechayaki.backend.orders.dto.OrderResponse;
import com.mechayaki.backend.orders.model.Order;
import com.mechayaki.backend.orders.repo.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repo;
    private final ObjectMapper om = new ObjectMapper();

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public OrderResponse create(OrderCreateRequest req) {
        if (req == null || req.items == null || req.items.isEmpty())
            throw new RuntimeException("Order items required");
        if (req.paymentMethod == null || req.paymentMethod.isBlank())
            throw new RuntimeException("Payment method required");
        if (req.total == null)
            throw new RuntimeException("Total required");

        try {
            String itemsJson = om.writeValueAsString(req.items);

            Order o = new Order();
            o.setPaymentMethod(req.paymentMethod);
            o.setTotal(req.total);
            o.setNote(req.note);
            o.setStatus("PAID");
            o.setItemsJson(itemsJson);

            Order saved = repo.save(o);
            return toResponse(saved);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create order");
        }
    }

    public List<OrderResponse> getAll() {
        return repo.findAll().stream().map(this::toResponse).toList();
    }

    public OrderResponse updateStatus(Long id, String status) {
        Order o = repo.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        o.setStatus(status);
        return toResponse(repo.save(o));
    }

    private OrderResponse toResponse(Order o) {
        try {
            List<?> items = om.readValue(o.getItemsJson(), new TypeReference<List<Object>>() {});
            return new OrderResponse(
                    o.getId(),
                    o.getCreatedAt(),
                    o.getPaymentMethod(),
                    o.getTotal(),
                    o.getStatus(),
                    o.getNote(),
                    items
            );
        } catch (Exception e) {
            return new OrderResponse(
                    o.getId(),
                    o.getCreatedAt(),
                    o.getPaymentMethod(),
                    o.getTotal(),
                    o.getStatus(),
                    o.getNote(),
                    List.of()
            );
        }
    }
}
