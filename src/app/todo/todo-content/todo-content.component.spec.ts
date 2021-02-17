import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TodoContentComponent } from './todo-content.component';
import { TodoService } from './../todo.service';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const mockData = {
  key:"key", value:"value"
}

describe('TodoContentComponent', () => {
  let component: TodoContentComponent;
  let fixture: ComponentFixture<TodoContentComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(async(() => {
    const todoServiceSpyObj = jasmine.createSpyObj('TodoService',
        ['getToDoList', 'updateToDoList']);

    TestBed.configureTestingModule({
      declarations: [ TodoContentComponent ],
      providers:[
        { provide: TodoService, useValue: todoServiceSpyObj }
      ],
      imports:[
        FormsModule
      ]
    });

    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    todoServiceSpy.getToDoList.and.returnValue(asyncData(mockData));
    todoServiceSpy.updateToDoList.and.returnValue(asyncData(mockData));
    fixture = TestBed.createComponent(TodoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
