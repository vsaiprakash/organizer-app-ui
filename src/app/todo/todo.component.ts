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
  // todo_list = this.http.get("http://localhost:3000/api/todo-list");

  todo_list =  [
    {
      "id": 1,
      "title":"Grociers",
      "list": [
        "sugar", "dhal"
      ]
    },
    {
      "id": 2,
      "title":"Homework",
      "list": [
        "social", "maths"
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
