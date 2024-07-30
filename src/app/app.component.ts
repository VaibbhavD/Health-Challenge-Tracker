import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { WorkoutChartComponent } from './workout-charts/workout-charts.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddUserComponent,
    UserListComponent,
    WorkoutChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Health_Challenger_Tracker';
}
