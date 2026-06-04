import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';
import { RegisterResponse } from '../models/register-response';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient); // används för http-anrop till backend
  url: string = "https://ts-projektuppgift-jh-postgres.onrender.com";

  token = signal(localStorage.getItem("token") || "");
  username = signal(localStorage.getItem("username") || "");
  isLoggedIn = computed(() => !!this.token());

  router = inject(Router);

  // Skapa konto
  register(user: User): Observable<RegisterResponse> {
    // User skickas med i request body, svaret typas som RegisterResponse
    return this.http.post<RegisterResponse>(this.url + "/users/register", user);
  }

  // Logga in
  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + "/users/login", user)
      .pipe(
        tap(response => {
          this.token.set(response.token);
          this.username.set(user.username);
          localStorage.setItem("token", response.token);
          localStorage.setItem("username", user.username);
        })
      )
  }

  // Logga ut
  logout(): void {
    this.token.set("");
    this.username.set("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("flashMessage");
    this.router.navigate(["/home"]);
  }

  // Funktion som loggar ut och redirectar om token saknas eller är ogiltig
  handleAuthError(error: any) {
    if (error.status === 401 || error.status === 403) {
      this.logout();
    }
  }
}
