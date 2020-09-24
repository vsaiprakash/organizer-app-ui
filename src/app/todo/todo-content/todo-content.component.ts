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
  todolist: any;
  todoService: TodoService;

  todo_list_updated: any;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
  }

  ngOnInit(): void {
    if(typeof this.todo_list_selected_id === 'undefined'){
      this.todo_list_selected_id = 1;
    }

    this.todoService.getToDoList(this.todo_list_selected_id)
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

  completionItemStyleStrikeThrough: string = "line-through";
  completionItemStyleNone: string = "none";

  onCheckedCompleted(itemId: number){
    this.todolist = this.todo_list_selected.todolist;
    let status = false;
    console.info(" BEFORE "+JSON.stringify(this.todolist));
    //update in local todolist
    for(let i=0; i < this.todolist.length; ++i){

      if(this.todolist[i].id==itemId){
        if(this.todolist[i].completed==true){
          status = false;
        }
        else{
          status = true;
        }

        this.todolist[i].completed=status;
        this.todo_list_selected.todolist = this.todolist;
      }
    }

    console.info(" AFTER "+JSON.stringify(this.todolist));
    //after updated in local list
    //push (PUT) the current local list to DB
    this.updateToDoListToDB();

    this.onChange();
  }


  updateToDoListToDB(){
    //just update the current snapshot of updated todo_list to DB

    this.todoService
            .updateToDoList(this.todo_list_selected_id, this.todo_list_selected)
            .subscribe(list => {
              this.todo_list_updated = list
              console.info("ToDoList updated to DB - "+JSON.stringify(this.todo_list_updated));
            });
  }

}
