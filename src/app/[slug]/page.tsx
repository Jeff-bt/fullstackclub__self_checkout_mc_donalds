import { getRestaurantBySlug } from "@/lib/data/get-restaurant-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";
import ComsumptionMethodOption from "./components/consumptionMethodOption";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}
const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound;
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            fill
            className="object-contain"
          />
        </div>

        <h2 className="font-bold">FSW Donald's</h2>
      </div>
      <div className="space-y-2 pt-24 text-center">
        <h1 className="text-2xl font-semibold">Seja bem-vindo!</h1>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ComsumptionMethodOption
          slug={slug}
          buttonText="Para comer aqui"
          imageAlt="Para comer aqui"
          imageUrl="/dine_in.png"
          option="DINE_IN"
        />
        <ComsumptionMethodOption
          slug={slug}
          buttonText="Para Levar"
          imageAlt="Para Levar"
          imageUrl="/takeaway.png"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
