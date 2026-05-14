import { Component, Input } from '@angular/core';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  @Input() course!: Course;

  @Input() showAddButton = true;
}
