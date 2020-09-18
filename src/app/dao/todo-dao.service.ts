import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDaoService {

  todo_master_list: any;
  todo_curr_list: any;

  constructor(private http: HttpClient) {

  }

  //for todo nav
  getToDoMasterList(): any{
    this.http
        .get("/api/todo-list")
        .subscribe(list => this.todo_master_list = list);
    return this.todo_master_list;
  }

  //for todo content
  getToDoList(listId: number): any{
    this.http
        .get("/api/todo-list/"+listId)
        .subscribe(list => this.todo_curr_list = list);
    return null;
  }
}
