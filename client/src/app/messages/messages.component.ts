import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmService } from '../confirm.service';
import { Message } from '../models/message';
import { Pagination } from '../models/pagination';
import { MessageService } from './message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(
    private messageService: MessageService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.confirmService
      .confirm('Confirm delete message', 'This cannot be un done')
      .subscribe((result) => {
        if (result) {
          this.messageService.deleteMessage(id).subscribe(() => {
            this.messages.splice(
              this.messages.findIndex((m) => m.id === id),
              1
            );
          });
        }
      });
  }
}
