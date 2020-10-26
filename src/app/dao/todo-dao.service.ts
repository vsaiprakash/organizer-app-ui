import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDaoService {

  todo_master_list: any;
  todo_curr_list: any;
  todo_curr_list_item_list: any;

  constructor(private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  //for todo nav
  getToDoMasterList(): any {
    return this.http.get("/api/todomasterlist");
  }

  //for todo content
  getToDoList(listId: number): any {
    return this.http.get("/api/todomasterlist/" + listId);
  }

  //completion status of list item
  updateToDoList(listId: number, jsonBody: any): any {
    return this.http
      .put("/api/todomasterlist/" + listId, JSON.stringify(jsonBody), this.httpOptions);
  }

  //To add or update items in todo master list
  updateToDoMasterList(jsonBody: any){
    return this.http
      .post("/api/todomasterlist/", JSON.stringify(jsonBody), this.httpOptions);
  }
}
