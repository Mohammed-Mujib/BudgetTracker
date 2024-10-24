import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartData, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [BrowserModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent implements OnInit{
  public donutChartOptions:any = {
    type: 'doughnut',
    data : {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
    responsive: true,
  };

  // public donutChartLabels: string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  // public donutChartType: ChartType = 'doughnut'; // Set chart type to doughnut

  // public donutChartData: ChartData<'doughnut'> = {
  //   labels: this.donutChartLabels,
  //   datasets: [
  //     {
  //       data: [300, 50, 100, 40, 120, 80], // Data values for each segment
  //       backgroundColor: [
  //         '#FF6384',
  //         '#36A2EB',
  //         '#FFCE56',
  //         '#4BC0C0',
  //         '#9966FF',
  //         '#FF9F40'
  //       ],
  //       hoverBackgroundColor: [
  //         '#FF6384',
  //         '#36A2EB',
  //         '#FFCE56',
  //         '#4BC0C0',
  //         '#9966FF',
  //         '#FF9F40'
  //       ]
  //     },
  //   ],
  // };
  chart:any;
  ngOnInit(): void {
    this.chart= new Chart("myChatr",this.donutChartOptions)
  }
}
