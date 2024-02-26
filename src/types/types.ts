// Redux types
export type UserInfoStateType = {
  username: string;
  status: "idle" | "loading" | "error";
  position: PositionType;
  address: string;
  error: string | undefined;
};

export type CartInfoStateType = {
  cart: CartItemType[];
};

export type StoreStateType = {
  user: UserInfoStateType;
  cart: CartInfoStateType;
};

export type CartItemType = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type MenuItemType = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

export type RouterErrorType = {
  data: string;
  message?: string;
  error: Error;
  internal: boolean;
  status: number;
  statusText: string;
};

export type PositionType = {
  latitude?: number;
  longitude?: number;
};

export type OrderType = {
  id: string;
  status: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartItemType[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
};

export type FormDataType = {
  customer: string;
  phone: string;
  address: string;
  cart: string;
  priority?: string;
};

export type CustomerOrderType = {
  customer: string;
  phone: string;
  address: string;
  cart: CartItemType[];
  priority: boolean;
};

export type ErrorType = {
  phone?: string;
};

export type StylesType = {
  primary: string | undefined;
  link: string | undefined;
  small: string | undefined;
  secondary: string | undefined;
  round: string | undefined;
};
