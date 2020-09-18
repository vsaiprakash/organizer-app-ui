import {  Component, Input, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.css']
})
export class TodoContentComponent implements OnInit {
  @Input() todo_list_selected_id: number;

  constructor(todoService: TodoService) { }
//.subscribe(list => this.todo_curr_list = list);
  ngOnInit(): void {
  }

}
