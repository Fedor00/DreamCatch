package Hfister.Dreams.Service;

import Hfister.Dreams.Exceptions.UserNotFound;
import Hfister.Dreams.Model.User;
import Hfister.Dreams.Respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User addUser(User user) throws Exception {
        User userExists=userRepository.findByEmail(user.getEmail());
        if(userExists!=null)
            throw  new Exception("User already exists");
        return userRepository.save(user);
    }
    public User login(User user) throws UserNotFound {
        User user1=userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if(user1==null)
            throw new UserNotFound("Bad credentials");
        return user1;
    }




}
