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
  todoService: TodoService;

  ngOnInit(): void {
  }

  constructor(todoService: TodoService) {
    this.todoService = todoService;
    todoService.getToDoMasterList()
               .subscribe(list => this.todo_master_list = list);
  }

  onSelected(id: number){
    //send id to todo-content component
    //for displaying its contents
    this.todoListIdEvent.emit(id);

  }

  new_list_title: String;

  onSubmitTitle(){
    //add the new title to todomasterlist with an empty todolist.
    let new_id = this.todo_master_list.length+1;
    // let new_id = 11;
    /*
    {
        "id": 4,
        "title": "Misc.",
        "todolist": [ ]
    }
    */
    let item = {
      "id":new_id,
      "title": this.new_list_title,
      "todolist":[ ]
    };
    //update the local todo_master_list with new item instead of pulling from DB
    this.todo_master_list.push(item);

    //  update item to the DB with POST req to /mastertodolist
    this.todoService
      .updateToDoMasterList(item)
      .subscribe(addedItem => {
        console.info("Added Item to ToDoMasterList DB - "+JSON.stringify(addedItem));
      });
    //Reset the input after DB update
    this.new_list_title = "";
  }



}
