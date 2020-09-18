import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo_list: any;
  todo_list_obs: Observable<any> = this.http.get("/api/todo-list");

  //making it a relative call to avoid CORS,
  //and we will proxy te JSON server with our angular server.


  constructor(private http: HttpClient) {
    this.todo_list_obs.subscribe(list => this.todo_list = list);

  }

  ngOnInit(): void {
  }

}
