import { OrderModel } from "./order.model"

export interface UserModel {
  name: string
  lastName: string
  number: string
  email: string
  username: string
  password: string
  orders: OrderModel[]
}