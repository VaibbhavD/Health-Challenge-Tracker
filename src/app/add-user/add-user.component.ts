import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserDataService, User } from '../Services/User_data';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  name: string = '';
  workoutType: string = 'Cycling';
  minutes: number = 0;

  constructor(private UserDataService: UserDataService) {}

  onSubmit() {
    let data: User = {
      name: this.name,
      workoutType: this.workoutType,
      minutes: this.minutes,
    };
    this.UserDataService.addUser(data);
    // Reset form fields if needed
    this.name = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}
