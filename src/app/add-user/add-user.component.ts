import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserDataService, User } from '../service/User_data';
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
  workoutType: string = '';
  minutes: number = 0;

  constructor(
    @Inject(UserDataService) private UserDataService: UserDataService
  ) {}

  onSubmit() {
    let data: User = {
      id: Math.random(),
      name: this.name,
      workouts: [{ type: this.workoutType, minutes: this.minutes }],
    };
    this.UserDataService.addUser(data);
    // Reset form fields if needed
    this.name = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}
