package Hfister.Dreams.Util;

import Hfister.Dreams.Model.ChartData;
import Hfister.Dreams.Model.Entry;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

public class MonthChartDataStrategy implements ChartDataStrategy {

    @Override
    public ChartData getChartData(List<Entry> entries, int monthNumber) {
        LocalDate currentDate = LocalDate.now().withMonth(monthNumber);
        LocalDate startDate = currentDate.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endDate = currentDate.with(TemporalAdjusters.lastDayOfMonth());

        return ChartDataUtils.generateChartData(entries, startDate, endDate);
    }
}
