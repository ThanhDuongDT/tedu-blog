import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { AdminApiRoleApiClient, RoleDto, RoleDtoPagedResult } from 'src/app/api/admin-api.service.generated';
import { AlertService } from 'src/app/share/services/alert.service';


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
    this.pageIndex = event.page;
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
  showPermissionModal(id: string, name: string){}
  showEditModal(){}
  showAddModal(){}
  deleteItems(){}
}
