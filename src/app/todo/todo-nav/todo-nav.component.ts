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


    //  update item to the DB with POST req to /mastertodolist
    this.todoService
      .updateToDoMasterList(item)
      .subscribe(addedItem => {
        console.info("Added Item to ToDoMasterList DB - "+JSON.stringify(addedItem));
      });
    //update the local todo_master_list with new item instead of pulling from DB
    this.todo_master_list.push(item);
    //Reset the input after DB update
    this.new_list_title = "";
  }

  deleteMasterListItem(id: number, index:number){
    //remove in local json
    this.todo_master_list.splice(index,1);

    //remove in DB
    console.log("Id: "+id);
    console.log("Before Master List: "+JSON.stringify(this.todo_master_list));
    this.todoService
        .deleteMasterListItem(id)
        .subscribe();
    console.log("After Master List: "+JSON.stringify(this.todo_master_list));

    //after removing the List from DB,
    //make sure the todo-content view doesnt show the deleted List
    //So, we will use the emit() to show first list from todomasterlist by default
    this.todoListIdEvent.emit(this.todo_master_list[0].id);
    //if lists are deleted in masterlist, we need to make todo-content show nothing.
  }



}
