import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../core/models/course';
import { Button } from '../button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  imports: [Button, CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  @Input() course!: Course;

  @Input() showAddButton = true;

  @Output() addCourse = new EventEmitter<Course>();
}
