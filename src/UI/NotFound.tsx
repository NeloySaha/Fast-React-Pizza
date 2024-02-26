import { useRouteError } from "react-router-dom";
import { RouterErrorType } from "../types/types";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        {(error as RouterErrorType).data || (error as RouterErrorType).message}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
