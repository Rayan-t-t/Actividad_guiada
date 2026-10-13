import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

type ColorPalette = 'azul' | 'verde' | 'morado';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly isDarkMode = signal(false);
  readonly colorPalette = signal<ColorPalette>('azul');
  readonly paletteName = computed(() => {
    const names: Record<ColorPalette, string> = {
      azul: 'Azul',
      verde: 'Verde',
      morado: 'Morado',
    };
    return names[this.colorPalette()];
  });

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

    const storedPalette = localStorage.getItem('color-palette');
    const palette: ColorPalette =
      storedPalette === 'verde' || storedPalette === 'morado'
        ? storedPalette
        : 'azul';
    this.setColorPalette(palette);
  }

  toggle(): void {
    this.setDarkMode(!this.isDarkMode());
    if (this.isBrowser) {
      localStorage.setItem('dark-mode', String(this.isDarkMode()));
    }
  }

  nextColorPalette(): void {
    const palettes: ColorPalette[] = ['azul', 'verde', 'morado'];
    const nextIndex = (palettes.indexOf(this.colorPalette()) + 1) % palettes.length;
    this.setColorPalette(palettes[nextIndex]);
    if (this.isBrowser) {
      localStorage.setItem('color-palette', this.colorPalette());
    }
  }

  private setColorPalette(palette: ColorPalette): void {
    this.colorPalette.set(palette);
    const paletteClasses: ColorPalette[] = ['azul', 'verde', 'morado'];
    const elements = [
      this.document.documentElement,
      this.document.querySelector('ion-app'),
    ];

    for (const element of elements) {
      element?.classList.remove(...paletteClasses.map((name) => `palette-${name}`));
      element?.classList.add(`palette-${palette}`);
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
