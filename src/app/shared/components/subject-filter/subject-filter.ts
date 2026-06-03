import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-subject-filter',
  imports: [],
  templateUrl: './subject-filter.html',
  styleUrl: './subject-filter.css',
})
export class SubjectFilter {
  @Input() subjects: string[] = [];
  @Output() subjectChange = new EventEmitter<string>();
}
