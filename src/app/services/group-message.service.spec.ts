import { TestBed } from '@angular/core/testing';

import { GroupMessageService } from './group-message.service';

describe('GroupMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupMessageService = TestBed.get(GroupMessageService);
    expect(service).toBeTruthy();
  });
});
