import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgFor, CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product { name: string; price: number; image: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CurrencyPipe, NgIf,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroVideoEl') heroVideoEl?: ElementRef<HTMLVideoElement>;

  products = [
  { name: 'Camisas Dama',     price: 59.99, image: 'https://picsum.photos/seed/camisasdama/300/400' },
  { name: 'Blusas Dama',      price: 120,   image: 'https://picsum.photos/seed/blusasdama/300/400' },
  { name: 'Cardigans',        price: 70.5,  image: 'https://picsum.photos/seed/cardigans/300/400' },
  { name: 'Pijamas Dama',     price: 59.99, image: 'https://picsum.photos/seed/camisasnina/300/400' },
  { name: 'Leggins Dama',   price: 120,   image: 'https://picsum.photos/seed/conjuntosnina/300/400' },
  { name: 'Busos Niña',       price: 70.5,  image: 'https://picsum.photos/seed/busosnina/300/400' },
  { name: 'Leggins Niña',     price: 59.99, image: 'https://picsum.photos/seed/legginsnina/300/400' },
  { name: 'Pijamas Niña',     price: 120,   image: 'https://picsum.photos/seed/pijamasdama/300/400' },
  { name: 'Camisas Niña',   price: 70.5,  image: 'https://picsum.photos/seed/pijamasdama2/300/400' },
  { name: 'Conjuntos Niña',     price: 59.99, image: 'https://picsum.photos/seed/legginsdama/300/400' }
];


  showBrandReveal = false;
  private brandRevealTimeoutId: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit() {
    const video = this.heroVideoEl?.nativeElement;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('fetchpriority', 'high');

    const tryPlay = async () => {
      try {
        if (video.paused) {
          await video.play();
        }
      } catch {
        // Ignorar errores de autoplay; el usuario podrá iniciar el video manualmente.
      }
    };

    const handleReady = () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      void tryPlay();
    };

    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      handleReady();
    } else {
      video.addEventListener('loadeddata', handleReady);
      video.addEventListener('canplay', handleReady);
      video.load();
    }

    void tryPlay();

    this.brandRevealTimeoutId = setTimeout(() => {
      this.showBrandReveal = true;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.brandRevealTimeoutId !== null) {
      clearTimeout(this.brandRevealTimeoutId);
    }
  }
}