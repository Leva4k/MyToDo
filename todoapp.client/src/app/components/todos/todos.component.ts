import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

//значения по дефолту
  newTodo: Todo = {
    id: '',
    description: '',
    createdDate: new Date(),
    isCompleted: false,
    completedDate: new Date()
  };

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getAllTodos();
}

  getAllTodos() {
    this.todoService.getAllTodos()
      .subscribe({
        next: (todos) => {
          this.todos = todos;
        }
      });
  }

  addTodo() {
    console.log(this.newTodo)
    this.todoService.addTodo(this.newTodo)
      .subscribe({
        next: (todo) => {
          this.getAllTodos();
        }
      });
  }

  onComletedChange(id: string, todo: Todo) {

  }
}
