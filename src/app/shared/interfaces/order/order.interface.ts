import { IProductResponse } from "../product/product.interface";

export interface IOrderRequest {
  userData: any,
  userBasket: IProductResponse[],
  total: number,
  сhoiceDelivery: string,
  amountThings: number,
  date: string,
  status: boolean
}

export interface IOrderResponse extends IOrderRequest {
  id: string
}