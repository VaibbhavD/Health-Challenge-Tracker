// src/app/services/user-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface workouts {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: workouts[];
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private storageKey = 'workout-tracker-users';
  private usersSubject: BehaviorSubject<User[]>;

  constructor() {
    const initialUsers = this.getUsersFromLocalStorage();
    if (initialUsers.length == 0) {
      this.initializeDefaultUsers();
    }
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
    const users = this.getUsers();
    const existingUserIndex = users.findIndex((u) => u.name === user.name);

    if (existingUserIndex !== -1) {
      // User already exists, update or add workouts
      const existingUser = users[existingUserIndex];

      user.workouts.forEach((newWorkout) => {
        const existingWorkoutIndex = existingUser.workouts.findIndex(
          (workout) => workout.type === newWorkout.type
        );

        if (existingWorkoutIndex !== -1) {
          // Workout type exists
          const existingWorkout = existingUser.workouts[existingWorkoutIndex];

          if (newWorkout.minutes > 0) {
            existingWorkout.minutes += newWorkout.minutes;
          } else if (
            existingWorkout.minutes === 0 &&
            newWorkout.minutes !== 0
          ) {
            existingWorkout.minutes = newWorkout.minutes;
          }
        } else {
          // Workout type does not exist, add new workout
          existingUser.workouts.push(newWorkout);
        }
      });
    } else if (this.isValidUser(user)) {
      // User does not exist, add new user
      users.push(user);
    } else {
      console.error('Invalid user data:', user);
      return;
    }

    this.setUsersToLocalStorage(users);
    this.usersSubject.next(users);
  }

  private isValidUser(user: User): boolean {
    return (
      user.name.trim() !== '' &&
      user.workouts[user.workouts.length - 1].type.trim() !== '' &&
      user.workouts[user.workouts.length - 1].minutes > 0
    );
  }
  private initializeDefaultUsers(): void {
    const defaultUsers: User[] = [
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
    this.setUsersToLocalStorage(defaultUsers);
  }
}
