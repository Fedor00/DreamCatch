package Hfister.Dreams.Service;

import Hfister.Dreams.Exceptions.UniqueCategoryViolation;
import Hfister.Dreams.Model.Category;
import Hfister.Dreams.Respository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    public List<Category>  getAllCategories(){
        return categoryRepository.findAll();
    }
    public Category addCategory(Category category) throws UniqueCategoryViolation {
        Category category1;
        try {
            category1= categoryRepository.save(category);
        } catch (DataIntegrityViolationException  e) {
            throw  new UniqueCategoryViolation("Category already exists.");
        }
        return category1;
    }

}
