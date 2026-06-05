import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { CourseService } from './core/services/course.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ts-projektuppgift-jh');

  // hämta kursservice
  courseService = inject(CourseService)

  // läs in kursdata när applikationen startar
  ngOnInit() {
    this.courseService.loadCourses();
  }
}
