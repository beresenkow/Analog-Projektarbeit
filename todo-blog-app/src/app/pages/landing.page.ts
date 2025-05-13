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

        <router-outlet />
    `,
    styles: [`
        @import 'landing.page.css';
    `]
})
export default class LandingPage {}
