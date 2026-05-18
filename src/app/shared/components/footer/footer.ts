import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  username = signal("");

  ngOnInit() {
    const stored = localStorage.getItem("username");
    if (stored) {
      this.username.set(stored);
    }
  }
}
