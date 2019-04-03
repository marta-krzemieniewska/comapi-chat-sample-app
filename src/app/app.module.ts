import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { ConversationComponentComponent } from './conversation-component/conversation-component.component';
import { ConversationsComponentComponent } from './conversations-component/conversations-component.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversationComponentComponent,
    ConversationsComponentComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
