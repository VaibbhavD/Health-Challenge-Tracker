import { Component, Inject } from '@angular/core';
import { UserDataService, User } from '../service/User_data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
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
  isShowFilter: boolean = false;

  constructor(
    @Inject(UserDataService) private userDataService: UserDataService
  ) {
    this.initializeData();
  }

  initializeData() {
    this.userDataService.getUsersObservable().subscribe((users) => {
      this.users = users;
      if (!this.users) {
        this.users = [
          {
            id: 1,
            name: 'John Doe',
            workouts: [
              { type: 'Running', minutes: 30 },
              { type: 'Cycling', minutes: 45 },
            ],
          },
          {
            id: 2,
            name: 'Jane Smith',
            workouts: [
              { type: 'Swimming', minutes: 60 },
              { type: 'Running', minutes: 20 },
            ],
          },
          {
            id: 3,
            name: 'Mike Johnson',
            workouts: [
              { type: 'Yoga', minutes: 50 },
              { type: 'Cycling', minutes: 40 },
            ],
          },
        ];
      }
      this.filteredUsers = [...this.users];
      this.updatePageCount();
      this.updatePageUsers();
    });
  }

  filterShow() {
    this.isShowFilter = !this.isShowFilter;
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
    this.currentPage = 0;
    this.updatePageCount();
    this.updatePageUsers();
  }

  filterByWorkoutType(type: string) {
    this.filteredUsers = type
      ? this.users.filter((user) =>
          user.workouts.some((workout) => workout.type === type)
        )
      : [...this.users];
    this.currentPage = 0;
    this.updatePageCount();
    this.updatePageUsers();
  }

  updatePageCount() {
    this.pageCount = Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  updatePageUsers() {
    const start = this.currentPage * this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.pageCount - 1) {
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
  getTotalMinutes(workouts: { type: string; minutes: number }[]): number {
    return workouts.reduce((total, workout) => (total += workout.minutes), 0);
  }
}
