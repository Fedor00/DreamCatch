package Hfister.Dreams.Respository;

import Hfister.Dreams.Model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);

    Optional<User> findById(Long id);
    User findByEmail(String email);
    User findByEmailAndPassword(String email,String password);



}
