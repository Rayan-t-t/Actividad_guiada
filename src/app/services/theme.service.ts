import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly isDarkMode = signal(false);

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const storedPreference = localStorage.getItem('dark-mode');
    const isDark =
      storedPreference === null
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : storedPreference === 'true';

    this.setDarkMode(isDark);
  }

  toggle(): void {
    this.setDarkMode(!this.isDarkMode());
    if (this.isBrowser) {
      localStorage.setItem('dark-mode', String(this.isDarkMode()));
    }
  }

  private setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.document.documentElement.classList.toggle('ion-palette-dark', isDark);
    this.document
      .querySelector('ion-app')
      ?.classList.toggle('ion-palette-dark', isDark);
  }
}
