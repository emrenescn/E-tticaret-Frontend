import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit{
constructor(spinner:NgxSpinnerService,private userService:UserService,private authService:AuthService
  ,private activatedRoute:ActivatedRoute,private router:Router){
  super(spinner);
}
  ngOnInit() {
  }

  async login(userNameOrEmail:string,password:string)
  {
    this.showSpinner(SpinnerType.BallAtom);
   await  this.userService.login(userNameOrEmail,password,()=>{
    this.authService.identityCheck();
    this.activatedRoute.queryParams.subscribe(params=>{
      const returnUrl:string=params["returnUrl"];
      if(returnUrl){
        this.router.navigate([returnUrl]);
      }
    })
    this.hideSpinner(SpinnerType.BallAtom);
   });
  }
}