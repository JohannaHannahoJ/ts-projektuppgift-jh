import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-data',
  imports: [],
  templateUrl: './sort-data.html',
  styleUrl: './sort-data.css',
})
export class SortData {
  @Output() sortChange = new EventEmitter<
  "courseCode" | "courseName" | "points" | "subject"
>();
}
