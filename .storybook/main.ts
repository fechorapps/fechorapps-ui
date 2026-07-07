import type { StorybookConfig } from '@storybook/angular';
import type { Configuration } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../assets'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {},
  webpackFinal: async (webpackConfig: Configuration) => {
    if (!webpackConfig.module?.rules) return webpackConfig;

    // CodeMirror is an optional, lazy-loaded dependency of UiCodeEditorComponent.
    // The component guards its dynamic imports with try/catch and falls back to a
    // <textarea> when the packages are absent, so ignore unresolved @codemirror/*
    // modules at build time instead of hard-failing the whole Storybook build.
    const webpack = (await import('webpack')).default;
    (webpackConfig.plugins ??= []).push(
      new webpack.IgnorePlugin({ resourceRegExp: /^@codemirror\// }),
    );

    const tailwindPostcss = (await import('@tailwindcss/postcss')).default;

    const patchPostcssLoaders = (rules: any[]): void => {
      for (const rule of rules) {
        if (!rule || typeof rule !== 'object') continue;
        if (rule.oneOf) patchPostcssLoaders(rule.oneOf);
        if (rule.rules) patchPostcssLoaders(rule.rules);

        const use: any[] = Array.isArray(rule.use) ? rule.use : rule.use ? [rule.use] : [];
        for (const loader of use) {
          if (
            typeof loader === 'object' &&
            loader !== null &&
            typeof loader.loader === 'string' &&
            loader.loader.includes('postcss-loader')
          ) {
            loader.options = {
              postcssOptions: {
                plugins: [tailwindPostcss],
              },
            };
          }
        }
      }
    };

    patchPostcssLoaders(webpackConfig.module.rules as any[]);
    return webpackConfig;
  },
};

export default config;
