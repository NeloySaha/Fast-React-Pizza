import { useAppSelector } from "../custom Hooks/hooks";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const { username } = useAppSelector((state) => state.user);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? (
        <CreateUser />
      ) : (
        <Button nature="link" to="/menu">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
