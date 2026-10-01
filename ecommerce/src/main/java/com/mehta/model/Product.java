package com.mehta.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Double price;

    private Double originalPrice;

    private Double rating;

    private Integer reviewCount;

    private Integer stock;

    private String imageUrl;

    private String badge; // e.g. "Best Seller", "Trending", "Sale", "New Arrival"

    private Boolean featured;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
