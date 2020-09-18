import { Injectable } from '@angular/core';
import { TodoDaoService } from './../dao/todo-dao.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(TodoDaoService) { }
}
