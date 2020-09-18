import { Injectable } from '@angular/core';
import { TodoDaoService } from './../dao/todo-dao.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoDaoService: TodoDaoService;

  constructor(todoDaoService: TodoDaoService) {
    this.todoDaoService = todoDaoService;
   }

  //for todo nav
  getToDoMasterList(): any{
    return this.todoDaoService.getToDoMasterList();
  }

  //for todo content
  getToDoList(listId: number): any{
    return this.todoDaoService.getToDoList(listId);
  }
}
