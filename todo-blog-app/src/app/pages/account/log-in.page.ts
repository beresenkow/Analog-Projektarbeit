import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.services';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
    template: `
        <h1 class="page-title">Log in into your Account</h1>

        <div class="input-class">
          <label for="email">E-Mail</label>
          <input type="email" id="email" name="email" [(ngModel)]="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" name="password" [(ngModel)]="password" required />
        </div>

        <button class="submit-class" [disabled]="!isFormVaild()" (click)="logIn()" routerLink="/users">Sign in</button>

        <router-outlet />
    `,
    styles: [`
        @import 'account.css';
    `]
})
export default class LogInPage {
  private userService = inject(UserService);

  email: string = '';
  password: string = '';


  isFormVaild(): boolean {
    return !!this.email && !!this.password;
  }

  logIn() {
    console.log("User wants to log in");
  }
}
