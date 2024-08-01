import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AddUserComponent } from './add-user.component';
import { UserDataService } from '../service/User_data';
import { of } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userDataService: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserDataService', ['addUser']);

    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
      ],
      providers: [{ provide: UserDataService, useValue: spy }],
    }).compileComponents();

    userDataService = TestBed.inject(
      UserDataService
    ) as jasmine.SpyObj<UserDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addUser on form submit', () => {
    component.onSubmit();
    expect(userDataService.addUser).toHaveBeenCalledWith({
      id: 1,
      name: 'John Doe',
      workouts: [
        {
          type: 'Running',
          minutes: 30,
        },
      ],
    });
  });
});
