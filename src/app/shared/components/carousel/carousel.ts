import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  // array med sökvägar till bilderna i karusellen
  images = signal<string[]>([
    'assets/carousel1.jpg',
    'assets/carousel2.jpg',
    'assets/carousel3.jpg',
    'assets/carousel4.jpg',
    'assets/carousel5.jpg'
  ]);

  // lagrar index för aktuell bild
  currentIndex = signal(0);

  // visa nästa bild i karusellen
  next() {
    this.currentIndex.update(i =>
      // öka index med 1 och börja om från början vid sista bilden
      (i + 1) % this.images().length
    );
  }

  // visa föregående bild i karusellen
  prev() {
    this.currentIndex.update(i =>
      // minska index med 1 och hoppa till sista bilden om index blir negativt
      (i - 1 + this.images().length) % this.images().length
    );
  }
}
