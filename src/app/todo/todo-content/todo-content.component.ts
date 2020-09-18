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
  // todo_list_selected_id_obs: BehaviorSubject<number> = new BehaviorSubject(1);
  todo_list_selected: any;
  todoService: TodoService;
  todo_list_selected_id_change_obs: any;


  constructor(todoService: TodoService) {

    this.todoService = todoService;
    if(typeof this.todo_list_selected_id === 'undefined'){
      this.todo_list_selected_id = 1;
    }

    todoService.getToDoList(this.todo_list_selected_id)
               .subscribe(list => this.todo_list_selected = list);

  }

  onChange(){
    this.todoService.getToDoList(this.todo_list_selected_id)
    .subscribe(list => this.todo_list_selected = list);
  }

  ngOnInit(): void {
  }


  ngOnChanges(): void{
    //to update todo list when selected from todo-nav
    this.onChange();
  }

}
