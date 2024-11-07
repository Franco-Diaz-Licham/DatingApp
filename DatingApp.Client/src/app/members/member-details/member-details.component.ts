import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { MemberModel } from '../../Models/member';

@Component({
    selector: 'app-member-details',
    standalone: true,
    imports: [],
    templateUrl: './member-details.component.html',
    styleUrl: './member-details.component.css'
})

export class MemberDetailsComponent implements OnInit {
    member?: MemberModel;

    constructor(
        private memberService: MembersService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadMember();
    }

    loadMember(){
        this.memberService.getMember(this.route.snapshot.params['username']).subscribe({
            next: (data: any) => this.member = data
        });;
    }
}
