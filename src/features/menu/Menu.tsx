import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { MenuItemType } from "../../types/types";

function Menu() {
  const menu = useLoaderData();

  const menuItems = (menu as MenuItemType[]).map((item: MenuItemType) => (
    <MenuItem key={item.id} pizza={item} />
  ));

  return <ul className="divide-y divide-stone-200 px-2">{menuItems}</ul>;
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
