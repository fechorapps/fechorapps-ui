import type { StorybookConfig } from '@storybook/angular';
import type { Configuration } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {},
  webpackFinal: async (webpackConfig: Configuration) => {
    if (!webpackConfig.module?.rules) return webpackConfig;

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
