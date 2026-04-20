import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { UiButtonComponent, UiCardComponent } from '../../../../public-api';

@Component({
  selector: 'story-profile-page',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div class="max-w-6xl mx-auto space-y-6">
        <!-- Header -->
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Profile Card -->
          <ui-card variant="elevated" padding="lg">
            <div class="text-center">
              <!-- Avatar -->
              <div
                class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold mx-auto"
              >
                JD
              </div>

              <!-- User Info -->
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-4">Juan Díaz García</h2>
              <p class="text-gray-500">juan.diaz&#64;email.com</p>
              <p class="text-sm text-gray-400 mt-1">Preparatoria #5</p>

              <!-- Level Progress -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Nivel 24</span>
                  <span class="text-sm text-gray-500">2,450/3,000 XP</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    class="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full"
                    style="width: 82%"
                  ></div>
                </div>
                <p class="text-xs text-gray-500 mt-2">550 XP para nivel 25</p>
              </div>

              <!-- Member Since -->
              <p class="text-xs text-gray-400 mt-4">Miembro desde Octubre 2024</p>
            </div>

            <div footer class="flex gap-2 mt-6">
              <ui-button variant="outline" [fullWidth]="true" size="sm">Editar Perfil</ui-button>
              <ui-button variant="ghost" [fullWidth]="true" size="sm">Configuración</ui-button>
            </div>
          </ui-card>

          <!-- Stats and Activity -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-blue-600">48</p>
                  <p class="text-sm text-gray-500">Exámenes</p>
                </div>
              </ui-card>
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-green-600">87%</p>
                  <p class="text-sm text-gray-500">Promedio</p>
                </div>
              </ui-card>
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-blue-600">56h</p>
                  <p class="text-sm text-gray-500">Estudiadas</p>
                </div>
              </ui-card>
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-yellow-600">15</p>
                  <p class="text-sm text-gray-500">Logros</p>
                </div>
              </ui-card>
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-orange-600">12</p>
                  <p class="text-sm text-gray-500">Racha Actual</p>
                </div>
              </ui-card>
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-purple-600">21</p>
                  <p class="text-sm text-gray-500">Mejor Racha</p>
                </div>
              </ui-card>
            </div>

            <!-- Recent Exams -->
            <ui-card variant="default" title="Exámenes Recientes">
              <div class="divide-y divide-gray-100 dark:divide-gray-800 -mx-4">
                @for (exam of recentExams; track exam.name) {
                  <div
                    class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">{{ exam.name }}</p>
                      <p class="text-xs text-gray-500">{{ exam.date }}</p>
                    </div>
                    <div class="text-right">
                      <p
                        class="font-bold"
                        [class]="
                          exam.score >= 90
                            ? 'text-green-600'
                            : exam.score >= 70
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        "
                      >
                        {{ exam.score }}%
                      </p>
                      <p class="text-xs text-green-500">Aprobado</p>
                    </div>
                  </div>
                }
              </div>
              <div footer class="mt-4">
                <ui-button variant="ghost" [fullWidth]="true">Ver todos los exámenes</ui-button>
              </div>
            </ui-card>
          </div>
        </div>

        <!-- Achievements Section -->
        <ui-card variant="default" title="Logros" subtitle="5 de 8 desbloqueados">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            @for (achievement of achievements; track achievement.name) {
              <div
                class="text-center p-3 rounded-lg transition-all"
                [class]="
                  achievement.unlocked
                    ? 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    : 'bg-gray-50 dark:bg-gray-800 opacity-50'
                "
              >
                <div class="text-3xl mb-2" [class.grayscale]="!achievement.unlocked">
                  {{ achievement.icon }}
                </div>
                <p class="font-medium text-gray-900 dark:text-white text-xs">
                  {{ achievement.name }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">{{ achievement.description }}</p>
              </div>
            }
          </div>
        </ui-card>
      </div>
    </div>
  `,
})
class ProfilePageStory {
  readonly recentExams = [
    { name: 'Matemáticas - Álgebra', score: 92, date: '23 Dic 2024' },
    { name: 'Español - Redacción', score: 88, date: '20 Dic 2024' },
    { name: 'Ciencias - Física', score: 75, date: '18 Dic 2024' },
    { name: 'Historia - México', score: 95, date: '15 Dic 2024' },
  ];

  readonly achievements = [
    { icon: '🏆', name: 'Campeón', description: 'Top 1 en ranking', unlocked: true },
    { icon: '🔥', name: 'En llamas', description: 'Racha de 10 días', unlocked: true },
    { icon: '🎯', name: 'Perfecto', description: '100% en examen', unlocked: true },
    { icon: '📚', name: 'Estudioso', description: '50 horas de estudio', unlocked: true },
    { icon: '⚡', name: 'Velocista', description: 'Examen en 15 min', unlocked: true },
    { icon: '🌟', name: 'Estrella', description: 'Promedio 90%+', unlocked: false },
    { icon: '💎', name: 'Diamante', description: 'Nivel 30', unlocked: false },
    { icon: '🚀', name: 'Imparable', description: 'Racha de 30 días', unlocked: false },
  ];
}

@Component({
  selector: 'story-profile-new-user',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div class="max-w-6xl mx-auto space-y-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Profile Card - New User -->
          <ui-card variant="elevated" padding="lg">
            <div class="text-center">
              <div
                class="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-3xl font-bold mx-auto"
              >
                ?
              </div>

              <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-4">Nuevo Usuario</h2>
              <p class="text-gray-500">nuevo&#64;email.com</p>

              <!-- Level Progress - New User -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Nivel 1</span>
                  <span class="text-sm text-gray-500">0/100 XP</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    class="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full"
                    style="width: 0%"
                  ></div>
                </div>
                <p class="text-xs text-gray-500 mt-2">100 XP para nivel 2</p>
              </div>

              <p class="text-xs text-gray-400 mt-4">Miembro desde hoy</p>
            </div>

            <div footer class="flex gap-2 mt-6">
              <ui-button variant="primary" [fullWidth]="true" size="sm">Completar Perfil</ui-button>
            </div>
          </ui-card>

          <!-- Empty Stats -->
          <div class="lg:col-span-2 space-y-6">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-gray-400">0</p>
                  <p class="text-sm text-gray-500">Exámenes</p>
                </div>
              </ui-card>
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-gray-400">--</p>
                  <p class="text-sm text-gray-500">Promedio</p>
                </div>
              </ui-card>
              <ui-card variant="default" padding="md">
                <div class="text-center">
                  <p class="text-3xl font-bold text-gray-400">0h</p>
                  <p class="text-sm text-gray-500">Estudiadas</p>
                </div>
              </ui-card>
            </div>

            <!-- Empty State -->
            <ui-card variant="default">
              <div class="text-center py-12">
                <div class="text-6xl mb-4">📚</div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  ¡Comienza tu aventura!
                </h3>
                <p class="text-gray-500 mb-6">
                  Realiza tu primer examen para comenzar a ganar XP y desbloquear logros.
                </p>
                <ui-button variant="primary">Iniciar Primer Examen</ui-button>
              </div>
            </ui-card>
          </div>
        </div>
      </div>
    </div>
  `,
})
class ProfileNewUserStory {}

const meta: Meta = {
  title: 'Pages/Auth/Profile',
  decorators: [
    moduleMetadata({
      imports: [ProfilePageStory, ProfileNewUserStory],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => ({
    template: '<story-profile-page></story-profile-page>',
  }),
};

export const NewUser: StoryObj = {
  render: () => ({
    template: '<story-profile-new-user></story-profile-new-user>',
  }),
};
