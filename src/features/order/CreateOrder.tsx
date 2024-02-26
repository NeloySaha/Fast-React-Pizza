import { useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { CustomerOrderType, ErrorType, FormDataType } from "../../types/types";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { useAppDispatch, useAppSelector } from "../../custom Hooks/hooks";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useAppSelector((state) => state.user);
  const cart = useAppSelector(getCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);

  const isLoadingAddress = addressStatus === "loading";
  const navigation = useNavigation();
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const isSubmitting = navigation.state === "submitting";

  const dispatch = useAppDispatch();

  if (!cart) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="md-8 mb-8 text-xl font-semibold">
        Ready to order? Let's go!
      </h2>

      {/* <Form method="POST" action="/order/new"> by default react router submits the form to closest path */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              required
              defaultValue={username}
              placeholder="name"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              required
              placeholder="phonenumber"
            />

            {(formErrors as ErrorType)?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {(formErrors as ErrorType)?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              placeholder="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />

            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}

            {!position.latitude && !position.longitude && (
              <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px]">
                <Button
                  disabled={isLoadingAddress}
                  type="button"
                  nature="small"
                  onClick={() => dispatch(fetchAddress())}
                >
                  Get Location
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium ">
            Want to give your order priority?
          </label>
        </div>

        {/* As the cart comes from redux, its not possible to get that inside action */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.longitude && position.latitude
              ? `${position.latitude} ${position.longitude}`
              : ""
          }
        />
        <div>
          <Button
            nature="primary"
            disabled={isSubmitting || isLoadingAddress}
            type="submit"
          >
            {isSubmitting
              ? "Placing a order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  //coming from hidden input fields
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse((data as FormDataType).cart),
    priority: data.priority === "on",
  };

  const errors: ErrorType = {};
  if (!isValidPhone((order as CustomerOrderType).phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  // If everything is ok, then submitting the newOrder and be on my way
  const newOrder = await createOrder(order as CustomerOrderType);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder?.id}`);
}

export default CreateOrder;
