package Hfister.Dreams.Controller;
import Hfister.Dreams.Model.*;
import Hfister.Dreams.Service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entry")
@CrossOrigin(origins="*")
public class EntryController {
    @Autowired
    private EntryService entryService;
    @PostMapping("/add")
    public ResponseEntity<Entry> addEntry(@RequestBody Entry entry) throws Exception {
        return new ResponseEntity<>(entryService.addEntry(entry), HttpStatus.ACCEPTED);
    }
    @PostMapping("/all")
    public ResponseEntity<List<Entry>> findAllEntries(@RequestBody User user) throws Exception {
        return new ResponseEntity<>(entryService.findAllEntriesByUser(user), HttpStatus.ACCEPTED);
    }
    @PostMapping("/all/categories")
    public ResponseEntity<List<Entry>> findAllEntriesByCategories(@RequestBody UserAndCategory var) throws Exception {
        return new ResponseEntity<>(entryService.findAllEntriesByUserAndCategories(var.getUser(),var.getCategories()), HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        entryService.deleteEntry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Entry> updateEmployee(@RequestBody Entry entry) {
        return new ResponseEntity<>( entryService.updateEntry(entry),HttpStatus.OK);
    }

    @PostMapping("/chart-data")
    public ResponseEntity<?> getChartData(@RequestBody ChartDataOptions chartOptions){
        return new ResponseEntity<>(entryService.retrieveChartData(chartOptions),HttpStatus.ACCEPTED);
    }


}
