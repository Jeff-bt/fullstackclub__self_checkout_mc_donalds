import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";
import { getRestaurantBySlug } from "@/lib/data/get-restaurant-by-slug";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}
const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  const product = await db.product.findUnique({
    where: { id: productId },
  });
  if (!product || !restaurant) {
    return notFound;
  }

  if (restaurant.slug.toLocaleUpperCase() !== slug.toLocaleUpperCase()) {
    return notFound;
  }
  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} restaurant={restaurant} />
    </div>
  );
};

export default ProductPage;
