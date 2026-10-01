package com.mehta.service;

import com.mehta.model.Category;
import com.mehta.model.Product;
import com.mehta.repository.CategoryRepository;
import com.mehta.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Product> filterProducts(String search, Long categoryId, Double minPrice, Double maxPrice) {
        String queryStr = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        return productRepository.searchProducts(queryStr, categoryId, minPrice, maxPrice);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}
