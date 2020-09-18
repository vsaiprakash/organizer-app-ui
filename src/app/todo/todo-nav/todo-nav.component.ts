import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { TodoService } from './../todo.service';


@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent implements OnInit {
  todo_master_list:any;
  @Output() todoListIdEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(todoService: TodoService) {
    this.todo_master_list = todoService.getToDoMasterList()
                                       .subscribe(list => this.todo_master_list = list);
  }

  onSelected(id: number){
    //send id to todo-content component
    //for displaying its contents
    this.todoListIdEvent.emit(id);
  }

  ngOnInit(): void {
  }

}
