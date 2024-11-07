import { Component } from '@angular/core';
import { MemberModel } from '../Models/member';
import { MembersService } from '../services/members.service';
import { MemberCardComponent } from "../members/member-card/member-card.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})

export class ListsComponent {
    members?: MemberModel[];

    constructor(private memberService: MembersService){
        this.loadMembers();
    }

    loadMembers(){
        this.memberService.getMembers().subscribe({
            next: (data: any) => this.members = data
        })
    }
}
