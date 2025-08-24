// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-container">
      <div class="login-container">
        <div class="login-card">
          <h2>Welcome Back</h2>
          <p class="subtitle">Please sign in to your account</p>

          <form #loginForm="ngForm" (ngSubmit)="onLogin(loginForm)" novalidate>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                [(ngModel)]="loginData.username"
                #username="ngModel"
                required
                minlength="3"
                class="form-control"
                [class.invalid]="username.invalid && username.touched"
                placeholder="Enter your username"
              >
              <div class="error-message" *ngIf="username.invalid && username.touched">
                <small *ngIf="username.errors?.['required']">Username is required</small>
                <small *ngIf="username.errors?.['minlength']">Username must be at least 3 characters</small>
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                [(ngModel)]="loginData.password"
                #password="ngModel"
                required
                minlength="6"
                class="form-control"
                [class.invalid]="password.invalid && password.touched"
                placeholder="Enter your password"
              >
              <div class="error-message" *ngIf="password.invalid && password.touched">
                <small *ngIf="password.errors?.['required']">Password is required</small>
                <small *ngIf="password.errors?.['minlength']">Password must be at least 6 characters</small>
              </div>
            </div>

            <button
              type="submit"
              class="login-btn"
              [disabled]="loginForm.invalid || isLoading"
            >
              <span *ngIf="isLoading" class="loading-spinner"></span>
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <div class="login-footer">
            <a href="#" class="forgot-password">Forgot your password?</a>
          </div>

          <!-- Success/Error Messages -->
          <div class="message success" *ngIf="successMessage">
            {{ successMessage }}
          </div>
          <div class="message error" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
    }

    .login-container {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    h2 {
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .subtitle {
      color: #666;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
      text-align: left;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e1e5e9;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-control.invalid {
      border-color: #e74c3c;
    }

    .error-message {
      margin-top: 0.5rem;
    }

    .error-message small {
      color: #e74c3c;
      font-size: 0.8rem;
    }

    .login-btn {
      width: 100%;
      padding: 0.875rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .login-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .login-footer {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e1e5e9;
    }

    .forgot-password {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .forgot-password:hover {
      color: #764ba2;
      text-decoration: underline;
    }

    .message {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .message.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .message.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    @media (max-width: 480px) {
      .login-container {
        padding: 10px;
      }

      .login-card {
        padding: 2rem;
      }
    }
  `]
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
