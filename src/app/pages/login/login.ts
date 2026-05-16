import { Component, inject, signal } from '@angular/core';
import { User } from '../../core/models/user';
import { LoginResponse } from '../../core/models/login-response';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = "";
  password: string = "";

  message = signal("");
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    const msg = localStorage.getItem("flashMessage");

    if (msg) {
      this.message.set(msg);
      localStorage.removeItem("flashMessage");
    }
  }

  login(): void {
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.authService.login(user).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem("flashMessage", "Välkommen " + this.username + "!");
        localStorage.setItem("token", response.token);

        this.router.navigate(["/my-schedule"]);
      },

      error: (error) => {
        this.message.set(error.error.message);
      }
    });
  }
}
