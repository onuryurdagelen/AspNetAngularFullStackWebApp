import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { LoginBody } from 'src/app/models/loginBody';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private formBuilder:FormBuilder,
    private authService: AuthService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
  }
  login(){
    let loginBody:LoginBody = Object.assign({},this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(loginBody).subscribe(response => {
        this.toastrService.info(response.message)
        console.log(response)
        localStorage.setItem("token",response.data.token);
        // console.log(response);
       
      },responseError =>{
        this.toastrService.error(responseError.error)
        console.log(responseError)
      })
    }
    
  }
  

}
