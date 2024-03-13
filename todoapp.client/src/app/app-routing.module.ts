import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { DeletedTodoComponent } from './components/deleted-todo/deleted-todo.component';

const routes: Routes = [{

  path: '',
  component: TodosComponent
},
{
  path: 'todos',
  component: TodosComponent
  },
  {
    path: 'deleted-todo',
    component: DeletedTodoComponent
  }
  //{
  //  path: 'todos-tags',
  //  component: TodosTagsComponent
  //},
  //{
  //  path: 'todos-reminder',
  //  component: TodosReminderComponent
  //}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
