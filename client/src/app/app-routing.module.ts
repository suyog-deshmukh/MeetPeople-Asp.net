import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './admin/admin.guard';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MermberDetailComponent } from './members/mermber-detail/mermber-detail.component';
import { MermberListComponent } from './members/mermber-list/mermber-list.component';
import { MessagesComponent } from './messages/messages.component';
import { PreventUnsavedChanges } from './prevent-unsaved-changes.guard';
import { MemberDetailResolver } from './resolver/member-detail.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MermberListComponent },
      { path: 'members/:username', component: MermberDetailComponent, resolve: {member: MemberDetailResolver} },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChanges] },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] },
    ],
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'server-error', component: ServerErrorComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
