import {  Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs";

// import { Observable } from "rxjs/Observable"
import { TodoService } from './../todo.service';

import { v1 as uuidv1 } from 'uuid';

const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date().getTime(),
  nsecs: 5678,
};

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

  new_item_content: String = "";

  onSubmitItem(){
    //add the selected item to current todomasterlist's todolist
    this.todolist = this.todo_list_selected.todolist;
    uuidv1(v1options);
    let new_id = uuidv1();
    /*
        {
          "id": 1,
          "completed": true,
          "content": "sugar"
        }
    */
    let item = {
      "id":new_id,
      "completed": false,
      "content":this.new_item_content
    };
    console.log("New Item:"+JSON.stringify(item));
    console.log(">>ToDoList Length:"+JSON.stringify(this.todolist.length));
    // this.todolist[this.todolist.length] = item;
    this.todolist.push(item);//more meaningful than above line
    this.todo_list_selected.todolist = this.todolist;
    console.log("ToDoList after New Item Added:"+JSON.stringify(this.todolist));

    this.updateToDoListToDB();
    //reset the text in input
    this.new_item_content = "";
  }

  deleteItem(index: number){
    this.todolist = this.todo_list_selected.todolist;
    this.todolist.splice(index,1);
    this.todo_list_selected.todolist = this.todolist;
    this.updateToDoListToDB();
  }

  item_content_for_update:String = "";

  onEditItem(index: number){
    this.todolist = this.todo_list_selected.todolist;
    let item = this.todolist[index];
    item.content = "[EDITED]"+item.content;
    this.todolist[index] = item;
    this.todo_list_selected.todolist = this.todolist;
    this.updateToDoListToDB();
  }

  show_edit_title: boolean = false;
  saveEditedListTitle(new_title_value: string){
    this.todo_list_selected.title = new_title_value;
    this.toggle_show_edit_title();
    this.updateToDoListToDB();
  }

  toggle_show_edit_title(){
    if(this.show_edit_title){
      this.show_edit_title = false;
    }
    else{
      this.show_edit_title = true;
    }
  }

  show_edit_item: boolean = false;
  edit_item_index = -1;
  saveEditedItemContent(new_item_value: string, id: number){
    this.todolist = this.todo_list_selected.todolist;
    let item;
    for(let i=0;i<this.todolist.length; ++i){
      if(this.todolist[i].id==id){
        this.todolist[i].content = new_item_value;
      }
    }
    this.todo_list_selected.todolist = this.todolist;
    this.updateToDoListToDB();
    this.toggle_show_edit_item();
  }

  toggle_show_edit_item(){
    if(this.show_edit_item){
      this.show_edit_item = false;
      this.edit_item_index = -1;
    }
    else{
      this.show_edit_item = true;
    }
  }

}
