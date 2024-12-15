import { Component, Input } from '@angular/core';
import { MemberModel } from '../../Models/member';
import { RouterLink } from '@angular/router';
import { MembersService } from '../../services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {

    @Input() member?: MemberModel;

    constructor(private memberservice: MembersService, private toastr: ToastrService){

    }

    addLike(member: MemberModel){
        this.memberservice.addLike(member.username).subscribe(() => {
            this.toastr.success('You have liked' + member.knownAs);
        })
    }


}
