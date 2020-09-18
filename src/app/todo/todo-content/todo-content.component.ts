import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.css']
})
export class TodoContentComponent implements OnInit {

  constructor(TodoService) { }

  ngOnInit(): void {
  }

}
