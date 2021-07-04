import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.css']
})
export class SignupScreenComponent implements OnInit {

  loginForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email])
  })
  
  constructor(private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(){
    console.log(this.loginForm.value)
    this.authenticationService.signUp(this.loginForm.value).subscribe(
      result => {
        this.router.navigate([''])
      },error => {
        
      }
    )
  }

}
