import {  Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs";

// import { Observable } from "rxjs/Observable"
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.css']
})
export class TodoContentComponent implements OnInit, OnChanges {
  @Input() todo_list_selected_id: number;
  todo_list_selected: any;
  todoService: TodoService;


  constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  ngOnInit(): void {
    if(typeof this.todo_list_selected_id === 'undefined'){
      this.todo_list_selected_id = 1;
    }

    this.todoService.getToDoList(1)
               .subscribe(list => this.todo_list_selected = list);
  }


  ngOnChanges(): void{
    if(typeof this.todo_list_selected_id === 'undefined'){
      this.todo_list_selected_id = 1;
    }
    //to update todo list when selected from todo-nav
    this.onChange();
  }

  onChange(){
    this.todoService.getToDoList(this.todo_list_selected_id)
    .subscribe(list => this.todo_list_selected = list);
  }

}
