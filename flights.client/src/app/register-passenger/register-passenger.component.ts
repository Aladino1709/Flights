import { Component, OnInit } from '@angular/core';
import { PassengerService } from './../api/services/passenger.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service'
import { Router,ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {

  constructor(
    private passengerService: PassengerService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  requestedUrl?:string=undefined
  form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.min(3), Validators.email])],
    firstName: ['', Validators.compose([Validators.required, Validators.max(50)])],
    lastName: ['', Validators.compose([Validators.required, Validators.max(50)])],
    isFemale: [true, Validators.required]
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p=>this.requestedUrl=p['requestedUrl'])
  }

  register() {
    if (this.form.invalid)
      return;
    console.log("Form Values:", this.form.value);

    this.passengerService.registerPassenger({ body: this.form.value })
      .subscribe(this.login, console.error )

  }
  checkPassenger() {
    const params = { email: this.form.get('email')!.value! }
    this.passengerService
     .findPassenger(params).subscribe(
      this.login
 ,
        e => {
          if (e.status!=404)
            console.error(e) }
         )
  
    

  }
  private login= ()=>{
    this.authService.loginUser({ email: this.form.get('email')!.value! })
    this.router.navigate([this.requestedUrl ?? '/search'])
  }
  get email() {
    return this.form.controls.email
  }
  get firstName() {
    return this.form.controls.firstName
  }
  get lastName() {
    return this.form.controls.lastName
  }
  get isFemale() {
    return this.form.controls.isFemale
  }
}
