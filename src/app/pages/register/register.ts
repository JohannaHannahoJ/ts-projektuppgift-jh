import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterResponse } from '../../core/models/register-response';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-register',
  imports: [FormsModule, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username: string = "";
  password: string = "";

  message = signal(""); // För meddelanden i frontend
  authService = inject(AuthService); // används för att kunna anropa backends auth routes
  router = inject(Router);

  // körs när anv. skickar formuläret
  register(): void {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: (response: RegisterResponse) => {
        localStorage.setItem("flashMessage", response.message);
        this.router.navigate(["/login"]);
      },

      error: (error) => {
        this.message.set(error.error.message)
      }
    });
  }
}
