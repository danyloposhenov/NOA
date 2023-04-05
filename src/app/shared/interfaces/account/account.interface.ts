export interface ILogin {
  email: string,
  password: string
}

export interface IRegister {
  firstName: string,
  lastName: string,
  phoneNumber?: number,
  email: string,
  password: string,
  confirmedPassword?: string,
  role?: string,
  orders?: [],
  address?: []
}