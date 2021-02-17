import { TestBed, async } from '@angular/core/testing';
import { defer } from 'rxjs';

import { TodoDaoService } from './../dao/todo-dao.service';
import { TodoService } from './todo.service';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const mockData = {
  key:"key", value:"value"
}

describe('TodoService', () => {
  let service: TodoService;
  let todoDaoServiceSpy: jasmine.SpyObj<TodoDaoService>;

  beforeEach(async(() => {
    const todoDaoServiceSpyObj = jasmine.createSpyObj('TodoDaoService',
        ['getToDoMasterList', 'getToDoList', 'updateToDoList',
            'updateToDoMasterList', 'deleteMasterListItemById']);

    TestBed.configureTestingModule({
      providers:[
        { provide: TodoDaoService, useValue: todoDaoServiceSpyObj }
      ]
    });
    todoDaoServiceSpy = TestBed.inject(TodoDaoService) as jasmine.SpyObj<TodoDaoService>;
    todoDaoServiceSpy.getToDoMasterList.and.returnValue(asyncData(mockData));
    todoDaoServiceSpy.getToDoList.and.returnValue(asyncData(mockData));
    todoDaoServiceSpy.updateToDoList.and.returnValue(asyncData(mockData));
    todoDaoServiceSpy.updateToDoMasterList.and.returnValue(asyncData(mockData));
    todoDaoServiceSpy.deleteMasterListItemById.and.returnValue(asyncData(mockData));
    service = TestBed.inject(TodoService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getToDoMasterList() method', (done: DoneFn) => {
    service.getToDoMasterList().subscribe((returnValue)=>{
      expect(returnValue).toEqual(mockData);
      done();
    });
  });

  it('should test getToDoList(listId: number) method', (done: DoneFn) => {
    service.getToDoList(1).subscribe((returnValue)=>{
      expect(returnValue).toEqual(mockData);
      done();
    });
  });

  it('should test updateToDoList(listId: number, jsonBody: any) method', (done: DoneFn) => {
    service.updateToDoList(1, {}).subscribe((returnValue)=>{
      expect(returnValue).toEqual(mockData);
      done();
    });
  });

  it('should test updateToDoMasterList(jsonBody: any) method', (done: DoneFn) => {
    service.updateToDoMasterList({}).subscribe((returnValue)=>{
      expect(returnValue).toEqual(mockData);
      done();
    });
  });

  it('should test deleteMasterListItem(id: number) method', (done: DoneFn) => {
    service.deleteMasterListItem(1).subscribe((returnValue)=>{
      expect(returnValue).toEqual(mockData);
      done();
    });
  });
});
