package Hfister.Dreams.Util;

import Hfister.Dreams.Model.ChartData;
import Hfister.Dreams.Model.Entry;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ChartDataUtils {

    public static ChartData generateChartData(List<Entry> entries, LocalDate startDate, LocalDate endDate) {
        List<Entry> filteredEntries = getEntriesInRange(entries, startDate, endDate);
        List<String> dateList = new ArrayList<>();
        List<Integer> stressList = new ArrayList<>();
        List<Integer> energyList = new ArrayList<>();
        List<Integer> durationList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            LocalDate finalDate = date;
            Entry entryForDate = filteredEntries.stream()
                    .filter(e -> e.getDate().toLocalDate().isEqual(finalDate))
                    .findFirst()
                    .orElse(null);

            dateList.add(String.valueOf(date.getDayOfMonth()));
            if (entryForDate != null) {
                stressList.add(entryForDate.getStressLevel());
                energyList.add(entryForDate.getEnergyLevel());
                durationList.add(entryForDate.getDuration());
            } else {
                stressList.add(0);
                energyList.add(0);
                durationList.add(0);
            }
        }

        List<List<Integer>> data = new ArrayList<>();
        data.add(stressList);
        data.add(energyList);
        data.add(durationList);

        return new ChartData(data, dateList);
    }

    public static List<Entry> getEntriesInRange(List<Entry> entries, LocalDate startDate, LocalDate endDate) {
        return entries.stream()
                .filter(e -> !e.getDate().toLocalDate().isBefore(startDate) && !e.getDate().toLocalDate().isAfter(endDate))
                .collect(Collectors.toList());
    }
}
