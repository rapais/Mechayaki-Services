package com.mechayaki.backend.orders;

import com.mechayaki.backend.orders.dto.OrderCreateRequest;
import com.mechayaki.backend.orders.dto.OrderResponse;
import com.mechayaki.backend.orders.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService svc;

    public OrderController(OrderService svc) {
        this.svc = svc;
    }

    @PostMapping
    public OrderResponse create(@RequestBody OrderCreateRequest req) {
        return svc.create(req);
    }

    @GetMapping
    public List<OrderResponse> list() {
        return svc.getAll();
    }

    @PatchMapping("/{id}/status")
    public OrderResponse updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "PAID");
        return svc.updateStatus(id, status);
    }
}
