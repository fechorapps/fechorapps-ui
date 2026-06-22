import { Component, ChangeDetectionStrategy, input, model, computed } from '@angular/core';

export interface ThemeOption {
  name: string;
  color: string;
}

export const DEFAULT_PALETTES: ThemeOption[] = [
  { name: 'Blue', color: '#3b82f6' },
  { name: 'Purple', color: '#8b5cf6' },
  { name: 'Green', color: '#22c55e' },
  { name: 'Orange', color: '#f97316' },
  { name: 'Rose', color: '#f43f5e' },
  { name: 'Teal', color: '#14b8a6' },
  { name: 'Emerald', color: '#10b981' },
];

@Component({
  selector: 'ui-color-theme-switcher',
  standalone: true,
  imports: [],
  templateUrl: './color-theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiColorThemeSwitcherComponent {
  readonly currentTheme = model<string>('Blue');
  readonly themes = input<ThemeOption[]>(DEFAULT_PALETTES);
  readonly showLabel = input<boolean>(true);

  readonly selectedTheme = computed(() => this.themes().find(t => t.name === this.currentTheme()) ?? this.themes()[0]);

  selectTheme(theme: ThemeOption): void {
    this.currentTheme.set(theme.name);
    document.documentElement.setAttribute('data-theme', theme.name.toLowerCase());
  }
}
