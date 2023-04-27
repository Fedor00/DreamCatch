package Hfister.Dreams.Controller;

import Hfister.Dreams.Exceptions.UniqueCategoryViolation;
import Hfister.Dreams.Model.Category;
import Hfister.Dreams.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;
    @PutMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) throws UniqueCategoryViolation {
        return new ResponseEntity<>(categoryService.addCategory(category), HttpStatus.ACCEPTED);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Category>> addCategory() throws Exception {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.ACCEPTED);
    }
}
