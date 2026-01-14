import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(form: any) {
    this.error = '';
    if (!form || !form.valid) {
      this.error = 'Please fill both fields correctly.';
      return;
    }
    const ok = this.auth.login(this.email, this.password);
    if (!ok) {
      this.error = 'Invalid credentials.';
      return;
    }
    this.router.navigate(['/']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
