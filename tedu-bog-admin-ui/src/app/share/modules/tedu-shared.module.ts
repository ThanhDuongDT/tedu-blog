import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ValidationMessageComponent} from './validation-message/validation-mesage.component';
import { PermissionDirective } from './permission.directive'

@NgModule({
    imports: [CommonModule],
    declarations: [ValidationMessageComponent, PermissionDirective],
    exports: [ValidationMessageComponent],
})
export class TeduSharedModule {}