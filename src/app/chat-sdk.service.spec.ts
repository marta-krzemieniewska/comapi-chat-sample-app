import { TestBed } from '@angular/core/testing';

import { ChatSdkService } from './chat-sdk.service';

describe('ChatSdkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatSdkService = TestBed.get(ChatSdkService);
    expect(service).toBeTruthy();
  });
});
