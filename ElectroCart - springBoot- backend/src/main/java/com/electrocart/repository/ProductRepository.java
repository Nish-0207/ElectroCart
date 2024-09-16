package com.electrocart.repository;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.electrocart.entity.Category;
import com.electrocart.entity.Product;


@Repository
public interface ProductRepository  extends JpaRepository<Product, Long>, PagingAndSortingRepository<Product, Long> {
	public List<Product> findByProductId(long productId);
	//public Product updateProduct(long ProductId);
	public List<Product> findByCategory(Category category);
	public Page<Product> findByCategory(Category category, Pageable page);
	@Query("select p from Product p where p.mrpPrice = :mrpPrice")
	public List<Product> findByMrpPrice(double mrpPrice);

}