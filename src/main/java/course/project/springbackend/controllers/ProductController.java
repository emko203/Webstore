package course.project.springbackend.controllers;

import course.project.springbackend.Service.ProductService;
import course.project.springbackend.models.Product;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    ProductService productService;


    @GetMapping("/")
    public List<Product> getAllProducts(){
        return productService.listAll();
    }


    @PostMapping("/new")
    public String addProduct(@RequestBody Product product) {
        productService.saveProduct(product);
        return "Added a new Product";
    }

    @PutMapping("/edit/")
    public String editProduct(@RequestBody Product product) {
        productService.saveProduct(product);
        return "Edited a Product";
    }

    @GetMapping(value = "/delete/{productID}")
    public String deleteProduct(@PathVariable("productID") long productID){
        productService.deleteProduct(productID);
        return "Product Deleted";
    }

    @GetMapping(value = "/show/{productID}")
    public Product showProduct(@PathVariable("productID") long productID){
        return productService.getProduct(productID);

    }


}
