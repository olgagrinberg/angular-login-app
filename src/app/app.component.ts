// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-app';

  loginData = {
    username: '',
    password: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  onLogin(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Simulate API call
      setTimeout(() => {
        // Demo authentication logic
        if (this.loginData.username === 'admin' && this.loginData.password === 'password') {
          this.successMessage = 'Login successful! Welcome back.';
          console.log('Login successful:', this.loginData);

          // Here you would typically:
          // 1. Store authentication token
          // 2. Redirect to dashboard/home page
          // 3. Update user state

        } else {
          this.errorMessage = 'Invalid username or password. Please try again.';
        }

        this.isLoading = false;
      }, 1500);
    }
  }
}
