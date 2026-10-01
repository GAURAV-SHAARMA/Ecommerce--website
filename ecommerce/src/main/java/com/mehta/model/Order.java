package com.mehta.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderNumber;

    private String customerName;
    private String customerEmail;
    private String shippingAddress;
    private String city;
    private String zipCode;
    private String paymentMethod;

    private Double totalAmount;
    private String status; // "PENDING", "PROCESSING", "SHIPPED", "DELIVERED"

    private LocalDateTime createdAt;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();
}
