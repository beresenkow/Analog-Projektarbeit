import { CommonModule } from '@angular/common';
import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TodoService, Todo } from "../todo.services";
import { FormsModule } from '@angular/forms';
import { injectContentFiles } from '@analogjs/content';
import { BlogPost } from '../models/post';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, RouterOutlet, RouterLink],
    template: `
        <h1 class="page-title">Todos</h1>

        <a routerLink="/blog" class="menu-panel">Blogs</a>
        <a class="menu-panel-active">Todos</a>
        <a routerLink="/about" class="menu-panel">About Me</a>

        <button class="open-button" (click)="openTodoCreation()" [class.hidden]="creatingNewTodo">Create new Todo</button>

        <div class="input-class" *ngIf="creatingNewTodo">
          <h2>Create a new Todo</h2>

          <label for="title">Todo Title</label>
          <input type="text" id="title" name="title" [(ngModel)]="title" required/>

          <label for="description">Todo Description</label>
          <input type="text" id="description" name="description" [(ngModel)]="description" required/>

          <label for="linkedBlog">Todo Description</label>
          <select id="linkedBlog" name="linkedBlog" [(ngModel)]="linkedBlog">
            <option value="" disabled selected>Select a Blog entry for this Todo</option>
            <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
          </select>

          <button class="submit-class" [disabled]="!isFormValid()" (click)="addTodo()">Add new Todo</button>
          <button class="submit-class" (click)="resetForms()">Cancel</button>
        </div>

        <ul>
          <li *ngFor="let todo of todos">
            {{ todo.title }} – {{ todo.description }}
          </li>
        </ul>

        <router-outlet />
    `,
    styles: [`
      @import 'todo.page.css';
    `],
})
export default class TodoPage {
  private todoService = inject(TodoService);
  todos: Todo[] = [];

  creatingNewTodo: boolean = false;
  title: string = '';
  description: string = '';
  linkedBlog: string = '';

  posts = injectContentFiles<BlogPost>();
  options: { value: string; label: string }[] = [];

  constructor() {
    this.loadTodos();
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.options.push({ value: '', label: 'None' });

    for (let post of this.posts) {
      this.options.push({ value: post.attributes.title, label: post.attributes.title });
    }
  }

  openTodoCreation() {
    this.creatingNewTodo = true;
  }

  addTodo() {
    const newTodo = {
      title: this.title,
      description: this.description,
      linkedBlog: this.linkedBlog,
    };

    this.todoService.create(newTodo).subscribe({
      next: (createdTodo) => {
        this.todos.push(createdTodo);
      },
      error: (err) => console.error('Could not create new todo:', err),
    });

    this.resetForms();
  }

  resetForms() {
    this.creatingNewTodo = false;
    this.title = '';
    this.description = '';
    this.linkedBlog = '';
  }

  isFormValid() {
    return !!this.title && !!this.description;
  }

  loadTodos() {
    this.todoService.getAll().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (err) => console.error('Could not load todos:', err),
    });
  }
}
