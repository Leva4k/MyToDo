import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';
import { Tags } from '../tags/tags.model';
import { TagsService } from '../tags/tags.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  selectedTodo: Todo | null = null;
  tags: Tags[] = [];
  selectedTags: string[] = [];
  formSubmitted = false;

//значения по дефолту
  newTodo: Todo = {
    id: '',
    description: '',
    createdDate: new Date(),
    isComleted: false,
    completedDate: new Date(),
    isDeleted: false,
    deletedDate: new Date(),
    tags: [],
  };

  constructor(private todoService: TodoService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.getAllTodos();
    this.getAllTags();
}

  getAllTodos() {
    this.todoService.getAllTodos()
      .subscribe({
        next: (todos) => {
          this.todos = todos;
        }
      });
  }

  getAllTags() {
    this.tagsService.getAllTags()
      .subscribe({
        next: (tags) => {
          this.tags = tags;
        }
      });
  }

  addTodo(): void {
    console.log(this.newTodo)
    this.newTodo.tags = this.selectedTags;
    this.todoService.addTodo(this.newTodo)
      .subscribe({
        next: (todo) => {
          this.getAllTodos();
        }
      });
  }

  onCompletedChange(id: string, todo: Todo) {
    todo.isComleted = !todo.isComleted;
    this.todoService.updateTodo(id, todo)
      .subscribe({
        next: (response) => {
          this.getAllTodos();
        }
      });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id)
      .subscribe({
        next: (response) => {
          this.getAllTodos();
        }
      });
  }
  selectTodoForEdit(todo: Todo) {
    this.selectedTodo = todo;
  }
  cancelEdit() {
    this.selectedTodo = null;
  }

  //для отправки события закрытия формы
 /* @Output() closeEditFormEvent = new EventEmitter<boolean>();*/

  editTodo(todo: Todo) {
    this.todoService.updateTodo(todo.id, todo)
      .subscribe({
        next: (response) => {
          this.getAllTodos();
          /*this.closeEditFormEvent.emit(true);*/
        }
      });
    this.selectedTodo = null;
  }


  addTag(tag: Tags): void {
    if (!this.selectedTags.includes(tag.nameTags)) {
      this.selectedTags.push(tag.nameTags);
    }
  }
  deleteTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }
}

