import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Course } from '../models/course';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";
  private http = inject(HttpClient) // aktiverar HttpClient

  courses = signal<Course[]>([]); // signal som ska lagra kurserna
  loading = signal<boolean>(false); // signal som håller koll på om data laddas

  // felhantering
  error = signal<string | null>(null);

  async loadCourses(): Promise<void> {
    this.loading.set(true); // sätt igång laddning
    this.error.set(null); // nollställ fel

    try {
      //Skicka request till Api:t
      const courses = await firstValueFrom(
        this.http.get<Course[]>(this.url)
      );
      //Sparar kurserna i signalen
      this.courses.set(courses);

    } finally {
      // avsluta laddning genom att sätta booleanen till false
      this.loading.set(false);

    }

  }
}
