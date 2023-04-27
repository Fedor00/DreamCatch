package Hfister.Dreams.Model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Entry() {
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("entries")
    private User user;

    public Entry(Long id, User user, List<Category> categories, String description, OffsetDateTime date, int duration, int energyLevel, int stressLevel) {
        this.id = id;
        this.user = user;
        this.categories = categories;
        this.description = description;
        this.date = date;
        this.duration = duration;
        this.energyLevel = energyLevel;
        this.stressLevel = stressLevel;
    }
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "entry_category",
            joinColumns = @JoinColumn(name = "entry_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    @JsonIgnoreProperties("entries")
    private List<Category> categories;
    @Column(nullable = false)
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private OffsetDateTime date;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private int energyLevel;

    @Column(nullable = false)
    private int stressLevel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {this.id = id;}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OffsetDateTime getDate() {
        return date;
    }

    public void setDate(OffsetDateTime date) {
        this.date = date;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getEnergyLevel() {
        return energyLevel;
    }

    public void setEnergyLevel(int energyLevel) {
        this.energyLevel = energyLevel;
    }

    public int getStressLevel() {
        return stressLevel;
    }

    public void setStressLevel(int stressLevel) {
        this.stressLevel = stressLevel;
    }

    @Override
    public String toString() {
        return "Entry{" +
                "id=" + id +
                ", user=" + user +
                ", categories=" + categories +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", duration=" + duration +
                ", energyLevel=" + energyLevel +
                ", stressLevel=" + stressLevel +
                '}';
    }
}