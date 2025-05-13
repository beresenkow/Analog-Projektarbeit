import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <h1>Fine Todos here</h1>

        <router-outlet />
    `,
})
export default class LandingPage {}
