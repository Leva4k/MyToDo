import { Component, OnInit } from '@angular/core';
import { Todo } from '../todos/models/todo.model';
import { TodoService } from '../todos/services/todo.service';

@Component({
  selector: 'app-deleted-todo',
  templateUrl: './deleted-todo.component.html',
  styleUrl: './deleted-todo.component.css'
})
export class DeletedTodoComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit(): void { 
    this.todoService.getAllDeletedTodos()
      .subscribe({
        next: (res) => {
          this.todos = res;
        }
      });
  }
}
