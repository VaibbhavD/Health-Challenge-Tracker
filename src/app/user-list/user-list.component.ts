import { Component } from '@angular/core';
import { UserDataService, User } from '../Services/User_data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  worktype: string = '';

  constructor(private UserDataService: UserDataService) {
    this.initializeData();
  }

  initializeData() {
    this.UserDataService.getUsersObservable().subscribe((users) => {
      this.users = this.UserDataService.getUsers();
      this.filteredUsers = [...this.users];
      this.updatePageCount();
      this.updatePageUsers();
    });
  }

  applyfilter(event: any) {
    const filtervalue = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLocaleLowerCase().includes(filtervalue)
    );
    this.currentPage = 0;
    this.updatePageCount();
    this.updatePageUsers();
  }

  filterByWorkoutType(type: string) {
    this.filteredUsers = type
      ? this.users.filter((user) => user.workoutType == type)
      : [...this.users];
    this.updatePageCount();
    this.updatePageUsers();
  }

  updatePageCount() {
    this.pageCount = Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  updatePageUsers() {
    let start = this.currentPage * this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
      this.updatePageUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePageUsers();
    }
  }
}
