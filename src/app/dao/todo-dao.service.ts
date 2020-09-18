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
    return this.http.get("/api/todomasterlist");
  }

  //for todo content
  getToDoList(listId: number): any{
    return this.http.get("/api/todomasterlist/"+listId);
  }
}
