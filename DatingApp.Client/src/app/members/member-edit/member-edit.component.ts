import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MemberModel } from '../../Models/member';
import { UserModel } from '../../Models/userModel';
import { MembersService } from '../../services/members.service';
import { take } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-member-edit',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './member-edit.component.html',
    styleUrl: './member-edit.component.css'
})

export class MemberEditComponent implements OnInit {
    @ViewChild('editForm') editForm? : NgForm;
    member!: MemberModel;
    user?: UserModel;

    constructor(
        private acctService: AccountService,
        private memberService: MembersService,
        private toaster: ToastrService) {
        this.loadUser();
    }

    ngOnInit(): void {
        this.loadMember();
    }

    @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
        if(this.editForm?.dirty){
            $event.returnValue = true;
        }
    } 

    loadUser() {
        this.acctService.getCurrentUser().pipe(take(1)).subscribe({
            next: (data: any) => this.user = data
        })
    }

    loadMember() {
        if (this.user == null) {
            return;
        }

        this.memberService.getMember(this.user.username).subscribe({
            next: (data: MemberModel) => {this.member = data; console.log(this.member);}
        })
    }

    updateMember(){
        this.memberService.updateMember(this.member!).subscribe({
            next: () => {
                this.toaster.success('Profile updated');
                this.editForm?.reset(this.member);
            }
        });
    }
}
