import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  // aktuell sida, hämtas från parent (courses)
  @Input() currentPage = 1;
  // antal sidor hämtas från parent
  @Input() pageCount = 1;
  // skickar tillbaka vald sida till parent
  @Output() pageChange = new EventEmitter<number>();

  // gå till första sid
  firstPage() {
    this.pageChange.emit(1);
  }
  // gå tillbaka en sida, stopp sid 1
  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
  // går fram en sida, max till sista
  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
  // gå till sista sidan av arrayen
  lastPage() {
    this.pageChange.emit(this.pageCount);
  }
}
