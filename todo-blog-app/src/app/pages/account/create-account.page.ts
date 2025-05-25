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
        <h1 class="page-title">Cretae a new Account</h1>

        <div class="input-class">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" [(ngModel)]="name" required />

          <label for="email">E-Mail</label>
          <input type="email" id="email" name="email" [(ngModel)]="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" name="password" [(ngModel)]="password" required />

          <label for="repeat-password">Repeat Password</label>
          <input type="password" id="repeat-password" name="repeat-password" [(ngModel)]="repeatPassword" required />
        </div>

        <button class="submit-class" [disabled]="!isFormVaild()" (click)="createAccount()" routerLink="/account">Cretae Account</button>

        <router-outlet />
    `,
    styles: [`
        @import 'account.css';
    `]
})
export default class CreateAccountPage {
  private userService = inject(UserService);

  name: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';


  isFormVaild(): boolean {
    return !!this.name && !!this.email && !!this.password && !!this.repeatPassword &&
           this.password === this.repeatPassword;
  }

  createAccount() {
    if (this.isFormVaild()) {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        isAdmin: false,
      };

      this.userService.create(newUser).subscribe({
        next: () => console.log("A new account was created"),
        error: (err) => console.error('Error while inserting user into the database:', err),
      });
    }
  }
}
