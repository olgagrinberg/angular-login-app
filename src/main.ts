// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent)
  .then(() => {
    console.log('✅ App started successfully!');
  })
  .catch(err => {
    console.error('❌ Failed to start app:', err);
    // Maybe show user-friendly error message
  });
