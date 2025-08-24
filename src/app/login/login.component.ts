// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Simulate API call
      setTimeout(() => {
        // Demo authentication logic
        if (this.loginData.username === 'admin' && this.loginData.password === 'password') {
          this.successMessage = 'Login successful! Redirecting...';
          console.log('Login successful:', this.loginData);

          // Store authentication state (in a real app, use a service)
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username', this.loginData.username);

          // Redirect to books page after 1 second
          setTimeout(() => {
            this.router.navigate(['/books']);
          }, 1000);

        } else {
          this.errorMessage = 'Invalid username or password. Please try again.';
        }

        this.isLoading = false;
      }, 1500);
    }
  }
}
