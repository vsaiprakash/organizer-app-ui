import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDaoService {

  todo_list: any;
  todo_list_obs: Observable<any> = this.http.get("/api/todo-list");

  //making it a relative call to avoid CORS,
  //and we will proxy te JSON server with our angular server.


  constructor(private http: HttpClient) {
    this.todo_list_obs.subscribe(list => this.todo_list = list);
  }


}
