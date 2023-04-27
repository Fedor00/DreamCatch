package Hfister.Dreams.Util;

import Hfister.Dreams.Model.ChartData;
import Hfister.Dreams.Model.Entry;

import java.util.List;

public interface ChartDataStrategy {
    ChartData getChartData(List<Entry> entries, int filterValue);
}
