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

  //completion status of list item
  updateToDoList(listId: number, jsonBody: any): any{
    return this.todoDaoService.updateToDoList(listId, jsonBody);
  }

  updateToDoMasterList(jsonBody: any){
    return this.todoDaoService.updateToDoMasterList(jsonBody);
  }

  deleteMasterListItem(id: number){
    return this.todoDaoService.deleteMasterListItemById(id);
  }
}
