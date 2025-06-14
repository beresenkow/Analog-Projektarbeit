import { TodoService, Todo } from './../../todo.services';
import { MarkdownComponent, injectContent } from "@analogjs/content";
import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { BlogPost } from 'src/app/models/post';

@Component({
    standalone: true,
    imports: [MarkdownComponent, CommonModule, AsyncPipe, FormsModule],
    template: `
        <div *ngIf="post$ | async as post">
            <h2>{{ post.attributes.title }}</h2>
            <h3>{{ post.attributes.description }}</h3>

            <div *ngIf="todos.length > 0">
                <div class="todo-widget">
                    <h3 class="todo-widget-element">Todos:</h3>
                    <p class="todo-widget-element" *ngFor="let todo of todos">
                        {{ todo.title }} - {{ todo.description }}
                        <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
                    </p>
                </div>
            </div>

            <analog-markdown [content]="post.content" />
        </div>
    `,
    styles: [`
        @import 'blog.page.css';
    `]
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>();
  private todoService = inject(TodoService);
  todos: Todo[] = [];

  constructor() {
    this.post$.pipe(
      finalize(() => console.log('Observable finalized or an error has occured.'))
    ).subscribe(post => {
      this.loadTodos(post.attributes.slug);
    });
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

  loadTodos(blogTitle: string) {
    this.todoService.getAll().subscribe({
      next: (todos) => {
        this.todos = todos.filter(todo => todo.linkedBlog === blogTitle);

        console.log('Loaded todos:', this.todos);
      },
      error: (err) => {
        console.error('Could not load todos:', err);
        this.todos = [];
      }
    });
  }
}
