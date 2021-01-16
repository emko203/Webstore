package course.project.springbackend.Repositories;

import course.project.springbackend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
public Product findByName(String name);

}
