import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiAuthApiClient, AuthenticatedResult, LoginRequest } from 'src/app/api/admin-api.service.generated';
import { AlertService } from 'src/app/share/services/alert.service';
import { UrlConstants } from 'src/app/share/constants/url.constants';
import { TokenStorageService } from 'src/app/share/services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginFrom : FormGroup;
  constructor(
    private fb: FormBuilder, 
    private authApiClient: AdminApiAuthApiClient,
    private alertService: AlertService,
    private router: Router,
    private tokenService: TokenStorageService
    ) { 
    this.loginFrom = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login(){
    var request: LoginRequest = new LoginRequest({
      userName: this.loginFrom.controls['userName'].value,
      password: this.loginFrom.controls['password'].value
    });
    this.authApiClient.login(request).subscribe({
      next: (res:AuthenticatedResult) => {
        //save token and refresh token to localstorage
        this.tokenService.saveToken(res.token);
        this.tokenService.saveRefreshToken(res.refreshToken);
        this.tokenService.saveUser(res);
        //redirect to dashboard
        this.router.navigate([UrlConstants.HOME])
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.showError('Đăng nhập không đúng.');
      },
    });
      
  }
}


