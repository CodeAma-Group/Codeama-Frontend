import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexGrid
} from "ng-apexcharts";
import { type } from 'os';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
};

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      grid: {
        yaxis: {
          lines: {
             show: false
          }
        }        
      },
      chart: {
        type: "bar",
        height: 220,
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        },
        
      },
      
      responsive: [
        {
          breakpoint: 480,
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          // endingShape: "rounded"
        }
        
      },
      dataLabels: {
        enabled: false
      },

      xaxis: {
        type: "category",
        axisBorder: {
          show: false
        }
      },

      yaxis: {

        labels: {
          show: false
        }
      },
      
      legend: {
        show: false
      },
      fill: {
        opacity: 1
      }
    }
  }

  ngOnInit(): void {
  }


}
