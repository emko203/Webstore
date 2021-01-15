package course.project.springbackend.Service;

import course.project.springbackend.Repositories.ProductRepository;
import course.project.springbackend.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> listAll(){
        return productRepository.findAll();
    }

    public void saveProduct(Product product){
        productRepository.save(product);
    }


    public Product getProduct(long productID){
        return productRepository.findById(productID).get();
    }

    public void deleteProduct(long productID){ productRepository.deleteById(productID);
    }


}
