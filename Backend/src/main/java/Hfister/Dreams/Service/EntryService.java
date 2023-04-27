package Hfister.Dreams.Service;

import Hfister.Dreams.Exceptions.EntryAlreadyAddedToday;
import Hfister.Dreams.Exceptions.NotBetweenOneToFive;
import Hfister.Dreams.Model.*;
import Hfister.Dreams.Respository.EntryRepository;
import Hfister.Dreams.Respository.UserRepository;
import Hfister.Dreams.Util.ChartDataRetriever;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EntryService {
    @Autowired
    EntryRepository entryRepository;

    @Autowired
    UserRepository userRepository;
    public Entry addEntry(Entry entry) throws Exception {
        if(notBetweenOneAndFive(entry.getDuration())
            || notBetweenOneAndFive(entry.getEnergyLevel())
            || notBetweenOneAndFive(entry.getStressLevel()))
        {
            throw  new NotBetweenOneToFive("Incorrect Input!");
        }
        OffsetDateTime date=entry.getDate();
        OffsetDateTime dateWithTimeZero = date.with(LocalTime.MIN);
        entry.setDate(dateWithTimeZero);
        Entry found=entryRepository.findEntryByUserAndDate(entry.getUser(),dateWithTimeZero);
        if(found!=null){
            throw new EntryAlreadyAddedToday("Entry Already Added today!");
        }
        System.out.println(entry.getDate());
        return entryRepository.save(entry);
    }
    public List<Entry> findAllEntriesByUser(User user){
        return entryRepository.findByUserOrderByDateDesc(user);
    }
    public List<Entry> findAllEntriesByUserAndCategories(User user, List<Category> category){
        return entryRepository.findByUserAndCategoriesInOrderByDate(user,category);
    }
    public boolean notBetweenOneAndFive(int number){
        return number < 1 || number > 5;
    }

    public void deleteEntry(Long id){
        this.entryRepository.deleteById(id);
    }
    public Entry updateEntry(Entry entry){
        return this.entryRepository.save(entry);
    }

    public ChartData retrieveChartData(ChartDataOptions chartOptions){
        List<Entry> entries=new ArrayList<>();
        System.out.println(chartOptions.getUserId());
        Optional<User> user=userRepository.findById(1L);
        if(chartOptions.getCategories()!=null && !chartOptions.getCategories().isEmpty()){
            if(user.isPresent()){
                entries=entryRepository.findByUserAndCategoriesInOrderByDate(user.get(),chartOptions.getCategories());
            }
        }
        else{
            if(user.isPresent()){
                entries=entryRepository.findByUserOrderByDateDesc(user.get());
            }
        }
        return ChartDataRetriever.retrieveChartData(entries,chartOptions.getType(),chartOptions.getValue());
    }
}
