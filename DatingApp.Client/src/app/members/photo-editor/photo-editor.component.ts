import { Component, Input } from '@angular/core';
import { MemberModel } from '../../Models/member';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent {

    @Input() member?: MemberModel;
    
}
