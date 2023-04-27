package Hfister.Dreams.Util;

import Hfister.Dreams.Model.*;

import java.util.List;

public class ChartDataRetriever {

    public static ChartData retrieveChartData(List<Entry> entries, String filterType, int filterValue) {
        ChartDataStrategy chartDataStrategy;

        if (filterType.equalsIgnoreCase("week")) {
            chartDataStrategy = new WeekChartDataStrategy();
        } else if (filterType.equalsIgnoreCase("month")) {
            chartDataStrategy = new MonthChartDataStrategy();
        } else {
            throw new IllegalArgumentException("Invalid filter type. Supported types: 'week', 'month'");
        }

        return chartDataStrategy.getChartData(entries, filterValue);
    }
}
