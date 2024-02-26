import LinkButton from "../../UI/LinkButton";

import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { CartItemType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../custom Hooks/hooks";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useAppSelector(getCart);
  const { username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item: CartItemType) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button nature="link" to="/order/new">
          Order pizzas
        </Button>
        <Button nature="secondary" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
