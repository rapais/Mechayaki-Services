package com.mechayaki.backend.orders.dto;

import java.util.List;

public class OrderCreateRequest {
    public String paymentMethod;
    public Double total;
    public String note;
    public List<OrderItem> items;

    public static class OrderItem {
        public String menuId;
        public String name;
        public Double price;
        public Integer qty;
    }
}
