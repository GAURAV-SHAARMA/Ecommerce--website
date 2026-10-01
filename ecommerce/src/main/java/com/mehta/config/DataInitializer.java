package com.mehta.config;

import com.mehta.model.Category;
import com.mehta.model.Product;
import com.mehta.repository.CategoryRepository;
import com.mehta.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() > 0) {
            return;
        }

        // 1. Create Categories
        Category tech = Category.builder()
                .name("Electronics & Tech")
                .description("Next-gen gadgets, noise-canceling audio, and smart devices.")
                .icon("Cpu")
                .build();

        Category fashion = Category.builder()
                .name("Fashion & Apparel")
                .description("Premium streetwear, minimalist aesthetics, and activewear.")
                .icon("ShoppingBag")
                .build();

        Category home = Category.builder()
                .name("Home & Living")
                .description("Modern home decor, ergonomic workspace gear, and ambient lighting.")
                .icon("Home")
                .build();

        Category gaming = Category.builder()
                .name("Gaming & Gear")
                .description("High-performance mechanical keyboards, mice, and immersive audio.")
                .icon("Gamepad2")
                .build();

        categoryRepository.saveAll(List.of(tech, fashion, home, gaming));

        // 2. Create Products
        List<Product> sampleProducts = List.of(
                Product.builder()
                        .name("Aura Sound Pro Wireless Headphones")
                        .description("Active Noise Cancellation with 40-hour battery life, spatial audio processing, and ultra-soft memory foam earcups.")
                        .price(249.99)
                        .originalPrice(299.99)
                        .rating(4.9)
                        .reviewCount(142)
                        .stock(25)
                        .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80")
                        .badge("Best Seller")
                        .featured(true)
                        .category(tech)
                        .build(),

                Product.builder()
                        .name("Chronos Minimalist Smartwatch")
                        .description("Sleek titanium chassis, OLED display, 24/7 heart rate monitoring, sleep tracking, and 7-day battery life.")
                        .price(189.50)
                        .originalPrice(220.00)
                        .rating(4.8)
                        .reviewCount(98)
                        .stock(18)
                        .imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80")
                        .badge("Trending")
                        .featured(true)
                        .category(tech)
                        .build(),

                Product.builder()
                        .name("Cyberdeck Mechanical Keyboard")
                        .description("Hot-swappable mechanical switches, RGB per-key lighting, aluminum casing, and custom PBT keycaps.")
                        .price(135.00)
                        .originalPrice(160.00)
                        .rating(4.9)
                        .reviewCount(210)
                        .stock(12)
                        .imageUrl("https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80")
                        .badge("Top Rated")
                        .featured(true)
                        .category(gaming)
                        .build(),

                Product.builder()
                        .name("Urban Explorer Waterproof Backpack")
                        .description("Ergonomic 25L travel backpack with padded 16-inch laptop sleeve, hidden anti-theft pockets, and water-resistant fabric.")
                        .price(89.99)
                        .originalPrice(119.99)
                        .rating(4.7)
                        .reviewCount(75)
                        .stock(30)
                        .imageUrl("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80")
                        .badge("Sale")
                        .featured(false)
                        .category(fashion)
                        .build(),

                Product.builder()
                        .name("Lumina Ambient Desk Lamp")
                        .description("Smart LED desk lamp with adjustable color temperature, wireless phone charging base, and touch controls.")
                        .price(64.50)
                        .originalPrice(79.99)
                        .rating(4.6)
                        .reviewCount(54)
                        .stock(40)
                        .imageUrl("https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80")
                        .badge("New Arrival")
                        .featured(true)
                        .category(home)
                        .build(),

                Product.builder()
                        .name("Prism Precision Ergonomic Gaming Mouse")
                        .description("26,000 DPI optical sensor, ultra-lightweight 58g honeycomb design, and zero-latency wireless connectivity.")
                        .price(79.00)
                        .originalPrice(99.00)
                        .rating(4.8)
                        .reviewCount(115)
                        .stock(22)
                        .imageUrl("https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80")
                        .badge("Popular")
                        .featured(false)
                        .category(gaming)
                        .build(),

                Product.builder()
                        .name("Minimalist Oversized Cotton Hoodie")
                        .description("100% Organic heavyweight French Terry cotton hoodie designed for effortless modern streetwear style.")
                        .price(75.00)
                        .originalPrice(90.00)
                        .rating(4.9)
                        .reviewCount(88)
                        .stock(50)
                        .imageUrl("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80")
                        .badge("Best Seller")
                        .featured(true)
                        .category(fashion)
                        .build(),

                Product.builder()
                        .name("Serenity Ceramic Pour-Over Coffee Set")
                        .description("Handcrafted matte ceramic dripper and heat-resistant glass carafe for the ultimate morning brewing ritual.")
                        .price(48.00)
                        .originalPrice(58.00)
                        .rating(4.9)
                        .reviewCount(165)
                        .stock(15)
                        .imageUrl("https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80")
                        .badge("Editor's Choice")
                        .featured(false)
                        .category(home)
                        .build()
        );

        productRepository.saveAll(sampleProducts);
        System.out.println("✅ E-commerce sample data initialized successfully!");
    }
}
