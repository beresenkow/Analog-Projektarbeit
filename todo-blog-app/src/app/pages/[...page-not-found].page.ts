import { RouteMeta } from "@analogjs/router";
import { injectResponse } from "@analogjs/router/tokens";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

export const routeMeta: RouteMeta = {
  title: 'Page Not Found',
  canActivate: [
    () => {
      const response = injectResponse();
      if (import.meta.env.SSR && response) {
        response.statusCode = 404;
        //response.end();
      }
      return true;
    }
  ]
};

@Component({
    standalone: true,
    imports: [RouterLink],
    template: `
        <h1>Page not found</h1>

        <a routerLink="/">Home</a>
    `,
})
export default class PageNotFoundPage {}
