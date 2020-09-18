import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';


@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent implements OnInit {

  constructor(TodoService) { }

  ngOnInit(): void {
  }

}
