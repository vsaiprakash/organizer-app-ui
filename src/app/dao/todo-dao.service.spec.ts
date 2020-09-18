import { TestBed } from '@angular/core/testing';

import { TodoDaoService } from './todo-dao.service';

describe('TodoDaoService', () => {
  let service: TodoDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
