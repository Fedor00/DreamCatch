package Hfister.Dreams.Respository;

import Hfister.Dreams.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByName(String  email);
    List<Category> findAll() ;

}
