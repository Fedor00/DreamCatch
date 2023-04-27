package Hfister.Dreams.Model;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class ChartData {

    private List<List<Integer>> data;
    private List<String> labels;
}