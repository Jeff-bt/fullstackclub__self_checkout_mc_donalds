import { db } from "../prisma";

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
  });
  return restaurant;
};
