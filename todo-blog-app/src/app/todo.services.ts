import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  description: string;
  linkedBlog: string;
  done: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos');
  }

  getById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`/api/todos/${id}`);
  }

  create(user: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>('/api/todos/post', user);
  }
}
