import { Injectable } from '@angular/core';

import { Subject, Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';

import { Foundation, ComapiConfig, ConversationBuilder, MessageBuilder, IAuthChallengeOptions } from '@comapi/sdk-js-foundation';

import { AppSettings } from './app.settings';

@Injectable({
  providedIn: 'root'
})
export class ChatSdkService {

  private comapiSDK: Foundation;
  private comapiConfig: ComapiConfig;

  /**
   * Subjects to channel Comapi events into
   */
  private participantAddedSubject = new Subject();
  private participantRemovedSubject = new Subject();
  private conversationMessageSubject = new Subject();
  private conversationDeletedSubject = new Subject();

  constructor(private authService: AuthService) {

    this.comapiConfig = new ComapiConfig()
      .withApiSpace(AppSettings.API_SPACE_ID)
      .withUrlBase(AppSettings.URL_BASE)
      .withWebSocketBase(AppSettings.WEB_SOCKET)
      .withAuthChallenge(this.authChallenge.bind(this));
  }

  /**
   * Comapi Auth Challenge
   * We use the auth service to generate a JWT to pass back to Comapi.

   */
  private authChallenge(options: IAuthChallengeOptions, answerAuthenticationChallenge) {

    const profileId = this.authService.getProfileId();

    if (profileId) {
      this.authService.createJwt(profileId, options.nonce)
        .then(jwt => {
          answerAuthenticationChallenge(jwt);
        });
    } else {
      answerAuthenticationChallenge(null);
    }
  }

  private async getSdk(): Promise<Foundation> {
    if (this.comapiSDK) {
      return this.comapiSDK;
    }
    try {
      const sdk: Foundation =  await Foundation.initialise(this.comapiConfig);
      console.log('sdk: ', sdk);
      this.comapiSDK = sdk;

      const session = await this.comapiSDK.startSession();
      console.log('session: ', session);
      return this.comapiSDK;
    } catch (er) {
      console.log('error in initilisation', er);
      throw (er);
    }

  }

  public endSession(): Observable<boolean> {
    return from(
      this.getSdk()
        .then(sdk => sdk.endSession())
        .catch(err => err)
    );
  }

  public initialise(): Observable < Foundation > {
    return from(this.getSdk());
  }

  private async createConversationSDK(name: string, users: [string]): Promise<any> {
    const sdk = await this.getSdk();
    const conversation = new ConversationBuilder().withName(name).withDescription('Support related chat').withUsers(users);
    return await sdk.services.appMessaging.createConversation(conversation);
  }

  public createConversation(name: string, users: [string]): Observable <any> {
    return from(this.createConversationSDK(name, users));
  }

  private async getConversationsSDK(): Promise<any> {
    const sdk = await this.getSdk();
    return await sdk.services.appMessaging.getConversations();
  }

  public getConversations(): Observable <[]> {
    return from(this.getConversationsSDK());
  }

  private async sendMessageToConversationSDK(conversationId: string, text: string): Promise<any> {
    const message = new MessageBuilder().withText(text);
    const sdk = await this.getSdk();

    return await sdk.services.appMessaging.sendMessageToConversation(conversationId, message);
  }

  public sendMessageToConversation(conversationId: string, text: string): Observable <[]> {
    return from(this.sendMessageToConversationSDK(conversationId, text));
  }

  private async getMessagesSDK(conversationId: string): Promise<any> {
    const sdk = await this.getSdk();
    return await sdk.services.appMessaging.getMessages(conversationId, AppSettings.MESSAGE_PAGE_SIZE);
  }

  public getMessages(conversationId: string): Observable <{messages: []}> {
    return from(this.getMessagesSDK(conversationId));
  }

  public async subscribeToEvent(event: string, cb: any) {
    const sdk = await this.getSdk();
    sdk.on(event, cb);
  }

  public async unSubscribeToEvent(event: string) {
    const sdk = await this.getSdk();
    sdk.off(event);
  }

}
