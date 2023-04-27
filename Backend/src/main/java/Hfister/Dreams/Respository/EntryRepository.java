package Hfister.Dreams.Respository;

import Hfister.Dreams.Model.Category;
import Hfister.Dreams.Model.Entry;
import Hfister.Dreams.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
@Repository
public interface EntryRepository  extends JpaRepository<Entry,Long> {
    List<Entry> findByUserOrderByDateDesc(User user);
    List<Entry> findByUserAndCategoriesInOrderByDate(User user, List<Category> categories);
    Entry findEntryByUserAndDate(User user, OffsetDateTime date);
    void deleteById(Long id);

}

