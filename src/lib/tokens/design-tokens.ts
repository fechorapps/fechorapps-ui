/**
 * Design Tokens for @appcordion/ui
 *
 * Centralized design system tokens that can be consumed by components
 * and exported for use in consuming applications.
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const ColorTokens = {
  // Primary palette - Metronic Blue
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#1379F0',
    600: '#1167d3',
    700: '#0f55b6',
    800: '#0d4399',
    900: '#0a317c',
    950: '#071f5f',
  },

  // Neutral palette — Zinc (Metronic standard)
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Semantic colors
  success: {
    light: '#dcfce7',
    DEFAULT: '#22c55e',
    dark: '#15803d',
  },
  warning: {
    light: '#fef3c7',
    DEFAULT: '#f59e0b',
    dark: '#b45309',
  },
  danger: {
    light: '#fee2e2',
    DEFAULT: '#ef4444',
    dark: '#b91c1c',
  },
  info: {
    light: '#dbeafe',
    DEFAULT: '#3b82f6',
    dark: '#1d4ed8',
  },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

export const SpacingTokens = {
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const TypographyTokens = {
  fontFamily: {
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  fontSize: {
    '2xs': ['0.6875rem', { lineHeight: '0.825rem' }], // Metronic custom
    xs: ['0.75rem', { lineHeight: '1rem' }],
    '2sm': ['0.8125rem', { lineHeight: '1.075rem' }], // Metronic custom
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

// Metronic radius system — base: 0.5rem
export const BorderRadiusTokens = {
  none: '0',
  sm: '0.25rem',  // 4px
  md: '0.375rem', // 6px
  DEFAULT: '0.5rem', // 8px — base radius
  lg: '0.5rem',   // 8px
  xl: '0.75rem',  // 12px
  '2xl': '1rem',  // 16px
  full: '9999px',
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

export const ShadowTokens = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
} as const;

// =============================================================================
// TRANSITION TOKENS
// =============================================================================

export const TransitionTokens = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

export const ZIndexTokens = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

export const BreakpointTokens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// COMBINED DESIGN TOKENS
// =============================================================================

export const DesignTokens = {
  colors: ColorTokens,
  spacing: SpacingTokens,
  typography: TypographyTokens,
  borderRadius: BorderRadiusTokens,
  shadows: ShadowTokens,
  transitions: TransitionTokens,
  zIndex: ZIndexTokens,
  breakpoints: BreakpointTokens,
} as const;

export type DesignTokensType = typeof DesignTokens;
