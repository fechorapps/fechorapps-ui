import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors as AngularValidationErrors,
} from '@angular/forms';
import { Component, signal, inject } from '@angular/core';

@Component({
  selector: 'story-sign-up-page',
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
              Crear Cuenta
            </h3>
            <div class="flex items-center justify-center font-medium">
              <span class="me-1.5 text-sm text-gray-600 dark:text-gray-400">
                ¿Ya tienes cuenta?
              </span>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                Inicia Sesión
              </a>
            </div>
          </div>

          <!-- Social Login Buttons -->
          <div class="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              class="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              class="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                />
              </svg>
              Apple
            </button>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-2">
            <span class="w-full border-t border-gray-200 dark:border-gray-700"></span>
            <span class="text-xs font-medium uppercase text-gray-500">O</span>
            <span class="w-full border-t border-gray-200 dark:border-gray-700"></span>
          </div>

          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input
                type="text"
                formControlName="firstName"
                class="h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
              <input
                type="text"
                formControlName="lastName"
                class="h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-900 dark:text-white"
              >Correo electrónico</label
            >
            <input
              type="email"
              formControlName="email"
              placeholder="email@email.com"
              class="h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <div class="relative">
              <input
                [type]="showPassword() ? 'text' : 'password'"
                formControlName="password"
                placeholder="••••••••"
                class="h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 pe-10 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="button"
                (click)="togglePassword()"
                class="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-gray-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-900 dark:text-white"
              >Confirmar Contraseña</label
            >
            <input
              [type]="showPassword() ? 'text' : 'password'"
              formControlName="confirmPassword"
              placeholder="••••••••"
              class="h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <!-- Accept Terms -->
          <label class="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              formControlName="acceptTerms"
              class="mt-0.5 w-4 h-4 cursor-pointer rounded border-gray-300 accent-blue-600"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Acepto los
              <a href="#" class="text-blue-600 hover:text-blue-700 hover:underline"
                >Términos de Servicio</a
              >
              y la
              <a href="#" class="text-blue-600 hover:text-blue-700 hover:underline"
                >Política de Privacidad</a
              >
            </span>
          </label>

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
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  `,
})
class SignUpPageStory {
  private readonly fb = inject(FormBuilder);

  readonly showPassword = signal(false);
  readonly isLoading = signal(false);

  form = this.fb.nonNullable.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): AngularValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }
}

@Component({
  selector: 'story-sign-up-success',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div
        class="w-full max-w-[440px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
      >
        <div class="flex flex-col items-center gap-5 p-10 text-center">
          <div
            class="flex w-16 h-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
          >
            <svg
              class="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              ¡Cuenta creada exitosamente!
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Hemos enviado un correo de verificación a tu email. Por favor revisa tu bandeja de
              entrada.
            </p>
          </div>
          <a
            href="#"
            class="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Ir a Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  `,
})
class SignUpSuccessStory {}

@Component({
  selector: 'story-sign-up-validation',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div
        class="w-full max-w-[440px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
      >
        <form class="flex flex-col gap-5 p-10">
          <div class="mb-2.5 text-center">
            <h3 class="mb-2.5 text-lg font-semibold leading-none text-gray-900 dark:text-white">
              Crear Cuenta
            </h3>
          </div>

          <!-- Name Fields with Errors -->
          <div class="grid grid-cols-2 gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
              <input
                type="text"
                class="h-10 w-full rounded-md border border-red-500 bg-white dark:bg-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
              <span class="text-xs text-red-500">Este campo es requerido</span>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
              <input
                type="text"
                class="h-10 w-full rounded-md border border-red-500 bg-white dark:bg-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
              <span class="text-xs text-red-500">Este campo es requerido</span>
            </div>
          </div>

          <!-- Email with Error -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-900 dark:text-white"
              >Correo electrónico</label
            >
            <input
              type="email"
              value="invalid-email"
              class="h-10 w-full rounded-md border border-red-500 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <span class="text-xs text-red-500">Ingresa un correo válido</span>
          </div>

          <!-- Password with Error -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input
              type="password"
              value="123"
              class="h-10 w-full rounded-md border border-red-500 bg-white dark:bg-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <span class="text-xs text-red-500">Mínimo 8 caracteres</span>
          </div>

          <!-- Confirm Password with Mismatch -->
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-900 dark:text-white"
              >Confirmar Contraseña</label
            >
            <input
              type="password"
              value="different"
              class="h-10 w-full rounded-md border border-red-500 bg-white dark:bg-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <span class="text-xs text-red-500">Las contraseñas no coinciden</span>
          </div>

          <!-- Terms not accepted -->
          <label class="flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              class="mt-0.5 w-4 h-4 cursor-pointer rounded border-red-500 accent-blue-600"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Acepto los Términos de Servicio y la Política de Privacidad
            </span>
          </label>
          <span class="-mt-3 text-xs text-red-500">Debes aceptar los términos</span>

          <button
            type="submit"
            class="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  `,
})
class SignUpValidationStory {}

const meta: Meta = {
  title: 'Pages/Auth/SignUp',
  decorators: [
    moduleMetadata({
      imports: [SignUpPageStory, SignUpSuccessStory, SignUpValidationStory],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => ({
    template: '<story-sign-up-page></story-sign-up-page>',
  }),
};

export const Success: StoryObj = {
  render: () => ({
    template: '<story-sign-up-success></story-sign-up-success>',
  }),
};

export const ValidationErrors: StoryObj = {
  render: () => ({
    template: '<story-sign-up-validation></story-sign-up-validation>',
  }),
};
