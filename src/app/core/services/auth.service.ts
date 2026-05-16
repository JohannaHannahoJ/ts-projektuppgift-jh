import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient); // används för http-anrop till backend
    url: string = "http://localhost:3000"

  register(user: User): Observable<RegisterResponse> {
    // User skickas med i request body, svaret typas som RegisterResponse
    return this.http.post<RegisterResponse>(this.url + "/users/register", user);
  }
}
