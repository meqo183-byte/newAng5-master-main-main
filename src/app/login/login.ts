import { Component } from '@angular/core';
import { Api } from '../services/Api';
import { FormsModule } from '@angular/forms';
import { loginObj } from '../models/user';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

    constructor(private api : Api){
    
  }
  
  loginObj : loginObj = {
    email : "stepacc210@gmail.com",
    password : "Stepacc210@gmail.com"
  };

    log(form : any){
         console.log(form);
         console.log(form.value);
         this.api.postUser(form.value).subscribe((resp : any) => {
               console.log(resp.data.accessToken);
               console.log(resp.data.refreshToken);
               localStorage.setItem("accessToken", resp.data.accessToken)
               localStorage.setItem("refreshToken", resp.data.refreshToken)
         })
    }

}
