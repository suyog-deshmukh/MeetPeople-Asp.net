import { Component, OnInit } from '@angular/core';
import { MembersService } from '../members/members.service';
import { Member } from '../models/member';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 2;
  pagination: Pagination

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes()
  }
  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination
    });
  }

  pageChanged(event: any) {
    console.log(event)
    this.pageNumber = event
    this.loadLikes();
  }
}
