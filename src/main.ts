// Entry point for Storybook Angular builder — not used in production
import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({ selector: 'app-root', template: '', standalone: true })
class AppComponent {}

bootstrapApplication(AppComponent).catch(console.error);
