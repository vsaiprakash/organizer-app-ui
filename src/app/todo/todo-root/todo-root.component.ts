import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-root',
  templateUrl: './todo-root.component.html',
  styleUrls: ['./todo-root.component.css']
})
export class TodoRootComponent implements OnInit {
  todo_list_selected_in_nav_id: number;

  constructor() { }

  addItem(id: number){
    this.todo_list_selected_in_nav_id = id;
  }

  ngOnInit(): void {
  }

}
