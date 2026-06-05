import { Component, computed, inject } from '@angular/core';
import { Carousel } from '../../shared/components/carousel/carousel';
import { CourseService } from '../../core/services/course.service';

@Component({
  selector: 'app-home',
  imports: [Carousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  courseService = inject(CourseService);

  // antal kurser
  totalCourses = computed(() =>
    this.courseService.courses().length
  );

  // antal ämnen
  totalSubjects = computed(() =>
    new Set(this.courseService.courses().map(c => c.subject)).size
  );
}
