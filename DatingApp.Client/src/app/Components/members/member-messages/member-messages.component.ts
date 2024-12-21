import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageModel } from '../../../Models/message';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { MembersService } from '../../../services/members.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-member-messages',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './member-messages.component.html',
    styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {

    @ViewChild('messageForm') messageForm! : NgForm;
    @Input() messages: MessageModel[] = [];
    @Input() username: string = '';
    messageContent: string = '';

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {

    }

    SendMessage(){
        this.messageService.sendMessage(this.username, this.messageContent).subscribe(message => {
            this.messages.push(message);
            this.messageForm.reset();
        });
    }
}
