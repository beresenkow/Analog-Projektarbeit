import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
        <h1 class="page-title">Todos</h1>

        <a routerLink="/blog" class="menu-panel">Blogs</a>
        <a routerLink="/todo" class="menu-panel">Todos</a>
        <a routerLink="/about" class="menu-panel">About Me</a>

        <router-outlet />
    `,
})
export default class LandingPage {}
