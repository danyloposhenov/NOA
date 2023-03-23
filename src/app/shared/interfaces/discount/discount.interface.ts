
export interface IDiscountRequest {
  date: string,
  name: string,
  title: string,
  description: string,
  imagePath: string
}

export interface IDiscountResponse extends IDiscountRequest {
  id: number | string
}