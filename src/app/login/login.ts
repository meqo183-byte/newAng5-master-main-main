import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/Api';
import { FormsModule } from '@angular/forms';
import { loginObj } from '../models/user';
import { Services } from '../services/services';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

    passAndInp: boolean = false;
  PassText(){
    this.passAndInp = !this.passAndInp;
  }
  constructor(
    private api: Services,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private alert: Services,
  ) {}

  SignIn(form: any) {
    this.api
      .postAll(`/api/auth/login`, {
        ...form.value
      })
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
           this.alert.showAlert("Logged in successfully");
          if (resp) {
            localStorage.setItem('accessToken', resp.data.accessToken);
            localStorage.setItem('refreshToken', resp.data.refreshToken);
            this.cdr.detectChanges()
            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 1200);
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
          if(err.status === 400){
            this.alert.showAlert("Invalid email or password") 
            this.cdr.detectChanges();
          }
        },
      });
  }

}
