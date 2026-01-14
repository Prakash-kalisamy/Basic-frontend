import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private storageKey = 'basic_frontend_users';
  private sessionKey = 'basic_frontend_session';

  constructor(private router: Router) {}

  register(user: User): boolean {
    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) {
      return false;
    }
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    localStorage.setItem(this.sessionKey, JSON.stringify({ email: user.email, name: user.name }));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return false;
    localStorage.setItem(this.sessionKey, JSON.stringify({ email: user.email, name: user.name }));
    return true;
  }

  logout() {
    localStorage.removeItem(this.sessionKey);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.sessionKey);
  }

  getUserName(): string | null {
    const session = localStorage.getItem(this.sessionKey);
    if (!session) return null;
    try {
      const obj = JSON.parse(session);
      return obj.name || null;
    } catch {
      return null;
    }
  }

  private getUsers(): User[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }
}
