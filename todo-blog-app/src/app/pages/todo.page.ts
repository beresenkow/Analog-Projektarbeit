import { CommonModule } from '@angular/common';
import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TodoService, Todo } from "../todo.services";

@Component({
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    template: `
        <h1 class="page-title">Todos</h1>

        <a routerLink="/blog" class="menu-panel">Blogs</a>
        <a class="menu-panel-active">Todos</a>
        <a routerLink="/about" class="menu-panel">About Me</a>

        <button (click)="addTodo()">Neue Todo</button>

        <ul>
          <li *ngFor="let todo of todos">
            {{ todo.name }} – {{ todo.description }}
          </li>
        </ul>

        <router-outlet />
    `,
})
export default class LandingPage {
    private todoService = inject(TodoService);
    todos: Todo[] = [];

    constructor() {
      this.loadTodos();
    }

    loadTodos() {
      this.todoService.getAll().subscribe({
        next: (data) => (this.todos = data),
        error: (err) => console.error('Could not load todo:', err),
      });
    }

    addTodo() {
      const newTodo = {
        name: 'New Todo',
        description: 'Make sure to create a new todo today',
        linkedBlog: 'Die Bedeutung von lebenslangem Lernen',
      }

      this.todoService.create(newTodo).subscribe({
        next: (createdTodo) => {
          this.todos.push(createdTodo);
        },
        error: (err) => console.error('Could not cretae new todo:', err),
      });
    }
}
