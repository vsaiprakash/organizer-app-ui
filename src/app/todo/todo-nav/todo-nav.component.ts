import { Component, OnInit } from '@angular/core';
import { TodoDaoService } from './../../dao/todo-dao.service';
TodoDaoService

@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent implements OnInit {

  constructor(TodoDaoService) { }

  ngOnInit(): void {
  }

}
