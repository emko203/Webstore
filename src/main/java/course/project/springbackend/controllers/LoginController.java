package course.project.springbackend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @CrossOrigin
    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity sendViaResponseEntity() {
        return new ResponseEntity(HttpStatus.OK);
    }
}
