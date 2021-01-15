package course.project.springbackend.controllers;

import course.project.springbackend.Repositories.RegistrationRepository;
import course.project.springbackend.models.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RegistrationController {
    @Autowired
    RegistrationRepository registrationRepository;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/users")
    public List<UserModel> getAllUsers() {
        List<UserModel> userModels = new ArrayList<>();
        registrationRepository.findAll().forEach(userModels::add);
        return userModels;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/register")
    public UserModel addUser(@RequestBody UserModel userModel) {
        registrationRepository.save(userModel);
        return userModel;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path = "/delete/{id}")
    public void deleteUser(@PathVariable long id) {
        registrationRepository.deleteById(id);
    }



}
