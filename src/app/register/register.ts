import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/Api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  constructor(private api : Api, private router : Router, private cdr : ChangeDetectorRef){
    
  }

  showVerifyInput : boolean = false;
  code  =  ""
  email = ""


  verify(){
    this.api.verify({email : this.email, code : this.code}).subscribe({
       next : (resp : any) =>{
          this.router.navigate(["/login"])
       },
       error :  er => alert(er.message)
    })

  }

  register(form : any){

    this.api.register(form).subscribe({
      next : (resp : any) =>{
        
         console.log(resp);
         this.showVerifyInput = true;
         this.cdr.detectChanges();
      },
      error :  er => alert(er.message)
    })

  }
}
