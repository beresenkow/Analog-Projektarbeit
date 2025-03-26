import { Component } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = [{ id: 1, text: "Analog lernen", completed: false }];
  newTodoText = '';

  addTodo() {
    if (!this.newTodoText.trim()) return;
    this.todos.push({ id: Date.now(), text: this.newTodoText, completed: false });
    this.newTodoText = '';
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
  }
}