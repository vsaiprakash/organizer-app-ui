import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TodoDaoService } from './todo-dao.service';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const mockData = {
  key:"key", value:"value"
}

describe('TodoDaoService', () => {
  let service: TodoDaoService;
  let component: TodoDaoService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async(() => {
    const httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post', 'delete']);

    TestBed.configureTestingModule({
      providers:[
        { provide: HttpClient, useValue: httpClientSpyObj }
      ]
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClientSpy.get.and.returnValue(asyncData(mockData));
    httpClientSpy.put.and.returnValue(asyncData(mockData));
    httpClientSpy.post.and.returnValue(asyncData(mockData));
    httpClientSpy.delete.and.returnValue(asyncData(mockData));
    service = TestBed.inject(TodoDaoService);
  }));

  it('should be created', () => {
    component = new TodoDaoService(httpClientSpy);
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

  it('should test deleteMasterListItemById(id: number) method', (done: DoneFn) => {
    service.deleteMasterListItemById(1).subscribe((returnValue)=>{
      expect(returnValue).toEqual(mockData);
      done();
    });
  });
});
