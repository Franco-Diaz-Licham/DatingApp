import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { UserModel } from './Models/userModel';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './services/account.service';
import { HomeComponent } from "./home/home.component";
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavComponent, HomeComponent, NgxSpinnerModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

    public title = 'Dating App';
    private userService: UserService;
    public users?: UserModel[];
    public accService: AccountService;

    public constructor(userService: UserService, accService: AccountService) {
        this.userService = userService;
        this.accService = accService;
    }

    public ngOnInit(): void {
        this.accService.setCurrentUser();
    }

    public getData() {
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
