import Button from "../../UI/Button";
import { useAppDispatch } from "../../custom Hooks/hooks";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

type PropsType = {
  pizzaId: number;
  currentQuantity: number;
};

function UpdateItemQuantity({ pizzaId, currentQuantity }: PropsType) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        nature="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        nature="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
