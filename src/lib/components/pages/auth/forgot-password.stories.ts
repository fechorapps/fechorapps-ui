import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Component, signal, inject } from '@angular/core';

@Component({
  selector: 'story-forgot-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div
        class="w-full max-w-[440px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
      >
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-5 p-10">
          <!-- Header -->
          <div class="mb-2.5 text-center">
            <h3 class="mb-2.5 text-lg font-semibold leading-none text-gray-900 dark:text-white">
              ¿Olvidaste tu contraseña?
            </h3>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu
              contraseña.
            </span>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-900 dark:text-white">
              Correo electrónico
            </label>
            <input
              type="email"
              formControlName="email"
              placeholder="email@email.com"
              class="h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
            [disabled]="isLoading()"
          >
            @if (isLoading()) {
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            }
            Enviar Enlace
          </button>

          <!-- Back to Sign In -->
          <div class="text-center">
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Volver a Iniciar Sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
})
class ForgotPasswordPageStory {
  private readonly fb = inject(FormBuilder);

  readonly isLoading = signal(false);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }
}

@Component({
  selector: 'story-forgot-password-success',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div
        class="w-full max-w-[440px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
      >
        <div class="flex flex-col items-center gap-5 p-10 text-center">
          <div
            class="flex w-16 h-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 class="mb-2.5 text-lg font-semibold leading-none text-gray-900 dark:text-white">
              ¡Revisa tu correo!
            </h3>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de
              entrada.
            </span>
          </div>
          <a
            href="#"
            class="inline-flex h-10 w-full items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            Volver a Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  `,
})
class ForgotPasswordSuccessStory {}

@Component({
  selector: 'story-forgot-password-error',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div
        class="w-full max-w-[440px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
      >
        <form class="flex flex-col gap-5 p-10">
          <div class="mb-2.5 text-center">
            <h3 class="mb-2.5 text-lg font-semibold leading-none text-gray-900 dark:text-white">
              ¿Olvidaste tu contraseña?
            </h3>
          </div>

          <!-- Error message -->
          <div
            class="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 p-3.5 text-sm font-medium text-red-600 dark:text-red-400"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            No encontramos una cuenta con ese correo electrónico.
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-900 dark:text-white"
              >Correo electrónico</label
            >
            <input
              type="email"
              value="unknown@email.com"
              class="h-10 w-full rounded-md border border-red-500 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <button
            type="submit"
            class="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white"
          >
            Enviar Enlace
          </button>

          <div class="text-center">
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Volver a Iniciar Sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
})
class ForgotPasswordErrorStory {}

const meta: Meta = {
  title: 'Pages/Auth/ForgotPassword',
  decorators: [
    moduleMetadata({
      imports: [ForgotPasswordPageStory, ForgotPasswordSuccessStory, ForgotPasswordErrorStory],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => ({
    template: '<story-forgot-password-page></story-forgot-password-page>',
  }),
};

export const Success: StoryObj = {
  render: () => ({
    template: '<story-forgot-password-success></story-forgot-password-success>',
  }),
};

export const Error: StoryObj = {
  render: () => ({
    template: '<story-forgot-password-error></story-forgot-password-error>',
  }),
};
