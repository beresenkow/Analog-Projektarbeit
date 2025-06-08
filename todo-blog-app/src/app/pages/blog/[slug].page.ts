import { TodoService, Todo } from './../../todo.services';
import { MarkdownComponent, injectContent } from "@analogjs/content";
import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { finalize } from 'rxjs';
import { BlogPost } from 'src/app/models/post';

@Component({
    standalone: true,
    imports: [MarkdownComponent, CommonModule, AsyncPipe],
    template: `
        <div *ngIf="post$ | async as post">
            <h2>{{ post.attributes.title }}</h2>
            <h3>{{ post.attributes.description }}</h3>

            <div *ngIf="todos.length > 0">
                <h3>Verknüpfte Todos:</h3>
                <ul>
                    <li *ngFor="let todo of todos">
                        {{ todo.title }} - {{ todo.description }}
                    </li>
                </ul>
            </div>

            <analog-markdown [content]="post.content" />
        </div>
    `,
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
