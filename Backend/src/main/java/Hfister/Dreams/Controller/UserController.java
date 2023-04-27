package Hfister.Dreams.Controller;

import Hfister.Dreams.Exceptions.UserNotFound;
import Hfister.Dreams.Model.User;
import Hfister.Dreams.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PutMapping("/register")
    public ResponseEntity<User> addUser(@RequestBody User user) throws Exception {
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.ACCEPTED);
    }
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) throws UserNotFound {
        return new ResponseEntity<>(userService.login(user), HttpStatus.ACCEPTED);
    }
}
