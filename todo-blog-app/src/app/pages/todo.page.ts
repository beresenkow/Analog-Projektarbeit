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
        <button (click)="switchTodoEditOptions(true)" [class.hidden]="editingTodos">Edit Todos</button>
        <button (click)="switchTodoEditOptions(false)" [class.hidden]="!editingTodos">Done</button>

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
            <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
            <button *ngIf="editingTodos" (click)="deleteTodo(todo.id)">⛔</button>
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
  editingTodos: boolean = false;

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

  switchTodoEditOptions(active: boolean) {
    this.editingTodos = active;
  }

  addTodo() {
    const newTodo = {
      title: this.title,
      description: this.description,
      linkedBlog: this.linkedBlog,
      done: false,
    };

    this.todoService.create(newTodo).subscribe({
      next: (createdTodo) => {
        this.todos.push(createdTodo);
      },
      error: (err) => console.error('Could not create new todo:', err),
    });

    this.resetForms();
  }

  updateTodo(todo: Todo) {
    const todoToUpdate = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      linkedBlog: todo.linkedBlog,
      done: todo.done
    }

    this.todoService.update(todoToUpdate).subscribe({
      next: (updatedTodo) => {
        console.log('Todo updated successfully:', updatedTodo);
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (err) => {
        console.error('Error updating Todo:', err);
        const originalTodo = this.todos.find(t => t.id === todo.id);
        if (originalTodo) {
          todo.done = originalTodo.done;
        }
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.delete(id).subscribe({
      next: () => {
        console.log('Todo successfully deleted');
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error: (err) => {
        console.error('Failed to delete todo', err);
        let errorMessage = 'Failed to delete todo. Please try again.';

        if (err.status === 404) {
          errorMessage = 'Todo not found.';
        } else if (err.status === 400) {
          errorMessage = 'Invalid todo ID.';
        }

        alert(errorMessage);
      }
    });
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
