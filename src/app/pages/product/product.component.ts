import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ScrollService } from 'src/app/shared/services/scroll/scroll.service';

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
  public isCulinasia: boolean = false;
  public showSort: boolean = false;
  public currentID!: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private scroll: ScrollService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.LoadProducts();
        this.scroll.scrollToTop();
      }
    })
  }

  ngOnInit(): void {
    this.initCategory();
    this.LoadProducts();
    this.scroll.scrollToTop();
  }

  initCategory(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.categoryService.getAll().subscribe(data => {
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
    this.productService.getAll().subscribe(data => {
      if (categoryName == 'culinasia-menu' || categoryName == null) {
        this.userProducts = data
          .filter(prod => prod["extraPath"] == true) as IProductResponse[];
      } else {
        this.userProducts = data
          .filter(prod => prod["category"].path == categoryName) as IProductResponse[];
      }
      this.updateFavoriteProducts();
    })
  }

  choiceCulinasia(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.isCulinasia = !this.isCulinasia;
    if (this.isCulinasia) {
      this.userProducts = this.userProducts.filter(prod => prod["extraPath"]);
    } else {
      this.LoadProducts();
      this.userProducts = this.userProducts.filter(prod => prod["category"].path == categoryName)
    }
  }

  changePriceUp(): void {
    this.userProducts = this.userProducts.sort((a, b) => a.price - b.price)
  }

  changePriceDown(): void {
    this.userProducts = this.userProducts.sort((a, b) => b.price - a.price);
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

  addFavorite(product: IProductResponse): void {
    let prod: Array<IProductResponse> = [];
    product.favorite = true;
    if (localStorage.getItem('currentUser')) {
      if (localStorage.getItem('favoritesForCurrentUser')) {
        prod = JSON.parse(localStorage.getItem('favoritesForCurrentUser') as string);
        if (prod.some(prod => prod.id as string === product.id)) {
          const index = prod.findIndex(prod => prod.id === product.id);
          product.favorite = false;
          prod.splice(index, 1);
        } else {
          prod.push(product);
        }
      } else {
        prod.push(product);
      }
      localStorage.setItem('favoritesForCurrentUser', JSON.stringify(prod));
    } else {
      if (localStorage.length > 0 && localStorage.getItem('favorites')) {
        prod = JSON.parse(localStorage.getItem('favorites') as string);
        if (prod.some(prod => prod.id as string === product.id)) {
          const index = prod.findIndex(prod => prod.id === product.id);
          product.favorite = false;
          prod.splice(index, 1);
        } else {
          prod.push(product);
        }
      } else {
        prod.push(product);
      }
      localStorage.setItem('favorites', JSON.stringify(prod));
    }
  }

  updateFavoriteProducts(): void {
    let prod: Array<IProductResponse> = [];
    if (localStorage.getItem('currentUser') && localStorage.getItem('favoritesForCurrentUser')) {
      prod = JSON.parse(localStorage.getItem('favoritesForCurrentUser') as string);
    } else if (localStorage.getItem('favorites') && !localStorage.getItem('currentUser')) {
      prod = JSON.parse(localStorage.getItem('favorites') as string);
    } else {
      this.userProducts.map(elem => elem.favorite = false)
    }
    for (let element of prod) {
      if (this.userProducts.some(elem => elem.id == element.id as string)) {
        const index = this.userProducts.findIndex(prod => prod.id === element.id as string);
        this.userProducts[index].favorite = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
