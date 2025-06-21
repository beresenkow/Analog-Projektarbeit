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

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api/todos';
  private http = inject(HttpClient);

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  create(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}`, todo);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}`, todo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
