import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-mermber-list',
  templateUrl: './mermber-list.component.html',
  styleUrls: ['./mermber-list.component.css']
})
export class MermberListComponent implements OnInit {
members: Member[] = []
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    console.log("bbbbbbbbbbbbbbbbbb")
    this.loadMembers()
  }
loadMembers() {
  this.memberService.getMembers().subscribe(members => {
    this.members = members
  })
}
}
