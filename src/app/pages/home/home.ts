import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgFor, CurrencyPipe, NgIf } from '@angular/common';

interface Product { name: string; price: number; image: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CurrencyPipe, NgIf],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroVideoEl') heroVideoEl?: ElementRef<HTMLVideoElement>;

  products = [
    { name: 'Camisa denim', price: 59.99, image: 'https://via.placeholder.com/300' },
    { name: 'Chaqueta cuero', price: 120,   image: 'https://via.placeholder.com/300' },
    { name: 'Jeans skinny',  price: 70.5,   image: 'https://via.placeholder.com/300' }
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