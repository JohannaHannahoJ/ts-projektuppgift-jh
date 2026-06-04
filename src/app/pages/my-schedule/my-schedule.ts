import { Component, computed, inject, signal } from '@angular/core';
import { ScheduleService } from '../../core/services/schedule.service';
import { CourseCard } from '../../shared/components/course-card/course-card';
import { SortData } from '../../shared/components/sort-data/sort-data';
import { ScheduledCourse } from '../../core/models/scheduled-course';
import { Course } from '../../core/models/course';

@Component({
  selector: 'app-my-schedule',
  imports: [CourseCard, SortData],
  templateUrl: './my-schedule.html',
  styleUrl: './my-schedule.css',
})
export class MySchedule {
  scheduleService = inject(ScheduleService);

  // hämtar kurser från databas och gör dem till signal
  courses = this.scheduleService.courses;

  // signal för meddelanden
  message = signal("");
  // signal som lagrar vilket av fälten som ska sorteras
  sortField = signal<"courseCode" | "courseName" | "points" | "subject">("courseCode");
  // signal som lagrar om sorteringen är stigande/fallande
  sortDirection = signal<"asc" | "desc">("asc");

  // laddar in kurser och hämtar ev meddelande
  ngOnInit() {
    this.scheduleService.loadCourses();
    const msg = localStorage.getItem("flashMessage");

    if (msg) {
      this.message.set(msg);
      localStorage.removeItem("flashMessage");
    }
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
  // returnerar en sorterad kopia av listan av lagrade kurser
  sortedCourses = computed(() => {
    // hämtar aktuella kurser från signalen
    const courses = this.courses();
    // hämtar valt sorteringsfält och riktning
    const field = this.sortField();
    const direction = this.sortDirection();
    // skapar en ny, sorterad array med kurser
    return [...courses].sort((a, b) => {

      //vid stigande sort
      if (direction === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      // fallande
      return a[field] < b[field] ? 1 : -1;
    });
  });

  // skapar en computed signal som uppdateras om valda-kurser ändras
  totalPoints = computed(() => {
    const courses = this.courses(); // hämta in aktuell kurslista

    // summerar kurspoängen för kurserna
    return courses.reduce((sum: number, course: Course) => {
      // gör om från string till tal och lägg till poäng till totalen, returnera = om null/undefined
      return sum + (Number(course.points) || 0);
    }, 0); // startvärde för summeringen
  });

  // ta bort kurs
  deleteCourse(scheduledCourse: ScheduledCourse) {
    // anropa service för att ta bort kurs från databasen
    this.scheduleService.deleteCourse(scheduledCourse).subscribe({
      // om req lyckas
      next: () => {
        this.message.set("Kurs borttagen.");
        // fulfix-- ladda om sidan
        this.scheduleService.loadCourses();
      },
      // felhantering
      error: (error) => {
        // auth-fel, logga ut och redirect
        this.scheduleService.authService.handleAuthError(error);
        this.message.set(error.error?.message ?? "Kunde inte ta bort kursen.");
      }
    });

  }
}