import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirm = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(form: any) {
    this.error = '';
    if (!form || !form.valid) {
      this.error = 'Please fix the highlighted fields.';
      return;
    }
    if (this.password !== this.confirm) {
      this.error = 'Passwords do not match.';
      return;
    }
    const ok = this.auth.register({ name: this.name, email: this.email, password: this.password });
    if (!ok) {
      this.error = 'A user with this email already exists.';
      return;
    }
    this.router.navigate(['/']);
  }
}
