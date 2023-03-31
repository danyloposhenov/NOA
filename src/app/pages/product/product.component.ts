import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public categoryProducts!: ICategoryResponse[];
  public userProducts!: IProductResponse[];
  public eventSubscription!: Subscription;
  public isActive: boolean = false;

  constructor (
    private categoryServive: CategoryService,
    private productServive: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.LoadProducts();
      }
    })
   }

  ngOnInit(): void {
    this.initCategory();
    this.LoadProducts();
  }

  initCategory(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.categoryServive.getAll().subscribe(data => {
      this.categoryProducts = data as ICategoryResponse[];
      if (categoryName == 'thai-wok' || categoryName == 'thai-lava-grill' || categoryName == 'thai-satay') {
        this.categoryProducts = this.categoryProducts
          .filter(prod => prod.path == 'thai-wok' || prod.path == 'thai-lava-grill' || prod.path == 'thai-satay');
      } else {
        this.categoryProducts = this.categoryProducts
          .filter(prod => prod.path != 'thai-wok' && prod.path != 'thai-lava-grill' && prod.path != 'thai-satay');
      }
    })
  }

  LoadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productServive.getAll().subscribe(data => {
      if (categoryName == 'culinasia-menu' || categoryName == null) {
        this.userProducts = data
          .filter(prod => prod["extraPath"] == true) as IProductResponse[];
      } else {
        this.userProducts = data
          .filter(prod => prod["category"].path == categoryName) as IProductResponse[];
      }
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
