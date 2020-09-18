import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';


@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent implements OnInit {
  todo_master_list:any;

  constructor(todoService: TodoService) {
    this.todo_master_list = todoService.getToDoMasterList()
                                       .subscribe(list => this.todo_master_list = list);
  }

  ngOnInit(): void {
  }

}
