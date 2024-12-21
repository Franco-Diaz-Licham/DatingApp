import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../../services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberModel } from '../../../Models/member';
import { CommonModule } from '@angular/common';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { MessageService } from '../../../services/message.service';
import { MessageModel } from '../../../Models/message';


@Component({
    selector: 'app-member-details',
    standalone: true,
    imports: [CommonModule, MemberMessagesComponent, TabsModule],
    templateUrl: './member-details.component.html',
    styleUrl: './member-details.component.css'
})

export class MemberDetailsComponent implements OnInit {

    @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
    public activeTab?: TabDirective;
    member!: MemberModel;
    messages: MessageModel[] = [];

    constructor(private memberService: MembersService, private messageService: MessageService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.member = data['member'];
        });

        this.route.queryParams.subscribe(params => {
            params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0)
        });

        // TODO: Get gallery images
    }

    loadMember() {
        this.memberService.getMember(this.route.snapshot.params['username']).subscribe({
            next: (data: any) => this.member = data
        });;
    }

    loadMessages() {
        this.messageService.getMessageThread(this.member!.username!).subscribe(resp => {
            this.messages = resp;
        })
    }

    onTabActivated(data: TabDirective) {
        this.activeTab = data;

        if (this.activeTab?.heading === 'Messages' && this.messages.length === 0) {
            this.loadMessages();
        }
    }

    selectTab(tabId: number) {
        this.memberTabs!.tabs[tabId].active = true;
    }

    getMessageTabIndex(): number {
        const index = this.memberTabs!.tabs.findIndex(t => t.heading === 'Messages');
        return index;
    }
}
