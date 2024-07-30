import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { UserDataService } from '../service/User_data';

import { WorkoutChartComponent } from './workout-charts.component';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;
  let userDataService: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserDataService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [WorkoutChartComponent],
      imports: [BaseChartDirective],
      providers: [{ provide: UserDataService, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    userDataService = TestBed.inject(
      UserDataService
    ) as jasmine.SpyObj<UserDataService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutChartComponent);
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

  it('should load chart data', () => {
    expect(component.barChartLabels).toEqual(['John Doe', 'Jane Smith']);
  });
});
