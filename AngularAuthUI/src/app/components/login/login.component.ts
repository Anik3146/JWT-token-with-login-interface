import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/helpers/validateform';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  type: string = "password";
  isText: boolean=false;
  eyeIcon: string = "fa-eye-slash";

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
  ngOnInit(): void {
      this.loginForm = this.fb.group({

        username: ['',Validators.required],
        password:['',Validators.required]

      })
  }

  hideShowPass(){
      this.isText= !this.isText;
      this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
      this.isText ? this.type="text" : this.type="password";
  }
  onLogin()
  {

    if(this.loginForm.valid)
    {
      //send the obj to database
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message)
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.err.message)
        }

      })

    }
    else
    {
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid");
    }
  }

 

}
