import { Component, Inject, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { UserDataService } from '../Services/User_data';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './workout-charts.component.html',
  styleUrls: ['./workout-charts.component.css'],
})
export class WorkoutChartComponent implements OnInit {
  barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [],
    labels: [],
  };
  barChartLabels: string[] = []; // Define barChartLabels
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  barChartLegend = true;
  barChartPlugins = [];
  barChartType: ChartType = 'bar'; // Define barChartType

  constructor(
    @Inject(UserDataService) private UserDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    const users = this.UserDataService.getUsers();
    this.barChartLabels = users.map((user) => user.name);
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: users.map((user) => user.minutes),
          label: 'Minutes',
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
          borderColor: 'rgba(63, 81, 181, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}
