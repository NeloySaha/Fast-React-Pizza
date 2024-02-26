import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import Button from "../../UI/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button nature="primary" type="submit">
        Make Priority
      </Button>
    </fetcher.Form>
  );
}

export async function action({ params }: ActionFunctionArgs) {
  const data = {
    priority: true,
  };
  await updateOrder(params.orderId, data);

  return null;
}

export default UpdateOrder;
