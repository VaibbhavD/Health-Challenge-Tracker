// src/app/services/user-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  workoutType: string;
  minutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private storageKey = 'workout-tracker-users';
  private usersSubject: BehaviorSubject<User[]>;

  constructor() {
    const initialUsers = this.getUsersFromLocalStorage();
    this.usersSubject = new BehaviorSubject<User[]>(initialUsers);
  }

  private getUsersFromLocalStorage(): User[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private setUsersToLocalStorage(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  getUsers(): User[] {
    return this.usersSubject.value;
  }

  getUsersObservable() {
    return this.usersSubject.asObservable();
  }

  addUser(user: User): void {
    if (this.isValidUser(user)) {
      const users = this.getUsers();
      users.push(user);
      this.setUsersToLocalStorage(users);
      this.usersSubject.next(users); // Emit the new user list
    } else {
      console.error('Invalid user data:', user);
    }
  }

  private isValidUser(user: User): boolean {
    return (
      user.name.trim() !== '' &&
      user.workoutType.trim() !== '' &&
      user.minutes > 0
    );
  }
}
