import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoRootComponent } from './todo/todo-root/todo-root.component';

const routes: Routes = [
  {path: 'to-do', component: TodoRootComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
