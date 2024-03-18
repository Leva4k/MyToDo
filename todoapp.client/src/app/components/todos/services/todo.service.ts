import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = new BehaviorSubject<string[]>([]);

  baseApiUrl: string = "http://localhost:5221";

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/todo');
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    newTodo.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Todo>(this.baseApiUrl + '/api/todo', newTodo);
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.baseApiUrl + '/api/todo/' + id, todo);
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(this.baseApiUrl + '/api/todo/' + id);
  }

  getAllDeletedTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/todo/get-deleted-todos');
  }

  undoDeleteTodo(id: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.baseApiUrl + '/api/todo/undo-deleted-todo/' + id, todo);
  }

  //updateTodo(id: string, todo: Todo): Observable<Todo> {
  //  return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  //}

}

