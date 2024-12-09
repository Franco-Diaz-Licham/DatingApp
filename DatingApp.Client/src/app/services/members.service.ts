import { Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import { UserModel } from '../Models/userModel';
import { MemberModel } from '../Models/member';
import { map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MembersService {
    baseUrl: string = environment.apiUrl;
    private user?: UserModel;
    members: MemberModel [] = [];

    constructor(private http: HttpClient, private accService: AccountService) {
        this.accService.getCurrentUser().subscribe({
            next: (data: any) => this.user = data
        });
    }
    
    getMembers(){
        if(this.members.length > 0){
            return of(this.members);
        }

        var url = this.baseUrl + 'user';
        return this.http.get<MemberModel[]>(url).pipe(
            map(members => {
                this.members = members;
                return members;
            })
        );
    }

    getMember(username: string){
        const member = this.members.find(x => x.username === username);

        if(member !== undefined){
            return of(member);
        }

        var url = `${this.baseUrl}` + `user/${username}`;
        return this.http.get<MemberModel>(url);
    }

    updateMember(member: MemberModel){
        var url = `${this.baseUrl}` + `user`;
        return this.http.put(url, member).pipe(
            map(() => {
                const index = this.members.indexOf(member);
                this.members[index] = member;
            })
        );
    }

    setMainPhoto(photoId: number){
        const url = this.baseUrl + 'user/set-main-photo/' + photoId;
        return this.http.put(url, {});
    }

    deletePhoto(photoId: number){
        const url = this.baseUrl + 'user/delete-photo/' + photoId;
        return this.http.delete(url);
    }
}
