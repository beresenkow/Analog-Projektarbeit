import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    imports: [RouterLink],
    template:`
        <h2>Your main account</h2>

        <button routerLink="/users">See all Users</button>
    `
})
export default class IndexPage {}
