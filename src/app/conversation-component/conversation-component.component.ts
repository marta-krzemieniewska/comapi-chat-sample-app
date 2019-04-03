import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatSdkService } from '../chat-sdk.service';
import { ActivatedRoute } from '@angular/router';
import { IConversationMessageEvent } from '@comapi/sdk-js-foundation';


@Component({
  selector: 'app-conversation-component',
  templateUrl: './conversation-component.component.html',
  styleUrls: ['./conversation-component.component.scss']
})

export class ConversationComponentComponent implements OnInit, OnDestroy {
  messages: any;
  conversationId: string;
  messageText: string;

  private handleMessageSentEvent(e) {
    const message = {
      id: e.payload.messageId,
      parts: e.payload.parts
    };
    this.messages.unshift(message);
  }

  private EventIsApplicable(e) {
    return e.conversationId === this.conversationId;
  }
  constructor(private sdk: ChatSdkService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.sdk.unSubscribeToEvent('conversationMessageEvent');
        this.conversationId = this.route.snapshot.paramMap.get('id');
        this.getMessages();
        this.sdk.subscribeToEvent('conversationMessageEvent', (e: IConversationMessageEvent) => {
          console.log(e);
          if (this.EventIsApplicable(e)) {
            switch (e.name) {
              case 'conversationMessage.sent':
                this.handleMessageSentEvent(e);
                break;
              default:
                return;
            }
          }
        });
      });
  }

  sendMessage(text: string) {
    this.sdk.sendMessageToConversation(this.conversationId, text)
      .subscribe(result => {
        this.messageText = '';
      });
  }


  getMessages() {
    this.sdk.getMessages(this.conversationId)
      .subscribe(res => {
        this.messages = res.messages;
      });
  }

  ngOnDestroy() {
    this.sdk.unSubscribeToEvent('conversationMessageEvent');

  }

}
