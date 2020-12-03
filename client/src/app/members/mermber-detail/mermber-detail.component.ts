import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-mermber-detail',
  templateUrl: './mermber-detail.component.html',
  styleUrls: ['./mermber-detail.component.css'],
})
export class MermberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember()
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    
  }
  loadMember() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const username = paramMap.get('username');
      console.log(username)
      console.log(username)
      this.memberService.getMember(username).subscribe(member => {
        console.log("username")
        this.member = member;
        this.galleryImages = this.getImages()
      })
    });
  }

  getImages() {
    const imageUrls = [];
    for(const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      })
    }
    return imageUrls
  }
}
