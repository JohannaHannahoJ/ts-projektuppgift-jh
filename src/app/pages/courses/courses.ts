import { Component, computed, inject, signal } from '@angular/core';
import { CourseService } from '../../core/services/course.service';
import { CourseCard } from '../../shared/components/course-card/course-card';
import { SearchBar } from '../../shared/components/search-bar/search-bar';
import { SubjectFilter } from '../../shared/components/subject-filter/subject-filter';
import { ScheduleService } from '../../core/services/schedule.service';
import { Course } from '../../core/models/course';
import { ScheduledCourse } from '../../core/models/scheduled-course';
import { SortData } from '../../shared/components/sort-data/sort-data';
import { ApiResponse } from '../../core/models/api-response';
import { Pagination } from '../../shared/components/pagination/pagination';

@Component({
  selector: 'app-courses',
  imports: [CourseCard, SearchBar, SubjectFilter, SortData, Pagination],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  courseService = inject(CourseService)
  scheduleService = inject(ScheduleService);

  // signal som lagrar vilket av fälten som ska sorteras
  sortField = signal<"courseCode" | "courseName" | "points" | "subject">("courseCode");
  // signal som lagrar om sorteringen är stigande/fallande
  sortDirection = signal<"asc" | "desc">("asc");
  // sökterm som anv skriver in
  filterText = signal("");
  // lagrar ämne som anv valt att filtrera på, utan val visa alla ämnen
  selectedSubject = signal("all");
  // signal för meddelanden
  message = signal("");
  //signaler för paginering
  currentPage = signal(1);
  pageSize = 10;

  // bläddra till första sida vid uppdaterad sökning
  updateSearch(text: string) {
    this.filterText.set(text);
    this.currentPage.set(1);
  }

  // bläddra till första sida vid uppdaterad ämnesfilter
  updateSubject(subject: string) {
    this.selectedSubject.set(subject);
    this.currentPage.set(1);
  }

  // Funktion som körs när användaren klickar på en av sorteringsknapparna
  setSort(field: "courseCode" | "courseName" | "points" | "subject") {

    if (this.sortField() === field) {
      // om klick på redan vald kolumn, byt riktning
      this.sortDirection.update(dir => dir === "asc" ? "desc" : "asc");
    } else {
      // om klick på ny kolumn, stigande sortering
      this.sortField.set(field);
      this.sortDirection.set("asc");
    }
  }

  // returnerar en sorterad och filtrerad kopia av kurslistan
  sortedCourses = computed(() => {
    // hämta sökfras och gör så att den inte är case sensitive
    const search = this.filterText().trim().toLowerCase();
    // hämta valt kursfilter
    const subject = this.selectedSubject();

    // Filtrerar kurser utifrån sökfras
    const searchFiltered = this.courseService.courses().filter(course =>
      course.courseCode.toLowerCase().includes(search) ||
      course.courseName.toLowerCase().includes(search)
    );

    // filtrerar arrayen efter ämne, visar alla ämnen om inget valt
    const filtered = searchFiltered.filter(course =>
      subject === "all" || course.subject === subject
    );

    // hämta valt sorteringsfält
    const field = this.sortField();
    // hämta sorteringsriktning
    const direction = this.sortDirection();

    // skapa kopia av arrayen och sortera den
    return [...filtered].sort((a, b) => {

      // stigande ordning
      if (direction === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }

      // fallande ordning
      return a[field] < b[field] ? 1 : -1;
    });
  });

  // beräknar totalt antal sidor till paginering
  pageCount = computed(() =>
    Math.ceil(this.sortedCourses().length / this.pageSize)
  );

  // Skapa paginerad lista, returnerar kurser för aktuell sida
  pagedCourses = computed(() => {
    // första index på sidan
    const start = (this.currentPage() - 1) * this.pageSize;
    // sista index på sidan
    const end = start + this.pageSize;
    return this.sortedCourses().slice(start, end);
  });

  // skapa en array med alla ämnen
  subjects = computed(() => {
    const courses = this.courseService.courses();

    return [...new Set(courses.map(c => c.subject))];
  });

  // lagra antal kurser i arrayen
  totalCourses = computed(() => this.sortedCourses().length);

  // lagra totalt antal kurser innan filtrering
  allCourses = computed(() => this.courseService.courses().length);

  addCourseToSchedule(course: Course): void {

    // definiera objektet för sparade kurser och vilka värden som ska skickas med
    let courseData: ScheduledCourse = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      points: course.points,
      subject: course.subject,
      syllabus: course.syllabus
    }

    this.scheduleService.addCourse(courseData).subscribe({
      next: (response: ApiResponse) => {
        this.message.set(response.message);
      },

      error: (error) => {
        console.log(error);
        this.message.set(error.error.message || "Något gick fel");
      }

    });

    setTimeout(() => {
      this.message.set("");
    }, 2500);

  }

}
