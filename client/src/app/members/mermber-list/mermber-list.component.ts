import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/account.service';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-mermber-list',
  templateUrl: './mermber-list.component.html',
  styleUrls: ['./mermber-list.component.css'],
})
export class MermberListComponent implements OnInit {
  members$: Observable<Member[]>;
  members: Member[];
  pagination: Pagination;
  totalItems: number;
  userParams: UserParams;
  user: User;
  genderList = [
    { value: 'all', display: 'all' },
    { value: 'male', display: 'male' },
    { value: 'female', display: 'female' },
  ];
  // pageNumber = 1;
  // pageSize = 5;
  constructor(private memberService: MembersService) {
    this.userParams = memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    console.log('bbbbbbbbbbbbbbbbbb');
  }
  loadMembers() {
    if (typeof this.userParams.pageNumber === 'number') {
      this.memberService.setUserParams(this.userParams);
      console.log('AAAAAAAAAAAAAAA');
      this.memberService.getMembers(this.userParams).subscribe((response) => {
        console.log(response);
        this.members = response.result;
        this.pagination = response.pagination;
      });
    }
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }
  pageChanged(event: number) {
    console.log(event);
    this.userParams.pageNumber = event;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
