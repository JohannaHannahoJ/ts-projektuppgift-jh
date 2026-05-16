import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Courses } from './pages/courses/courses';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MySchedule } from './pages/my-schedule/my-schedule';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "courses", component: Courses },
    { path: "login", component: Login },
    { path: "register", component: Register },
    { path: "my-schedule", component: MySchedule, canActivate: [authGuard] },
    { path: "", redirectTo: "home", pathMatch: "full" }, 
    { path: "404", component: NotFound }, 
    { path: "**", redirectTo: "404", pathMatch: "full" }
];
