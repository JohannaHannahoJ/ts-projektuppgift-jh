import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ScheduledCourse } from '../models/scheduled-course';
import { Observable } from 'rxjs';
import { AddCourseResponse } from '../models/add-course-response';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private http = inject(HttpClient); // lägg till httpClient så att det går att kommunicera med api
  url: string = "http://localhost:3000";

  // funktion för headers och token för auth
  private getHeaders() {
    const token = localStorage.getItem("token"); // hämta token fr ls
    return {
      "Authorization": `Bearer ${token}` // skapa headers
    };
  }

  // lägg till kurs
  addCourse(scheduledCourse: ScheduledCourse): Observable<AddCourseResponse> {

    // skicka POST-request med auth headers
    return this.http.post<AddCourseResponse>(this.url + '/courses', scheduledCourse, { headers: this.getHeaders() });
  }
}
