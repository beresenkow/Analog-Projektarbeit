import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
        <h1>Landing Page</h1>

        <a routerLink="/blog">Blogs</a>
        <a routerLink="/todo">Todos</a>
        <a routerLink="/about">About Me</a>

        <div>
          <button (click)="signIn()" routerLink="/account/log-in">Sign In</button>
          <button (click)="createAccount()" routerLink="/account/create-account">Create Account</button>
        </div>

        <router-outlet />
    `,
    styles: [`
        @import 'landing.page.css';
    `]
})
export default class LandingPage {
  signIn() {
    console.log("User wants to Sign in");
  }

  createAccount() {
    console.log("User wants to create a new account");
  }
}
