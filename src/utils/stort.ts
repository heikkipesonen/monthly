import { Purchase } from "src/types/purchase";

export const sortByDate = (items: Purchase[]) =>
  [...items].sort((a ,b) => a.date > b.date ? -1 : b.date > a.date ? 1 : 0)