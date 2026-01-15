package com.mechayaki.backend.orders.repo;

import com.mechayaki.backend.orders.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {}
