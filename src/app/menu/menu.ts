import { ChangeDetectorRef, Component } from '@angular/core';
import { Product } from '../models/products';
import { Helper } from '../services/Helper';
import { Api } from '../services/Api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  constructor(private help : Helper, private api :Api, private  cdr : ChangeDetectorRef){
   this.help.cleanString("      hello      ")

  }

  liveSearch: string= ""
  ngOnInit(){
    this.getCat()
    this.ResetProductArrAndShowProductSUpdatesArr()
    
    



    // this.api.getAll2("products").subscribe((resp : any) => {
    //   console.log(resp.data.products)
    //   this.product2Arr =resp.data.products
    //   this.cdr.detectChanges()  ////  აუცილებელია ყველა ქოლის მერე 

    // })
  

  }

  print(){}
 

  product2Arr : any[] = []
  produuctArr : Product[] = []




  ResetProductArrAndShowProductSUpdatesArr(){
    this.api.getAll2(`products?Take=12&Page=${this.currentPage}` ).subscribe((resp : any) => {
      console.log(resp)
      this.product2Arr = resp.data.products

      this.cdr.detectChanges()  ////  აუცილებელია ყველა ქოლის მერე 

    })

  }




  currentPage = 1;
totalPages = 5;

get pages() {
  const cur = this.currentPage, tot = this.totalPages;
  if (tot <= 7) return Array.from({length: tot}, (_, i) => i + 1);
  if (cur <= 4) return [1,2,3,4,5,'...',tot];
  if (cur >= tot - 3) return [1,'...',tot-4,tot-3,tot-2,tot-1,tot];
  return [1,'...',cur-1,cur,cur+1,'...',tot];
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  this.ResetProductArrAndShowProductSUpdatesArr()
}

gottenCategoriesFromGetApiThatNeedsToBeInTheLoop: any[] = []
getCat(){
  this.api.getAll2("categories").subscribe({
    next: (resp: any) => {
      console.log(resp)
      this.gottenCategoriesFromGetApiThatNeedsToBeInTheLoop = resp.data
      
    },
    error: (err: any) => {
      console.log(err)
    }
  })
}

}
