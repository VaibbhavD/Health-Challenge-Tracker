import { Component, Inject, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { UserDataService, User } from '../service/User_data';
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
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  barChartLegend = true;
  barChartPlugins = [];
  barChartType: ChartType = 'bar';

  constructor(
    @Inject(UserDataService) private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    const users = this.userDataService.getUsers();
    this.barChartLabels = users.map((user) => user.name);

    const workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
    const datasets = workoutTypes.map((type) => {
      return {
        data: users.map((user) => this.getTotalMinutesByType(user, type)),
        label: type,
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        borderWidth: 1,
      };
    });

    this.barChartData = {
      labels: this.barChartLabels,
      datasets: datasets,
    };
  }

  getTotalMinutesByType(user: User, type: string): number {
    const workout = user.workouts.find((workout) => workout.type === type);
    return workout ? workout.minutes : 0;
  }

  getRandomColor(): string {
    // Generate random color for each bar
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  }
}
