import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todos/services/todo.service';
import { Todo } from '../todos/models/todo.model';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})
export class RemindersComponent implements OnInit {
  todayDate: Date = new Date();
  todos: Todo[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todayDate.setDate(this.todayDate.getDate() + 1);
    this.todayDate.setHours(0, 0, 0, 0);
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
}


