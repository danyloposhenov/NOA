import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  public currentProduct!: IProductResponse;
  public userProducts!: IProductResponse[];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response["productInfo"];
      this.updateFavoriteProduct();
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
      this.updateFavoriteProduct();
    })
  }

  loadProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOne(id as string).subscribe(data => {
      this.currentProduct = data as IProductResponse;
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
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  fastOrder(product: IProductResponse): void {
    this.addToBasket(product);
    setTimeout(() => { this.router.navigate(['/checkout']) }, 500);
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

  updateFavoriteProduct(): void {
    let prod: Array<IProductResponse> = [];
    if (localStorage.getItem('currentUser') && localStorage.getItem('favoritesForCurrentUser')) {
      prod = JSON.parse(localStorage.getItem('favoritesForCurrentUser') as string);
    } else if (localStorage.getItem('favorites') && !localStorage.getItem('currentUser')) {
      prod = JSON.parse(localStorage.getItem('favorites') as string);
    } else {
      this.userProducts.map(elem => elem.favorite = false)
    }
    if (prod.some(elem => elem.id == this.currentProduct.id)) {
      this.currentProduct.favorite = true;
    }
  }
}
