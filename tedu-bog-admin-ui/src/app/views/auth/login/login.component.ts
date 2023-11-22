import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiAuthApiClient, AuthenticatedResult, LoginRequest } from 'src/app/api/admin-api.service.generated';
import { AlertService } from 'src/app/share/services/alert.service';

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
    private router: Router
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
        
        //redirect to dashboard
        this.router.navigate(['/dashboard'])
      },
      error: (error: any) => {
        console.log(error);
        this.alertService.showError('Login invalid');
      },
    });
      
  }
}


