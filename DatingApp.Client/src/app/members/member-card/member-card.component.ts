import { Component, Input } from '@angular/core';
import { MemberModel } from '../../Models/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {

    @Input() member?: MemberModel;

    constructor(){}
}
