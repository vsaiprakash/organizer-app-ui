import { Component, OnInit } from '@angular/core';
import { TodoDaoService } from './../../dao/todo-dao.service';

@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.css']
})
export class TodoContentComponent implements OnInit {

  constructor(TodoDaoService) { }

  ngOnInit(): void {
  }

}
