import Button from "../../UI/Button";
import { useAppDispatch } from "../../custom Hooks/hooks";
import { deleteItem } from "./cartSlice";

type PropsType = {
  pizzaId: number;
};

function DeleteItem({ pizzaId }: PropsType) {
  const dispatch = useAppDispatch();

  return (
    <Button nature="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
