import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const darkTheme = create({
  base: 'dark',

  brandTitle: '@fechorapps/ui',
  brandUrl: '/',
  brandTarget: '_self',

  colorPrimary: '#009EF7',
  colorSecondary: '#7239EA',

  appBg: '#1a1a1a',
  appContentBg: '#0d0d0d',
  appPreviewBg: '#111827',
  appBorderColor: '#333333',
  appBorderRadius: 8,

  textColor: '#f5f5f5',
  textInverseColor: '#0d0d0d',
  textMutedColor: '#9ca3af',

  barTextColor: '#a3a3a3',
  barSelectedColor: '#009EF7',
  barHoverColor: '#60a5fa',
  barBg: '#1a1a1a',

  inputBg: '#262626',
  inputBorder: '#404040',
  inputTextColor: '#f5f5f5',
  inputBorderRadius: 6,

  buttonBg: '#262626',
  buttonBorder: '#404040',

  booleanBg: '#262626',
  booleanSelectedBg: '#009EF7',
});

addons.setConfig({
  theme: darkTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
});
