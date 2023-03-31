import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-thai-market',
  templateUrl: './thai-market.component.html',
  styleUrls: ['./thai-market.component.scss']
})
export class ThaiMarketComponent {

  public categoryProducts!: ICategoryResponse[];
  public productsSatay!: IProductResponse[];
  public productsGrill!: IProductResponse[];
  public productsWok!: IProductResponse[];
  public eventSubscription!: Subscription;
  public isActive: boolean = false;

  constructor (
    public categoryServive: CategoryService,
    private productServive: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.LoadProductsSatay();
        this.LoadProductsGrill();
        this.LoadProductsWok();
      }
    })
   }

  ngOnInit(): void {
    this.initCategory();
    this.LoadProductsSatay();
    this.LoadProductsGrill();
    this.LoadProductsWok();
  }

  initCategory(): void {
    this.categoryServive.getAll().subscribe(data => {
      this.categoryProducts = data as ICategoryResponse[];
      this.categoryProducts = this.categoryProducts
        .filter(prod => prod.path == 'thai-wok' || prod.path == 'thai-lava-grill' || prod.path == 'thai-satay');
    })
  }

  LoadProductsSatay(): void {
    this.productServive.getAll().subscribe(data => {
      this.productsSatay = data.filter(prod => prod["category"].path == 'thai-satay') as IProductResponse[];
    })
  }
  LoadProductsGrill(): void {
    this.productServive.getAll().subscribe(data => {
      this.productsGrill = data.filter(prod => prod["category"].path == 'thai-lava-grill') as IProductResponse[];
    })
  }
  LoadProductsWok(): void {
    this.productServive.getAll().subscribe(data => {
      this.productsWok = data.filter(prod => prod["category"].path == 'thai-wok') as IProductResponse[];
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
