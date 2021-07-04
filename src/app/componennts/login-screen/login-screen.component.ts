import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private router:Router) { }

  loginForm = new FormGroup({
    username : new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })
  res = true
  ngOnInit(): void {
  }

  onFormSubmit(){
    console.log(this.loginForm.value)
    this.authenticationService.logIn(this.loginForm.value).subscribe(
      result => {
        this.router.navigate(['queues-list'])
      },error => {
        this.res = false
      }
    )
  }
}
