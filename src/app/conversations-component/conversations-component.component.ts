import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatSdkService } from '../chat-sdk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversations-component',
  templateUrl: './conversations-component.component.html',
  styleUrls: ['./conversations-component.component.scss']
})
export class ConversationsComponentComponent implements OnInit, OnDestroy {
  conversations: [];
  messages: [];

  constructor(private sdk: ChatSdkService, private router: Router) { }

  ngOnInit() {
    const self = this;
    this.sdk.initialise().subscribe(
      sdk => {
        console.log('Initialised');
        this.getConversations();
      },
      er => console.log('error: ', er));
  }

  addConversation(name: string, users: [string]) {
    const self = this;
    this.sdk.createConversation(name, users)
      .subscribe(result => {
        this.getConversations();
        const route = `/conversations/${result.id}`;
        this.router.navigate([route]);
      });
  }

  getConversations() {
    this.sdk.getConversations()
      .subscribe(conversations => {
        this.conversations = conversations;
      });
  }



  ngOnDestroy() {
    this.sdk.endSession().subscribe(sdk => console.log('Session ended'), er => console.log('error: ', er));
  }
}
