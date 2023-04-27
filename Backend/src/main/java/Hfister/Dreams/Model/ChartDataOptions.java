package Hfister.Dreams.Model;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

/*
* Used to retrieve chart data based by user,categories and type(week,month)*/
public class ChartDataOptions {
    private List<Category> categories;
    private Long userId;
    private String type;
    private int value;

}
