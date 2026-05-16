import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  // låt button ta emot type som input
  @Input() type: 'button' | 'submit' = 'button';
}
