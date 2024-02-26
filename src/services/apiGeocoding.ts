import { PositionType } from "../types/types";

export async function getAddress({ latitude, longitude }: PositionType) {
  const res = await fetch(
    `${import.meta.env.VITE_GEO_API_URL}?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
