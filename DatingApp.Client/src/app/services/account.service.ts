import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../Models/userModel';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    private baseUrl: string = environment.apiUrl + 'account';
    private currentUserSource: ReplaySubject<UserModel | null> = new ReplaySubject(1);
    private currentUser$: Observable<UserModel | null> = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) {

    }
    
    private getStandarOptions(): any {
        var httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        var output = {
            headers: httpHeaders
        };
        return output;
    }

    login(username: string, password: string): any{
        let url = `${this.baseUrl}/login`
        let options = this.getStandarOptions();
        let body = {
            username: username,
            password: password
        }
        return this.http.post(url, body, options).pipe(
            map((user: any) => {
                if(user){
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSource.next(user);
                }
            })
        );
    }

    logout(){
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
    }

    setCurrentUser(){
        var localUser = localStorage.getItem('user');
        if(localUser){
            const user: UserModel = JSON.parse(localUser);
            this.currentUserSource.next(user);
        }
    }

    checkLocalStorageUser(){
        var localUser = localStorage.getItem('user');
        if(localUser){
            const user: UserModel = JSON.parse(localUser);
            this.currentUserSource.next(user);
        }
        else{
            this.currentUserSource.next(null);
        }
    }

    getCurrentUser(){
        this.checkLocalStorageUser();
        return this.currentUser$;
    }

    registerUser(username: string, password: string){
        let url = `${this.baseUrl}/register`
        let options = this.getStandarOptions();
        let body = {
            username: username,
            password: password
        }
        return this.http.post(url, body, options).pipe(
            map((user: any) => {
                if(user){
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSource.next(user);
                }
            })
        );
    }
}
