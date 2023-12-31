import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { AdminApiRoleApiClient, RoleDto, RoleDtoPagedResult } from 'src/app/api/admin-api.service.generated';
import { AlertService } from 'src/app/share/services/alert.service';
import { RoleDetailComponent } from './role-detail.component';
import { MessageConstants} from '../../../share/constants/messages.constant'
import { PermissionGrantComponent } from './permission-grant.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit, OnDestroy {
//System variables
  private ngUnsubcribe = new  Subject<void>()
  public blockedPanel: boolean = false;

//Paging variables
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public totalCount: number;

//Business variables
  public items: RoleDto[];
  public selectedItems: RoleDto[] = [];
  public keyword: string = '';
  constructor(
    private roleService: AdminApiRoleApiClient,
    public dialogService: DialogService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
  ) { }
  ngOnDestroy(): void {
    this.ngUnsubcribe.next();
    this.ngUnsubcribe.complete();
  }
  ngOnInit(){
    this.loadData();
  }
  loadData(){
    this.toggleBlockUI(true);
    this.roleService
    .getRolesAllPaging(this.keyword, this.pageIndex, this.pageSize)
    .pipe(takeUntil(this.ngUnsubcribe))
    .subscribe({
      next: (response: RoleDtoPagedResult) =>{
        this.items = response.results;
        this.totalCount = response.rowCount;
        this.toggleBlockUI(false);
      },
      error: (e) => {
        this.toggleBlockUI(false);
      }
    });
  }
  pageChanged(event: any):void{
    this.pageIndex = event.page + 1;
    this.pageSize = event.rows;
    this.loadData();
  }
  private toggleBlockUI(enabled: boolean){
    if(enabled == true){
      this.blockedPanel = true;
    }else{
      setTimeout(()=>{
        this.blockedPanel = false;
      },1000);
    }
  }
  showPermissionModal(id: string, name: string){
    const ref = this.dialogService.open(PermissionGrantComponent, {
      data: {
          id: id,
      },
      header: name,
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: RoleDto)=> {
      if(data){
        this.alertService.showSuccess(
            MessageConstants.UPDATED_OK_MSG
        );
        this.selectedItems = [];
        this.loadData();
      }
    });
  }
  showEditModal(){
    if(this.selectedItems.length == 0){
      this.alertService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD)
      return;
    }
    var id = this.selectedItems[0].id;
    const ref = this.dialogService.open(RoleDetailComponent,{
      data: {
        id: id,
      },
      header: 'Cập nhật quyền',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data: RoleDto) => {
      if(data){
        this.alertService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData();
      }
    });
  }
  showAddModal(){
    const ref = this.dialogService.open(RoleDetailComponent, {
      header: 'Thêm quyền mới',
      width: '70%',
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    const dynamicComponent = dialogRef?.instance as DynamicDialogComponent;
    const ariaLabelledBy = dynamicComponent.getAriaLabelledBy();
    dynamicComponent.getAriaLabelledBy = () => ariaLabelledBy;
    ref.onClose.subscribe((data:RoleDto)=>{
        if(data){
          this.alertService.showSuccess(
            MessageConstants.CREATED_OK_MSG
          );
          this.selectedItems = [];
          this.loadData();
        }
    });
  }

  deleteItems(){
    if(this.selectedItems.length == 0){
      this.alertService.showError(
        MessageConstants.NOT_CHOOSE_ANY_RECORD
      );
      return;
    }
    var ids = [];
    this.selectedItems.forEach((element)=>{
      ids.push(element.id);
    });
    this.confirmationService.confirm({
        message: MessageConstants.CONFIRM_DELETE_MSG,
        accept: () => {
          this.deleteItemsConfirm(ids);
        },
    });
  }
  deleteItemsConfirm(ids:any[]){
    this.toggleBlockUI(true);
    
    this.roleService.deleteRoles(ids).subscribe({
      next: () => {
        this.alertService.showSuccess(
          MessageConstants.DELETED_OK_MSG
        );
        this.loadData();
        this.selectedItems = [];
        this.toggleBlockUI(false);
      },
      error: () =>{
        this.toggleBlockUI(false)
      }
    });
  }
}
