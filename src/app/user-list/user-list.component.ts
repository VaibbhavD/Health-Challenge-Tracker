import { Component } from '@angular/core';
import { UserDataService, User } from '../Services/User_data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  pagedUsers: User[] = [];
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  currentPage = 0;
  pageSize = 5;
  pageCount = 0;

  constructor(private UserDataService: UserDataService) {
    this.initializeData();
  }

  initializeData() {
    this.users = this.UserDataService.getUsers();
    this.filteredUsers = [...this.users];
  }
}
