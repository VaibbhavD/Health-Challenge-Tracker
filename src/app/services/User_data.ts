import { Injectable } from '@angular/core';

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

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      this.initializeData();
    }
  }

  private initializeData(): void {
    const initialData: User[] = [
      { name: 'John Doe', workoutType: 'Running', minutes: 30 },
      { name: 'Jane Smith', workoutType: 'Swimming', minutes: 60 },
      { name: 'Mike Johnson', workoutType: 'Yoga', minutes: 50 },
    ];
    this.setLocalStorage(initialData);
  }

  private setLocalStorage(data: User[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error('Could not save data to localStorage:', e);
    }
  }

  getUsers(): User[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addUser(user: User): void {
    if (this.isValidUser(user)) {
      const users = this.getUsers();
      users.push(user);
      this.setLocalStorage(users);
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
