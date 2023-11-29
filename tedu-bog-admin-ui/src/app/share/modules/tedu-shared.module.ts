import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ValidationMessageComponent} from './validation-message/validation-mesage.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ValidationMessageComponent],
    exports: [ValidationMessageComponent],
})
export class TeduSharedModule {}