import { CommonModule } from '@angular/common';
import { Component, inject, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TodoService, Todo } from "../todo.services";
import { FormsModule } from '@angular/forms';
import { injectContentFiles } from '@analogjs/content';
import { BlogPost } from '../models/post';
import { Router } from '@angular/router';
import { FormAction } from '@analogjs/router';

type FormErrors =
  | {
      title?: string;
      description?: string;
    }
  | undefined;

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, FormAction],
    template: `
      <h1 class="page-title">Todos</h1>

      <a routerLink="/blog" class="menu-panel">Blogs</a>
      <a class="menu-panel-active">Todos</a>
      <a routerLink="/about" class="menu-panel">About Me</a>

      <div class="buttons">
        <button class="open-button" (click)="openTodoCreation()" [class.hidden]="creatingNewTodo">Create new Todo</button>
        <button *ngIf="!creatingNewTodo" (click)="switchTodoEditOptions(true)" [class.hidden]="editingTodos">Edit Todos</button>
        <button (click)="switchTodoEditOptions(false)" [class.hidden]="!editingTodos">Done</button>
      </div>

      <div class="input-class">
        <form
          *ngIf="creatingNewTodo"
          method="post"
          (onSuccess)="onSuccess()"
          (onError)="onError($any($event))"
          (onStateChanges)="newTodoErrors.set(undefined)"
        >
          <h2>Create a new Todo</h2>

          <label for="title">Todo Title</label>
          <input type="text" id="title" name="title" [(ngModel)]="title" required autocomplete="off"/>

          <label for="description">Todo Description</label>
          <input type="text" id="description" name="description" [(ngModel)]="description" required autocomplete="off"/>

          <label for="linkedBlog">Todo Description</label>
          <select id="linkedBlog" name="linkedBlog" [(ngModel)]="linkedBlog">
            <option value="" disabled selected>Select a Blog entry for this Todo</option>
            <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
          </select>

          <button class="submit-class" type="submit">Add new Todo</button>
          <button class="submit-class" (click)="resetForms()">Cancel</button>
        </form>

        @if (newTodoErrors()?.title) {
          <p>{{ newTodoErrors()?.title }}</p>
        }
        @if (newTodoErrors()?.description) {
          <p>{{ newTodoErrors()?.description }}</p>
        }
      </div>

      <div class="todos">
        <div *ngFor="let todo of todos">
          <div class="todo-element" *ngIf="!editingSingelTodo || editingSingelTodo && currentlyEditedTodo !== todo.id">
            <span>{{ todo.title }} – {{ todo.description }}</span>
            <div class="todo-actions">
              <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
              <button *ngIf="editingTodos" (click)="openEditTodo(todo)">🖊</button>
              <button *ngIf="editingTodos" (click)="deleteTodo(todo.id)">⛔</button>
            </div>
          </div>

          <div *ngIf="editingSingelTodo && currentlyEditedTodo === todo.id">
            <div class="input-class">
              <h2>Edit Todo {{ todo.title }}</h2>

              <form method="post">
                <label for="title">Todo Title</label>
                <input type="text" id="title" name="title" [(ngModel)]="title" required autocomplete="off"/>

                <label for="description">Todo Description</label>
                <input type="text" id="description" name="description" [(ngModel)]="description" required autocomplete="off"/>

                <label for="linkedBlog">Linked Blog Entry for this Todo</label>
                <select id="linkedBlog" name="linkedBlog" [(ngModel)]="linkedBlog">
                  <option value="" disabled selected>Select a Blog entry for this Todo</option>
                  <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
                </select>

                <div class="edit-actions">
                  <label [for]="todo.id">Todo Done</label>
                  <div>
                    <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
                    <button type="submit" (click)="editTodoFinal(todo, false)" [disabled]="!isFormValid()">Save</button>
                    <button (click)="editTodoFinal(todo, true)">Cancel</button>
                    <button (click)="deleteTodo(todo.id)">⛔</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
  editingSingelTodo: boolean = false;
  currentlyEditedTodo: number = 0;

  title: string = '';
  description: string = '';
  linkedBlog: string = '';

  posts = injectContentFiles<BlogPost>();
  options: { value: string; label: string }[] = [];

  newTodo = signal(false);
  newTodoErrors = signal<FormErrors>(undefined);

  onSuccess() {
    this.newTodo.set(true);

    if (this.newTodo()) {
      this.addTodoFromInput();
      this.newTodoErrors.set(undefined);
      this.newTodo.set(false);
    }
  }

  onError(result?: FormErrors) {
    this.newTodoErrors.set(result);
  }

  constructor(private router: Router) {
    this.loadTodos();
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.options.push({ value: '', label: 'None' });

    for (let post of this.posts) {
      this.options.push({ value: post.attributes.slug, label: post.attributes.title });
    }
  }

  openTodoCreation() {
    this.editingTodos = false;
    this.editingSingelTodo = false;
    this.resetForms();

    this.creatingNewTodo = true;
  }

  switchTodoEditOptions(active: boolean) {
    this.editingTodos = active;

    if (active === false) {
      this.editingSingelTodo = false;
    }
  }

  openEditTodo(todo: Todo) {
    this.title = todo.title;
    this.description = todo.description;
    this.linkedBlog = todo.linkedBlog;

    this.currentlyEditedTodo = todo.id;
    this.editingSingelTodo = true;
  }

  editTodoFinal(todo: Todo, cancel: boolean) {
    this.editingSingelTodo = false;
    console.log("ji");
    if (cancel) {
      this.resetForms();
      return;
    }

    const updatedTodo = {
      id: todo.id,
      title: this.title,
      description: this.description,
      linkedBlog: this.linkedBlog,
      done: todo.done
    }

    this.updateTodo(updatedTodo);
    this.resetForms();
  }

  addTodoFromInput() {
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

  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
