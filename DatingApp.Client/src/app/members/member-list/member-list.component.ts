import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { map, Observable } from 'rxjs';
import { MemberModel } from '../../Models/member';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

    members$?: Observable<MemberModel[]>;

    constructor(private memberService: MembersService){ }

    ngOnInit(): void {
        this.members$ = this.memberService.getMembers();
    }
}
