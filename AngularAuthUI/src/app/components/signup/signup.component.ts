import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/helpers/validateform';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  type: string = "password";
  isText: boolean=false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb : FormBuilder, private auth: AuthService, private router: Router)
  {}

  ngOnInit(): void {
      this.signUpForm = this.fb.group({
        firstName : ['',Validators.required],
        lastName : ['',Validators.required],
        userName : ['',Validators.required],
         email : ['',Validators.required],
        password : ['',Validators.required],


      })
  }
  hideShowPass(){
    this.isText= !this.isText;
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text" : this.type="password";
}

onSignup(){
  if(this.signUpForm.valid)
  {
    //perform logic for signup
    this.auth.signUp(this.signUpForm.value)
    .subscribe(
      {
        next:(res=>{
          alert(res.message)
          this.signUpForm.reset();
          this.router.navigate(['login']);

        })
        ,error:(err=>{
          alert(err?.err.message)
        }
        )
      }
    )

    console.log(this.signUpForm.value);
  }
  else{
    //logic for throwing error
    ValidateForm.validateAllFormFields(this.signUpForm);

  }

}


}
