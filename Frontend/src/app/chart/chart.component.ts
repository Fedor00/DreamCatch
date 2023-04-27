import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../Data/User';
import { EntryService } from '../Services/entry.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartDataOptions } from '../Data/ChartDataOptions';
import { Category } from '../Data/Category';
import { CategoryService } from '../Services/category.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers:[DatePipe]
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  chartData: ChartDataset[] = [];
  labels: string[];
  chartInformation: ChartData = { data: [], labels: [] };
  chartDataOptions: ChartDataOptions = {
    userId: -1,
    type: 'week',
    value: 14,
    categories: [],
  };
  weeks: number[] = Array.from({ length: 52 }, (_, i) => i + 1);
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  selectionType: 'week' | 'month'='week';
  selectedTimeframe:Date;
  categories:Category[];
  chartOptions: ChartOptions = this.getChartOptions();
  chartType: ChartType = 'line';
  user: User;
  errorMessage: string;
  showEntryForm = false;
  showChooseCategory = false;
  yourModelDate: Date;

  constructor(
    private entryService: EntryService,
    private cookie: CookieService,
    private router: Router,
    private categoryService:CategoryService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.cookie.get('user'));
    const weeknumber=this.datePipe.transform(new Date(), 'w');
    this.chartDataOptions.value=parseInt(weeknumber??"1");
    this.getChartData(true);
    this.getCategories();

  }

  getChartData(categoriesOrNo: Boolean): void {
    if (categoriesOrNo) this.chartDataOptions.categories = [];
    this.chartDataOptions.userId = this.user.id;
    this.chartDataOptions.type=this.selectionType;
    this.entryService.getChartData(this.chartDataOptions).subscribe({
      next: (data) => {
        this.chartDataInitializer(data);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
    this.hideChooseCategoryForChart();
  }
  getCategories(): void {
    this.categoryService.findAllCategories().subscribe({
      next: (data) => {
        this.categories=data;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }

  showChooseCategoryForChart(): void {
    this.showChooseCategory = !this.showChooseCategory;
  }

  hideChooseCategoryForChart(): void {
    this.showChooseCategory = false;
  }

  chartDataInitializer(chartData: ChartData): void {
    this.chartData = [
      {
        data: chartData.data[0],
        label: 'Stress',
        borderColor: 'black',
        borderWidth: 3,
      },
      {
        data: chartData.data[2],
        label: 'Duration',
        borderColor: 'blue',     
        borderWidth: 3,
      },
      {
        data: chartData.data[1],
        label: 'Energy',
        borderColor: 'yellow',
        borderWidth: 3,
      },
    ];
    this.labels = chartData.labels;
    this.chart.update();
  }

  toggleEntryForm(): void {
    this.showEntryForm = !this.showEntryForm;
  }

  goToEntries(): void {
    this.router.navigate(['/entries']);
  }
   getChartOptions(): ChartOptions {
    return {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.4, // smooth lines
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'white', // Change the x-axis label color
          },
        },
        y: {
          ticks: {
            color: 'white', // Change the y-axis label color
          },
        },
      },
    };
  }
  
}
