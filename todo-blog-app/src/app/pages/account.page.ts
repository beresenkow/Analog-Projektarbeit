import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <router-outlet />
    `,
})
export default class AccountPage {}
