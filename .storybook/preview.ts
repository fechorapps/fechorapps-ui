import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TranslocoTestingModule } from '@jsverse/transloco';

const translocoTesting = TranslocoTestingModule.forRoot({
  langs: {
    en: {
      common: {
        pagination: {
          rowsPerPage: 'Rows per page',
          page: 'Page',
          of: 'of',
          firstPage: 'First page',
          previousPage: 'Previous page',
          nextPage: 'Next page',
          lastPage: 'Last page',
          goToPage: 'Go to page',
          goToPageN: 'Go to page {{page}}',
        },
      },
    },
  },
  translocoConfig: { defaultLang: 'en', availableLangs: ['en'] },
});

// =============================================================================
// THEME COLORS - maps to --theme-primary-* CSS variables (palettes.css)
// =============================================================================
const themeColors = {
  // Metronic Colors
  'metronic-blue':    { 50: '#e6f4ff', 100: '#b3e0ff', 200: '#80ccff', 300: '#4db8ff', 400: '#1aa4ff', 500: '#009EF7', 600: '#0087d4', 700: '#0070b1', 800: '#00598e', 900: '#00426b' },
  'metronic-purple':  { 50: '#f3edfd', 100: '#e0d1f9', 200: '#c9aef4', 300: '#b18bef', 400: '#9a68ea', 500: '#7239EA', 600: '#5c2dc0', 700: '#472396', 800: '#32196c', 900: '#1d0f42' },
  'metronic-success': { 50: '#edfaf3', 100: '#d0f2e0', 200: '#a8e8c5', 300: '#7fdea9', 400: '#5cd48e', 500: '#50CD89', 600: '#3fb06f', 700: '#2f9356', 800: '#20763d', 900: '#105924' },
  'metronic-danger':  { 50: '#fef0f3', 100: '#fcd9e1', 200: '#f9b3c3', 300: '#f68da5', 400: '#f36787', 500: '#F1416C', 600: '#d12a52', 700: '#a11f3e', 800: '#71152b', 900: '#410b18' },
  'metronic-warning': { 50: '#fff9e6', 100: '#ffefb3', 200: '#ffe580', 300: '#ffdb4d', 400: '#ffd11a', 500: '#FFC700', 600: '#d4a600', 700: '#a98500', 800: '#7e6400', 900: '#534300' },
  'metronic-info':    { 50: '#e6f7ff', 100: '#b3e7ff', 200: '#80d7ff', 300: '#4dc7ff', 400: '#1ab7ff', 500: '#00A3FF', 600: '#0088d4', 700: '#006da9', 800: '#00527e', 900: '#003753' },
  'metronic-dark':    { 50: '#e8e9ec', 100: '#c5c7d0', 200: '#9fa3b3', 300: '#797f96', 400: '#535b79', 500: '#3F4254', 600: '#2d3043', 700: '#1e2132', 800: '#181C32', 900: '#0d0f1a' },
  // Tailwind Colors
  blue:    { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
  indigo:  { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81' },
  violet:  { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95' },
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b' },
  teal:    { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a' },
  cyan:    { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63' },
  rose:    { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337' },
  amber:   { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f' },
  slate:   { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
};

type ThemeColorKey = keyof typeof themeColors;

function applyThemeColors(colorKey: ThemeColorKey): void {
  const colors = themeColors[colorKey];
  if (!colors) return;
  const root = document.documentElement;
  // Set --theme-primary-* so palettes.css + @theme map flows correctly
  root.style.setProperty('--theme-primary-50',  colors[50]);
  root.style.setProperty('--theme-primary-100', colors[100]);
  root.style.setProperty('--theme-primary-200', colors[200]);
  root.style.setProperty('--theme-primary-300', colors[300]);
  root.style.setProperty('--theme-primary-400', colors[400]);
  root.style.setProperty('--theme-primary-500', colors[500]);
  root.style.setProperty('--theme-primary-600', colors[600]);
  root.style.setProperty('--theme-primary-700', colors[700]);
  root.style.setProperty('--theme-primary-800', colors[800]);
  root.style.setProperty('--theme-primary-900', colors[900]);
}

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideAnimationsAsync(), importProvidersFrom(LucideAngularModule, translocoTesting)],
    }),
    (story, context) => {
      const isDark = context.globals['theme'] === 'dark';
      const colorTheme = (context.globals['colorTheme'] ?? 'metronic-blue') as ThemeColorKey;

      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDark);
        document.body.style.backgroundColor = isDark ? 'var(--background, #09090b)' : 'var(--background, #ffffff)';
        applyThemeColors(colorTheme);
      }

      return story();
    },
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light or dark mode',
      defaultValue: 'dark',
      toolbar: {
        icon: 'moon',
        items: [
          { value: 'dark',  icon: 'moon', title: 'Dark' },
          { value: 'light', icon: 'sun',  title: 'Light' },
        ],
      },
    },
    colorTheme: {
      name: 'Color',
      description: 'Primary color theme',
      defaultValue: 'metronic-blue',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'metronic-blue',    title: 'Metronic Blue',    right: '#009EF7' },
          { value: 'metronic-purple',  title: 'Metronic Purple',  right: '#7239EA' },
          { value: 'metronic-success', title: 'Metronic Success', right: '#50CD89' },
          { value: 'metronic-danger',  title: 'Metronic Danger',  right: '#F1416C' },
          { value: 'metronic-warning', title: 'Metronic Warning', right: '#FFC700' },
          { value: 'metronic-info',    title: 'Metronic Info',    right: '#00A3FF' },
          { value: 'metronic-dark',    title: 'Metronic Dark',    right: '#181C32' },
          { value: 'blue',    title: 'Tailwind Blue',    right: '#3b82f6' },
          { value: 'indigo',  title: 'Tailwind Indigo',  right: '#6366f1' },
          { value: 'violet',  title: 'Tailwind Violet',  right: '#8b5cf6' },
          { value: 'emerald', title: 'Tailwind Emerald', right: '#10b981' },
          { value: 'teal',    title: 'Tailwind Teal',    right: '#14b8a6' },
          { value: 'cyan',    title: 'Tailwind Cyan',    right: '#06b6d4' },
          { value: 'rose',    title: 'Tailwind Rose',    right: '#f43f5e' },
          { value: 'amber',   title: 'Tailwind Amber',   right: '#f59e0b' },
          { value: 'slate',   title: 'Tailwind Slate',   right: '#64748b' },
        ],
      },
    },
  },
};

export default preview;
