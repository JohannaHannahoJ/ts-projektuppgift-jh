import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ScheduledCourse } from '../models/scheduled-course';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private http = inject(HttpClient); // lägg till httpClient så att det går att kommunicera med api
  url: string = "https://ts-projektuppgift-jh-postgres.onrender.com";

  // signal som lagrar kurser
  courses = signal<Course[]>([]);

  // funktion för headers och token för auth
  private getHeaders() {
    const token = localStorage.getItem("token"); // hämta token fr ls
    return {
      "Authorization": `Bearer ${token}` // skapa headers
    };
  }

  // läs in kurser
  loadCourses(): void {
    this.http.get<Course[]>(this.url + '/courses', { headers: this.getHeaders() })
      .subscribe({
        next: (data) => this.courses.set(data),
        error: (err) => console.error(err)
      });
  }

  // lägg till kurs
  addCourse(scheduledCourse: ScheduledCourse): Observable<ApiResponse> {
    // skicka POST-request med auth headers
    return this.http.post<ApiResponse>(this.url + '/courses', scheduledCourse, { headers: this.getHeaders() });
  }

  // ta bort kurs
  deleteCourse(scheduledCourse: ScheduledCourse): Observable<ApiResponse> {
    // skicka DELETE-request med auth headers
    return this.http.delete<ApiResponse>(this.url + '/courses/' + scheduledCourse.courseCode,
      { headers: this.getHeaders() });
  }
}