import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';

import { TodoComponent } from './todo.component';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async(() => {
    const httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      providers:[
        { provide: HttpClient, useValue: httpClientSpyObj }
      ]
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClientSpy.get.and.returnValue(asyncData({}));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
