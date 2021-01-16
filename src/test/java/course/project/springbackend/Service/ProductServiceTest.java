package course.project.springbackend.Service;
import course.project.springbackend.Repositories.ProductRepository;
import course.project.springbackend.SpringBackendApplication;
import course.project.springbackend.models.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringBackendApplication.class)
class ProductServiceTest {

    @TestConfiguration
    static class ProductServiceTestConfig {

        @Bean
        public ProductService productService() {
            return new ProductService();
        }
    }
    @Autowired
    private ProductService productService;

    @MockBean
    private ProductRepository productRepository;

    @BeforeEach
    public void setUp() {
        Product testProduct1 = new Product(1L,"Test1","1500",
                "https://image.shutterstock.com/image-photo/front-view-laptop-blank-white-260nw-1708044856.jpg","TestInfo1");
        Product testProduct2 = new Product(2L,"Test2","1000",
                "https://image.shutterstock.com/image-photo/front-view-laptop-blank-white-260nw-1708044856.jpg","TestInfo2");

        List<Product> products = new ArrayList<>();
        products.add(testProduct1);
        products.add(testProduct2);

        List<Product>productSearchList = new ArrayList<>();
        productSearchList.add(testProduct2);
        Mockito.when(productRepository.findAll()).thenReturn(products);
        Mockito.when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct1));
        Mockito.when(productRepository.save(Mockito.any(Product.class))).thenAnswer(i -> i.getArguments()[0]);

        Product laptop = new Product(55L,"laptop","1660",
                "https://image.shutterstock.com/image-photo/front-view-laptop-blank-white-260nw-1708044856.jpg","TestInfo55");
        productRepository.save(laptop);
        Mockito.when(productRepository.findByName(laptop.getName()))
                .thenReturn(laptop);
    }

    @Test
    void listAll() {
        Product testProduct1 = new Product(1L,"Test1","1500",
                "https://image.shutterstock.com/image-photo/front-view-laptop-blank-white-260nw-1708044856.jpg","TestInfo1");
        Product testProduct2 = new Product(2L,"Test2","1000",
                "https://image.shutterstock.com/image-photo/front-view-laptop-blank-white-260nw-1708044856.jpg","TestInfo2");
        List<Product>products= new ArrayList<>();
        products.add(testProduct1);
        products.add(testProduct2);

        Mockito.when(productRepository.findAll())
                .thenReturn(products);
        List<Product> foundProducts = productService.listAll();
        assertThat(products)
                .isEqualTo(foundProducts);
    }

    @Test
    void saveProduct() {
        productService.saveProduct(new Product(55L,"laptop","1660",
                "https://image.shutterstock.com/image-photo/front-view-laptop-blank-white-260nw-1708044856.jpg","TestInfo55"));
        Product test = productRepository.findByName("laptop");

        assertThat(test.getName()).isEqualTo("laptop");
    }

    @Test
    void getProduct() {
        String found = productService.getProduct(1L).getName();
        Product product1 = new Product(1L,"Test1","1500",
                "https://image.shutterstock.com/image-photo/front-view-laptop-blank-white-260nw-1708044856.jpg","TestInfo1");
        assertThat(found).isEqualTo(product1.getName());
    }

    @Test
    void deleteProduct() {
        productRepository.save(new Product(200L,"Test200","2000",
                "https://image.shutterstock.com/image-photo/front-view-laptop-blank-white-260nw-1708044856.jpg","TestInfo200"));
        productService.deleteProduct(200L);
        Product fromDb = productRepository.findByName("testDeleteSong");
        assertThat(fromDb).isNull();
    }
}