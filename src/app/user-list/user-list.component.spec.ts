import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UserListComponent } from './user-list.component';
import { UserDataService } from '../service/User_data';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userDataService: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserDataService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatSelectModule,
      ],
      providers: [{ provide: UserDataService, useValue: spy }],
    }).compileComponents();

    userDataService = TestBed.inject(
      UserDataService
    ) as jasmine.SpyObj<UserDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userDataService.getUsers.and.returnValue([
      { name: 'John Doe', workoutType: 'Running', minutes: 30 },
      { name: 'Jane Smith', workoutType: 'Swimming', minutes: 60 },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users in the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mat-cell').length).toBe(6); // 2 rows x 3 columns
  });

  it('should filter users by workout type', () => {
    component.filterByWorkoutType('Running');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mat-cell').length).toBe(3); // 1 row x 3 columns
  });
});
