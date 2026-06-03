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
  // kurs som ska visas i kortet
  @Input() course!: Course;
  // styr om "Lägg till"-knappen visas
  @Input() showAddButton = true;

  // skickar kurs för tillägg i schema
  @Output() addCourse = new EventEmitter<Course>();
  // skickar kurs för borttagning från schema
  @Output() deleteCourse = new EventEmitter<Course>();
}
