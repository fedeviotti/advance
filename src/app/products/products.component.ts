import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductDto } from '../../shared/models/ProductDto';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

  products : Array<ProductDto> = [];
  productsCloned : Array<ProductDto> = [];

  pageSize: number = 30;
  p: number = 1;
  total: number = 0;

  constructor(private _productService: ProductService) { }

  async ngOnInit() {

    //METODO CON AWAIT
    try {
      await this.setDataSet();
    } catch (error) {
      console.log(error);

    }
  }

  private async setDataSet(skip:number=0, take:number=30) : Promise<Array<ProductDto>>{


        return new Promise<Array<ProductDto>>( async (resolve, reject) => {

          try {
            this.products = await this._productService.getAll(skip, this.pageSize);

            if(!this.products || this.products.length<=0){
              reject("Nessun prodotto");
              return;
            }

            this.total = this.products && this.products.length > 0 ? this.products[0].totalCount : 0;
            this.productsCloned = [...this.products];

            resolve(this.products);
          } catch (error) {
            reject(error);
          }

        });

      }


      async pageChanged(event: number){

        try {
          let skip = (event -1) * this.pageSize;

          this.setDataSet(skip, this.pageSize).then( () => {
            this.p = event;
          });

        } catch (error) {
          console.log(error);
        }

      }

}
