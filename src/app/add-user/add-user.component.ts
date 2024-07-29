import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  Name: string = '';
  Worktype: string = '';
  Minutes: number = 0;

  onSubmit() {
    let data = {
      Name: this.Name,
      Worktype: this.Worktype,
      Minutes: this.Minutes,
    };
    console.log(data);
  }
}
