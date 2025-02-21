import { getRestaurantBySlug } from "@/lib/data/get-restaurant-by-slug";

import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound;
  }
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound;
  }
  return (
    <div>
      <RestaurantHeader
        restaurant={{
          ...restaurant,
          avatarImageUrl:
            "https://www.arcosdorados.com/wp-content/uploads/2023/11/Novo-McDonalds-Montes-Claros.png",
        }}
      />
    </div>
  );
};

export default RestaurantMenuPage;
