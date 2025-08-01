import { Component, signal } from '@angular/core';

import { FormAction } from '@analogjs/router';
import { RouterLink } from '@angular/router';

type FormErrors =
  | {
      email?: string;
    }
  | undefined;

@Component({
  selector: 'app-newsletter-page',
  standalone: true,
  imports: [FormAction, RouterLink],
  template: `
    <h3>Newsletter Signup</h3>

    @if (!signedUp()) {
      <form method="post"
        (onSuccess)="onSuccess()"
        (onError)="onError($any($event))"
        (onStateChanges)="errors.set(undefined)"
      >
        <div>
          <label for="email"> Email </label>
          <input type="email" name="email" autocomplete="off" />
        </div>

        <button class="button" type="submit">Submit</button>
      </form>

      @if (errors()?.email) {
        <p>{{ errors()?.email }}</p>
      }
    } @else {
      <div>Thanks for signing up!</div>
    }

    <a routerLink="/">Home</a>
  `,
})
export default class NewsletterComponent {
  signedUp = signal(false);
  errors = signal<FormErrors>(undefined);

  onSuccess() {
    this.signedUp.set(true);
  }

  onError(result?: FormErrors) {
    this.errors.set(result);
  }
}
