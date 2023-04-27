package Hfister.Dreams.Util;

import Hfister.Dreams.Model.ChartData;
import Hfister.Dreams.Model.Entry;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

public class WeekChartDataStrategy implements ChartDataStrategy {
    @Override
    public ChartData getChartData(List<Entry> entries, int weekNumber) {
        LocalDate januaryFirst = LocalDate.of(LocalDate.now().getYear(), 1, 1);
        LocalDate startDate = januaryFirst.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY)).plusWeeks(weekNumber - 1);
        LocalDate endDate = startDate.plusWeeks(1).minusDays(1);

        return ChartDataUtils.generateChartData(entries, startDate, endDate);
    }


}
