import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loader {


     startLoader(){
      return true
   }


   stopLoader(){
     return false
   }

   
}
