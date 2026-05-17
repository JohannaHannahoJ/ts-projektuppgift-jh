import { Component, computed, inject, signal } from '@angular/core';
import { CourseService } from '../../core/services/course.service';
import { CourseCard } from '../../shared/components/course-card/course-card';
import { SearchBar } from '../../shared/components/search-bar/search-bar';
import { SubjectFilter } from '../../shared/components/subject-filter/subject-filter';
import { ScheduleService } from '../../core/services/schedule.service';
import { Course } from '../../core/models/course';
import { ScheduledCourse } from '../../core/models/scheduled-course';

@Component({
  selector: 'app-courses',
  imports: [CourseCard, SearchBar, SubjectFilter],
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

  ngOnInit() {
    console.log('FILTER TEXT INIT:', this.filterText());
    this.courseService.loadCourses();

    console.log('CURRENT COURSES:', this.courseService.courses());
  }

  // Funktion som körs när användaren klickar på ett av <th>-fälten
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

  // skapa en array med alla ämnen
  subjects = computed(() => {
    const courses = this.courseService.courses();

    return [...new Set(courses.map(c => c.subject))];
  });

  // lagra antal kurser i arrayen
  totalCourses = computed(() => this.sortedCourses().length);

  addCourseToSchedule(course: Course): void {

    console.log("Kilck");
    console.log(course);


    // definiera objektet för sparade kurser och vilka värden som ska skickas med
    let courseData: ScheduledCourse = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      points: course.points,
      subject: course.subject,
      syllabus: course.syllabus
    }

    this.scheduleService.addCourse(courseData).subscribe({
      next: (response) => {
        this.message.set(response.message);
      },

      error: (error) => {
        console.log(error);
        this.message.set(error.error.message);
      }

    });

    setTimeout(() => {
      this.message.set("");
    }, 2500);

  }

}
