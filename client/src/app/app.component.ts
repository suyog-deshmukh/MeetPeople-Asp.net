import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { User } from './models/user';
import { PresenceHubService } from './presence-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private presence: PresenceHubService
  ) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }
  title = 'client';

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {

      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user)
    }
  }
}
