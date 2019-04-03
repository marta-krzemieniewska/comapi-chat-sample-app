import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatSdkService } from '../chat-sdk.service';
import { ActivatedRoute } from '@angular/router';
import{IConversationMessageEvent} from '@comapi/sdk-js-foundation';
function EventIsApplicable(e) {
  return e.conversationId === this.conversationId;
}

function handleMessageSentEvent(e) {
  const message = {
    id: e.payload.messageId,
    parts: e.payload.parts
  };
  this.messages.unshift(message);
}

@Component({
  selector: 'app-conversation-component',
  templateUrl: './conversation-component.component.html',
  styleUrls: ['./conversation-component.component.scss']
})

export class ConversationComponentComponent implements OnInit, OnDestroy {
  messages: any;
  conversationId: string;

  constructor(private sdk: ChatSdkService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.conversationId = this.route.snapshot.paramMap.get('id');
        this.getMessages();
        this.sdk.subscribeToEvent('conversationMessageEvent', (e: IConversationMessageEvent) => {
          console.log(e);
          if (EventIsApplicable(e)) {
            switch (e.name) {
              case 'conversationMessage.sent':
                handleMessageSentEvent(e);
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
        console.log(result);
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
