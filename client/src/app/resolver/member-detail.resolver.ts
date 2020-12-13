import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MembersService } from '../members/members.service';
import { Member } from '../models/member';

@Injectable({ providedIn: 'root' })
export class MemberDetailResolver implements Resolve<Member> {

    constructor(private memberService: MembersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<Member>  {
   return this.memberService.getMember(route.paramMap.get('username'));
   
  }
}
