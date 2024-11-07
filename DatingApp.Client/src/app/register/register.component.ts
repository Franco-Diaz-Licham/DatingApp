import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})

export class RegisterComponent {
    @Output() cancelRegister = new EventEmitter<boolean>();
    model: any = {};

    constructor(private accService: AccountService){
    }

    cancel() {
        this.cancelRegister.emit(false);
    }

    register() {
        this.accService.registerUser(this.model.username, this.model.password).subscribe();
        this.cancel();
    }

}
