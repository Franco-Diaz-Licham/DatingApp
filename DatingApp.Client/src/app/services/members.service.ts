import { Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccountService } from './account.service';
import { UserModel } from '../Models/userModel';
import { MemberModel } from '../Models/member';
import { map, of, pipe, take } from 'rxjs';
import { PaginatedResult } from '../Models/pagination';
import { UserParams } from '../Models/userParams';

@Injectable({
    providedIn: 'root'
})

export class MembersService {
    baseUrl: string = environment.apiUrl;
    user!: UserModel;
    userParams!: UserParams;
    members: MemberModel[] = [];
    memberCache = new Map();

    constructor(private http: HttpClient, private accService: AccountService) {
        this.accService.getCurrentUser().pipe(take(1)).subscribe({
            next: (user: any) => {
                this.user = user;
                this.userParams = new UserParams(user);
            }
        });
    }

    getUserParams(){
        return this.userParams;
    }

    setUserParams(userParams: UserParams){
        this.userParams = userParams;
    }

    resetUserParams(){
        this.userParams = new UserParams(this.user);
        return this.userParams;
    }

    getMembers(userParams: UserParams) {
        var response = this.memberCache.get(Object.values(userParams).join('-'));
        if (response) {
            return of(response);
        }

        let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
        params = params.append('minAge', userParams.minAge.toString());
        params = params.append('maxAge', userParams.maxAge.toString());
        params = params.append('gender', userParams.gender);
        params = params.append('orderBy', userParams.orderBy);

        var url = this.baseUrl + 'user';
        return this.getPaginatedResults<MemberModel[]>(url, params).pipe(
            map((response) => {
                this.memberCache.set(Object.values(userParams).join('-'), response);
                return response;
            })
        );
    }

    private getPaginatedResults<T>(url: string, params: HttpParams) {
        const paginatedResult = new PaginatedResult<T>();
        return this.http.get<T>(url, { observe: 'response', params }).pipe(
            map(response => {
                paginatedResult.result = response.body!;
                var pagination = response.headers.get('Pagination');

                if (pagination !== null) {
                    paginatedResult.pagination = JSON.parse(pagination);
                }
                return paginatedResult;
            })
        );
    }

    private getPaginationHeaders(pageNumber: number, pageSize: number) {
        let params = new HttpParams();
        params = params.append('pageNumber', pageNumber!.toString());
        params = params.append('pageSize', pageSize!.toString());
        return params;
    }

    getMember(username: string) {
        const pageResults = [...this.memberCache.values()];
        const member = pageResults
            .reduce((arr, elem) => arr.concat(elem.result), [])
            .find((member: MemberModel) => member.username === username);

        if (member !== undefined) {
            return of(member);
        }

        var url = `${this.baseUrl}` + `user/${username}`;
        return this.http.get<MemberModel>(url);
    }

    updateMember(member: MemberModel) {
        var url = `${this.baseUrl}` + `user`;
        return this.http.put(url, member).pipe(
            map(() => {
                const index = this.members.indexOf(member);
                this.members[index] = member;
            })
        );
    }

    setMainPhoto(photoId: number) {
        const url = this.baseUrl + 'user/set-main-photo/' + photoId;
        return this.http.put(url, {});
    }

    deletePhoto(photoId: number) {
        const url = this.baseUrl + 'user/delete-photo/' + photoId;
        return this.http.delete(url);
    }
}
