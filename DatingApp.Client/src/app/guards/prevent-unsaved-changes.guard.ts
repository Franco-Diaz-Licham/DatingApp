import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { MemberEditComponent } from '../Components/members/member-edit/member-edit.component';


@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
    canDeactivate(component: MemberEditComponent): boolean {
        if(component.editForm?.dirty){
            return confirm('Are you sure you want to continue? Any changes will be lost');
        }
        return true;
    }

}