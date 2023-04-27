import { Entry } from './Entry';
export enum MetricType {
  Stress = 'stress',
  Energy = 'energy',
  Duration = 'duration',
}

export class MetricFactory {
  static getMetricValuesForPreviousSevenDays(
    entries: Entry[],
    metricType: MetricType,
    endDate: Date
  ): number[] {
    const metricValues: number[] = [];

    // Loop through the 7-day range
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date(endDate.getTime());
      currentDate.setDate(currentDate.getDate() - i);
      // Extract year, month, and day values from currentDate
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      // Find the entry for the current date and metric type
      const entry = entries.find((e) => {
        const date = new Date(e.date);
        return (
          date.getFullYear() === currentYear &&
          date.getMonth() === currentMonth &&
          date.getDate() === currentDay
        );
      });
      if (entry) {
        // Push the metric value for the entry
        switch (metricType) {
          case MetricType.Stress:
            metricValues.push(entry.stressLevel);
            break;
          case MetricType.Energy:
            metricValues.push(entry.energyLevel);
            break;
          case MetricType.Duration:
            metricValues.push(entry.duration);
            break;
        }
      } else {
        // Push 0 if there is no entry for the current date
        metricValues.push(0);
      }
    }
    return metricValues;
  }
}
