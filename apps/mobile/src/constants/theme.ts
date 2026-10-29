import '@/global.css';
import { Platform } from 'react-native';

export const Palette = {
  orange: '#FF6A00',
  black: '#0B0B0D',
  charcoal: '#242428',
  white: '#F5F5F5',
  muted: '#96969E',
  borderDark: '#35353A',
  borderLight: '#E3E3E7',
} as const;

export const Colors = {
  light: {
    text: '#151515',
    background: '#F7F7F8',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#FFE5D4',
    textSecondary: '#62626B',
    accent: Palette.orange,
    border: Palette.borderLight,
    onAccent: Palette.black,
  },
  dark: {
    text: Palette.white,
    background: Palette.black,
    backgroundElement: Palette.charcoal,
    backgroundSelected: '#3A2418',
    textSecondary: '#B2B2B9',
    accent: Palette.orange,
    border: Palette.borderDark,
    onAccent: Palette.black,
  },
} as const;

export type ThemeName = keyof typeof Colors;
export type ThemeColors = (typeof Colors)[ThemeName];
export type ThemeColor = keyof ThemeColors;

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: { sans: 'var(--font-display)', serif: 'var(--font-serif)', rounded: 'var(--font-rounded)', mono: 'var(--font-mono)' },
});

export const Spacing = { half: 2, one: 4, two: 8, three: 16, four: 24, five: 32, six: 48, seven: 64 } as const;
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
