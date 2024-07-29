import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Health_Challenger_Tracker';
}
