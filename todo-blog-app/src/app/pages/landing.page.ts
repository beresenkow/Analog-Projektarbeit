import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TodoService, Todo } from "../todo.services";
import { HttpClient } from '@angular/common/http';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
        <h1>Landing Page</h1>

        <a routerLink="/blog">Blogs</a>
        <a routerLink="/todo">Todos</a>
        <a routerLink="/about">About Me</a>


        <button routerLink="/newsletter">Signup to the Newsletter</button>

        <router-outlet />
    `,
    styles: [`
        @import 'landing.page.css';
    `]
})
export default class LandingPage {
  private todoService = inject(TodoService);
  private http = inject(HttpClient);

  todos: Todo[] = [];

  constructor() {
    this.loadTodos();
  }

  signIn() {
    console.log("User wants to Sign in");
  }

  createAccount() {
    console.log("User wants to create a new account");
  }

  // Checks if the database is empty, then it fills the database with default values here
  loadTodos() {
    this.todoService.getAll().subscribe({
      next: (todos) => {
        this.todos = todos;

        if (this.todos.length === 0) {

          this.http.get<{ title: string; description: string; linkedBlog: string; done: boolean; }[]>('/api/todos/default').subscribe({
            next: (todos) => {
              console.log('Load default todos from the /api/todos/default');
              for (let todo of todos) {
                this.addCustomTodo(todo);
              }
            },
            error: (err) => console.error('Could not load predefined todos:', err),
          });
        }
      },
      error: (err) => console.error('Could not load todos:', err),
    });
  }

  addCustomTodo(newTodo: { title: string; description: string; linkedBlog: string; done: boolean; }) {
    this.todoService.create(newTodo).subscribe({
      next: (createdTodo) => {
        this.todos.push(createdTodo);
      },
      error: (err) => console.error('Could not create new todo:', err),
    });
  }
}
