import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { getPaginatedResults, getPaginationHeaders } from './paginationHelpers';
import { MessageModel } from '../Models/message';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    baseUrl = environment.apiUrl + 'messages';

    constructor(private http: HttpClient) { }

    getMessages(pageNumber: number, pageSize: number, container: string){
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('Container', container);
        var url = `${this.baseUrl}`;
        return getPaginatedResults<MessageModel[]>(url, params, this.http);
    }

    getMessageThread(username: string){
        var url = `${this.baseUrl}/thread/${username}`;
        var output = this.http.get<MessageModel[]>(url);
        return output;
    }

    sendMessage(username: string, content: string){
        var url = `${this.baseUrl}`;
        return this.http.post<MessageModel>(url, {recipientUsername: username, content})
    }

    deleteMessage(id: number){
        var url = `${this.baseUrl}/${id}`;
        return this.http.delete(url)
    }
}
