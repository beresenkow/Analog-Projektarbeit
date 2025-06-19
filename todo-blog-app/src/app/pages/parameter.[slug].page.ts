import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: "dynamic-parameter",
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h1>Dynamic Parameter</h1>

    {{ slug$ | async }}
  `
})
export default class DynamicParameterPageComponent {
  route = inject(ActivatedRoute);
  slug$ = this.route.paramMap.pipe(map(params => params.get("slug")));
}
