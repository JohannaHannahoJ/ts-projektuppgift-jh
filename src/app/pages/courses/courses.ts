import { Component, inject } from '@angular/core';
import { CourseService } from '../../core/services/course.service';
import { CourseCard } from '../../shared/components/course-card/course-card';

@Component({
  selector: 'app-courses',
  imports: [CourseCard],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  courseService = inject(CourseService)

  ngOnInit() {
  this.courseService.loadCourses();

  console.log('CURRENT COURSES:', this.courseService.courses());
}
}
