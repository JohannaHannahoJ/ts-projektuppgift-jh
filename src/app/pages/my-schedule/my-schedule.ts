import { Component, inject, signal } from '@angular/core';
import { ScheduleService } from '../../core/services/schedule.service';
import { CourseCard } from '../../shared/components/course-card/course-card';

@Component({
  selector: 'app-my-schedule',
  imports: [CourseCard],
  templateUrl: './my-schedule.html',
  styleUrl: './my-schedule.css',
})
export class MySchedule {
  message = signal("");

  scheduleService = inject(ScheduleService);

  courses = this.scheduleService.getCourses();

  ngOnInit() {
    const msg = localStorage.getItem("flashMessage");

    if (msg) {
      this.message.set(msg);
      localStorage.removeItem("flashMessage");
    }
  }
}
