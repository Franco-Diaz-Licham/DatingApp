import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { UserModel } from './Models/userModel';
import { AccountService } from './services/account.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavComponent } from './Components/nav/nav.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavComponent, NgxSpinnerModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

    public title = 'Dating App';
    private userService: UserService;
    public users?: UserModel[];
    public accService: AccountService;

    constructor(userService: UserService, accService: AccountService) {
        this.userService = userService;
        this.accService = accService;
    }

    ngOnInit(): void {

    }

    getData() {
        this.userService.getAll().subscribe({
            next: (data: any) => {
                this.users = data;
            },
            error: (error: any) => {
                alert(error.message);
            }
        });
    }
}
