import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { MemberDetailsComponent } from './Components/members/member-details/member-details.component';
import { AuthGuard } from './guards/auth.guard';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';

import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { ListsComponent } from './Components/lists/lists.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { MemberListComponent } from './Components/members/member-list/member-list.component';
import { MemberEditComponent } from './Components/members/member-edit/member-edit.component';
import { MembermemberDetailedResolver } from './Resolvers/member-detailed.resolver';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'members/:username', component: MemberDetailsComponent, resolve: { member: MembermemberDetailedResolver } },
            { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: "errors", component: TestErrorsComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];
