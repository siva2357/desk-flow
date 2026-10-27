import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);

  email = signal<string>('alex.rivera@deskflow.io');
  password = signal<string>('DeskFlow@2026!');
  selectedRole = signal<'manager' | 'admin' | 'hr'>('manager');
  rememberMe = signal<boolean>(true);
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Layout flip: false = Form on Left, Image on Right (like Talent Hub); true = Image on Left, Form on Right
  isReversedLayout = signal<boolean>(false);

  toggleLayout(): void {
    this.isReversedLayout.update(v => !v);
  }

  selectDemoRole(role: 'manager' | 'admin' | 'hr'): void {
    this.selectedRole.set(role);
    if (role === 'manager') {
      this.email.set('alex.rivera@deskflow.io');
      this.password.set('DeskFlow@2026!');
    } else if (role === 'admin') {
      this.email.set('elena.rostova@deskflow.io');
      this.password.set('AdminSec#991');
    } else {
      this.email.set('sarah.jenkins@deskflow.io');
      this.password.set('HRLead@Desk26');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  onLogin(event: Event): void {
    event.preventDefault();
    if (!this.email() || !this.password()) {
      this.errorMessage.set('Please enter both your work email and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    localStorage.setItem('role', this.selectedRole());
    localStorage.setItem('userEmail', this.email());

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/dashboard']);
    }, 500);
  }
}
