import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from './../user.services';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-users',
  template: `
    <h1>Benutzer</h1>
    <button (click)="addExampleUser()">Beispiel-User hinzufügen</button>

    <button (click)="showFirstUser()">User 1 Anzeigen</button>

    <p *ngIf="currentUser">
      {{ currentUser.name }} – {{ currentUser.email }}
    </p>

    <ul>
      <li *ngFor="let user of users">
        {{ user.name }} – {{ user.email }}
      </li>
    </ul>
  `,
})
export default class UsersPage {
  private userService = inject(UserService);
  users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Could not load users:', err),
    });
  }

  currentUser: User | undefined;

  showFirstUser() {
    this.userService.getById(1).subscribe({
      next: (data) => (this.currentUser = data),
      error: (err) => console.error('Could not load user:', err),
    })
  }

  addExampleUser() {
    const newUser = {
      name: 'Max Mustermann',
      email: `max${Date.now()}@example.com`,
      password: 'secret123',
      isAdmin: true,
    };

    this.userService.create(newUser).subscribe({
      next: (createdUser) => {
        this.users.push(createdUser);
      },
      error: (err) => console.error('Error while inserting user:', err),
    });
  }
}
