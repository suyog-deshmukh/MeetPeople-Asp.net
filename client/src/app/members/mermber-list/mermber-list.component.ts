import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-mermber-list',
  templateUrl: './mermber-list.component.html',
  styleUrls: ['./mermber-list.component.css']
})
export class MermberListComponent implements OnInit {
members$: Observable<Member[]>;
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers()
    console.log("bbbbbbbbbbbbbbbbbb")
  }
}
