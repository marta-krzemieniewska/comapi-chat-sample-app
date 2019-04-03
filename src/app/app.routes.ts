import { Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

import { LoginComponent } from './login/login.component';
import { ConversationsComponentComponent } from './conversations-component/conversations-component.component';
import { ConversationComponentComponent } from './conversation-component/conversation-component.component';
import { ErrorComponent } from './error/error.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'conversations',
        pathMatch: 'full'
    },
    {
        path: 'error/:data',
        component: ErrorComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'conversations',
        component: ConversationsComponentComponent,
        canActivate: [AuthGuardService],
        children: [ {
            path: ':id',
            component: ConversationComponentComponent,
            canActivate: [AuthGuardService]
        }]
    }
];
